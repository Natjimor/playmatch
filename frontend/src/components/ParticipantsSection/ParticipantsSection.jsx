import { FaRegUser, FaUserPlus, FaMinus } from "react-icons/fa";
import "../../styles/ParticipantsSection.css";
import RecomendationButton from "../RecommendationButton/RecommendationButton";
import { useEffect, useState } from "react";
import AddParticipantModal from "../AddParticipantModal/AddParticipantModal";
import supabase from "../../services/supabase";

export default function ParticipantsSect({ groupId }) {
  const [participants, setParticipants] = useState([]);

  const fetchGroupParticipants = async () => {
    if (!groupId) return;

    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .select("group_users")
      .eq("group_id", groupId)
      .single();

    if (groupError) {
      console.error("Error al obtener el grupo:", groupError);
      return;
    }

    const participantUsernames = groupData.group_users;

    if (!participantUsernames || participantUsernames.length === 0) {
      setParticipants([]);
      return;
    }

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, username")
      .in("username", participantUsernames);

    if (usersError) {
      console.error("Error al obtener usuarios:", usersError);
    } else {
      setParticipants(usersData);
    }
  };

  useEffect(() => {
    fetchGroupParticipants();
  }, [groupId]);

  const handleRemoveParticipant = async (usernameToRemove) => {
    try {
      const { data: groupData, error: groupError } = await supabase
        .from("groups")
        .select("group_users")
        .eq("group_id", groupId)
        .single();

      if (groupError || !groupData) {
        console.error("❌ Error al obtener el grupo:", groupError);
        return;
      }

      const updatedUsers = groupData.group_users.filter(
        (username) => username !== usernameToRemove
      );

      const { error: updateError } = await supabase
        .from("groups")
        .update({
          group_users: updatedUsers,
          group_size: updatedUsers.length,
        })
        .eq("group_id", groupId);

      if (updateError) {
        console.error("❌ Error al actualizar el grupo:", updateError);
        return;
      }

      fetchGroupParticipants();

      console.log(`👋 Participante "${usernameToRemove}" eliminado.`);
    } catch (err) {
      console.error("❌ Error inesperado al eliminar participante:", err);
    }
  };

  return (
    <section className="ParticipantsSect">
      <div className="ParticipantsTittle">
        <h1>Integrantes</h1>
        {/* ✅ Modal llama fetchGroupParticipants al agregar usuarios */}
        <AddParticipantModal
          groupId={groupId}
          onParticipantsAdded={fetchGroupParticipants}
        />
      </div>

      <div className="ParticipantsContainer">
        {participants.length === 0 ? (
          <p className="EmptyText">No hay participantes aún.</p>
        ) : (
          participants.map((user) => (
            <div className="Participant" key={user.id}>
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p>{user.username}</p>
                <FaMinus
                  size={22}
                  color="white"
                  className="DeleteParticipant"
                  onClick={() => handleRemoveParticipant(user.username)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <RecomendationButton />
    </section>
  );
}
