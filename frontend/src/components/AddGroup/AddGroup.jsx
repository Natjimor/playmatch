import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import supabase from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";

import "../../styles/AddGroup.css";
import "../../styles/ModalGroup.css";

export default function AddGroup({ onGroupCreated })  {
  const [groupName, setGroupName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("");

  const { user } = useAuth(); // Obtenemos el usuario del contexto

  // Obtener username del usuario actual desde la tabla "users"
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

  // Buscar usuarios por username
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
    setSearchUser(""); // limpiar input
    setUserResults([]); // limpiar resultados
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }

    const usernames = [currentUsername, ...selectedUsers.map((u) => u.username)];
    const groupSize = usernames.length;
    console.log(groupSize)

    // 1. Crear grupo
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert([
        {
          group_name: groupName,
          group_users: [currentUsername],
          group_size: 1,
        },
      ])
      .select("group_id")
      .single();

    if (!groupData || groupError) {
      console.error("Error al crear grupo:", groupError);
      return alert("Error al crear grupo");
    }

    // 2. Crear invitaciones
    const invitations = selectedUsers.map((u) => ({
      group_id: groupData.group_id,
      sender_id: user.id, // ID desde contexto
      receiver_id: u.id,
      status: "pending",
    }));

    const { error: invitationError } = await supabase
      .from("invitations")
      .insert(invitations);

    if (invitationError) {
      console.error("Error al enviar invitaciones:", invitationError);
      return alert("Error al enviar invitaciones");
    }

    // Limpiar campos
    setGroupName("");
    setSelectedUsers([]);
    setIsModalOpen(false);

    if (onGroupCreated) {
      onGroupCreated();
    }
  };

  return (
    <section>
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <div className="AddGroup">
            <FaCirclePlus size={45} className="icon-hover" />
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Crear nuevo grupo</Dialog.Title>

            <input
              type="text"
              placeholder="Nombre del grupo"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="DialogInput"
            />

            <div className="usersContainer">
              <input
                type="text"
                placeholder="Buscar participantes"
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
            </div>

            <div className="DialogActions">
              <Dialog.Close asChild>
                <button className="CancelBtn">Cancelar</button>
              </Dialog.Close>
              <button className="CreateBtn" onClick={handleCreateGroup}>
                Crear grupo
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}