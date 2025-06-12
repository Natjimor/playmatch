import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCirclePlus,FaCircleXmark} from "react-icons/fa6";
import supabase from "../../services/supabase";
import "../../styles/Group.css";
import "../../styles/ModalGroup.css";

export default function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }

    if (!currentUsername) {
      alert("Espere a que se cargue su información de usuario...");
      return;
    }

    const usernames = [currentUsername, ...selectedUsers.map((u) => u.username)];

    const groupSize = selectedUsers.length + 1;

    const { data, error } = await supabase.from("groups").insert([
      {
        group_name: groupName,
        group_users: usernames,
        group_size: groupSize,
      },
    ]);

    if (error) {
      console.error("Error al crear grupo:", error);
      alert("Ocurrió un error al crear el grupo.");
    } else {
      console.log("Grupo creado con éxito:", data);
      setGroupName("");
      setSelectedUsers([]);
      setIsModalOpen(false);
    }

  };

  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSelectUser = (user) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
    setSearchUser(""); // limpia el input
    setUserResults([]); // limpia los resultados
  };
  const user = supabase.auth.getUser();
  console.log(user)
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();

        if (data) setCurrentUsername(data.username);
        else console.error("Error al obtener username:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  

  return (
    <section>
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Trigger asChild>
            <div className="AddGroup">
              <FaCirclePlus size={45} color="#4a3affc3" className="icon-hover" />
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
                    {userResults.map((user) => (
                    <li key={user.id} onClick={() => handleSelectUser(user)} className="UserOption">
                      {user.username}
                    </li>
                    ))}
                  </ul>
                )}
                {selectedUsers.length > 0 && (
                  <div className="SelectedUsers">
                    {selectedUsers.map((user) => (
                      <div key={user.id} className="SelectedUser">
                        {user.username}
                        <button
                          onClick={() =>
                            setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id))
                          }
                          className="RemoveUserBtn"
                        >
                        <FaCircleXmark size={20} color="#4a3affbe"/>
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