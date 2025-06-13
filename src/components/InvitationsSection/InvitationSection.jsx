import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { FaRegUser } from "react-icons/fa";
import "../../styles/Invitation.css";

export default function InvitationSect() {
  const [invitations, setInvitations] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      setCurrentUserId(userId);

      if (!userId) return;

      const { data, error } = await supabase
        .from("invitations")
        .select("*, groups(group_name), users:sender_id(username)")
        .eq("receiver_id", userId)
        .eq("status", "pending");

      if (error) console.error("Error al cargar invitaciones:", error);
      else setInvitations(data);
    };

    fetchInvitations();
  }, []);

  const handleResponse = async (invitationId, groupId, action) => {
  const isAccepted = action === "accepted";

  // 1. Actualiza el estado de la invitación
  const { error: updateError } = await supabase
    .from("invitations")
    .update({ status: action })
    .eq("id", invitationId);

  if (updateError) {
    console.error("Error al actualizar invitación:", updateError);
    return;
  }

  // 2. Si fue aceptada, añade el usuario al grupo
  if (isAccepted && currentUserId) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("id", currentUserId)
      .single();

    if (userError || !userData) {
      console.error("Error al obtener username:", userError);
      return;
    }

    const username = userData.username;

    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .select("group_users, group_size")
      .eq("group_id", groupId)
      .single();

    if (groupError || !groupData) {
      console.error("Error al obtener grupo:", groupError);
      return;
    }

    const updatedUsers = [...groupData.group_users, username];
    const updatedSize = (groupData.group_size || 0) + 1;

    const { error: updateGroupError } = await supabase
      .from("groups")
      .update({ group_users: updatedUsers, group_size: updatedSize })
      .eq("group_id", groupId);

    if (updateGroupError) {
      console.error("Error al actualizar grupo:", updateGroupError);
    }
  }

  // 3. Actualiza la UI
  setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
};


  return (
    <section className="InvitationsSect">
      <h1>Invitaciones</h1>
      <div className="InvitationsContainer">
        {invitations.length === 0 ? (
          <p>No tienes invitaciones pendientes.</p>
        ) : (
          invitations.map((inv) => (
            <div className="Invitation" key={inv.id}>
              <div className="InvitationContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p>{inv.users.username} te ha invitado al grupo "{inv.groups.group_name}"</p>
              </div>
              <div className="InvitationButtons">
                <button
                  className="JoinButton"
                  onClick={() => handleResponse(inv.id, inv.group_id, "accepted")}
                >
                  Unirme
                </button>
                <button
                  className="RefuseButton"
                  onClick={() => handleResponse(inv.id, inv.group_id, "rejected")}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
