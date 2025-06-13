import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCircleXmark } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import supabase from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";
import "../../styles/ModalGroup.css";

export default function AddParticipantModal({ groupId, onParticipantsAdded }) {
  const [searchUser, setSearchUser] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchCurrentUsername = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();
      if (data) setCurrentUsername(data.username);
      else console.error("Error al obtener username:", error);
    };

    fetchCurrentUsername();
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchUser.trim() === "") {
        setUserResults([]);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("id, username")
        .ilike("username", `%${searchUser}%`);

      if (error) {
        console.error("Error al buscar usuarios:", error);
      } else {
        setUserResults(data);
      }
    };

    fetchUsers();
  }, [searchUser]);

  const handleSelectUser = (user) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
    setSearchUser("");
    setUserResults([]);
  };

  const handleSendInvitations = async () => {
    if (!user || selectedUsers.length === 0) return;

    try {
      const invitations = selectedUsers.map((u) => ({
        group_id: groupId,
        sender_id: user.id,
        receiver_id: u.id,
        status: "pending",
      }));

      const { error } = await supabase.from("invitations").insert(invitations);

      if (error) {
        console.error("❌ Error al enviar invitaciones:", error);
        alert("No se pudieron enviar algunas invitaciones.");
        return;
      }

      console.log("📩 Invitaciones enviadas:", invitations);

      setSelectedUsers([]);
      setIsModalOpen(false);

      if (onParticipantsAdded) onParticipantsAdded(); // Puedes usarlo para actualizar notificaciones
    } catch (err) {
      console.error("❌ Error inesperado al enviar invitaciones:", err);
    }
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <FaUserPlus size={24} color="white" className="AddParticipant" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Invitar participantes</Dialog.Title>

          <input
            type="text"
            placeholder="Buscar usuarios"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="DialogInput"
          />

          {userResults.length > 0 && (
            <ul className="UserSearchResults">
              {userResults.map((u) => (
                <li key={u.id} onClick={() => handleSelectUser(u)} className="UserOption">
                  {u.username}
                </li>
              ))}
            </ul>
          )}

          {selectedUsers.length > 0 && (
            <div className="SelectedUsers">
              {selectedUsers.map((u) => (
                <div key={u.id} className="SelectedUser">
                  {u.username}
                  <button
                    onClick={() =>
                      setSelectedUsers((prev) => prev.filter((x) => x.id !== u.id))
                    }
                    className="RemoveUserBtn"
                  >
                    <FaCircleXmark size={20} color="#4a3affbe" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="DialogActions">
            <Dialog.Close asChild>
              <button className="CancelBtn">Cancelar</button>
            </Dialog.Close>
            <button className="CreateBtn" onClick={handleSendInvitations}>
              Enviar invitaciones
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
