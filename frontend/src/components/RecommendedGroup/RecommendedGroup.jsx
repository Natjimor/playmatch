import { useState } from "react";
import "../../styles/RecommendedGroup.css";
import { apiUtils } from "../../utils/apiUtils";
import { useAuth } from "../../context/AuthContext";

export default function RecommendedGroup({ groupId, memberSizes, groupNames, numberAffinities, onGroupJoined }) {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const { user } = useAuth();
  
  const handleJoinGroup = async () => {
    try {
      setJoining(true);
      
      if (!user || !user.id) {
        alert("Necesitas iniciar sesión para unirte a un grupo");
        setJoining(false);
        return;
      }
      
      // Obtener el nombre de usuario correcto
      // Priorizar el username específico si existe
      const username = user.user_metadata?.username || 
                      user.user_metadata?.preferred_username || 
                      user.user_metadata?.name || 
                      user.user_metadata?.full_name || 
                      user.email.split('@')[0]; // Usar la parte antes del @ si todo lo demás falla
      
      // Llamar al endpoint para unirse al grupo
      const response = await apiUtils({
        url: "api/group/join",
        method: "POST",
        body: {
          user_id: user.id,
          username: username,
          group_id: groupId
        }
      });
      
      if (response.status === "success") {
        setJoined(true);
        // Notificar al componente padre que el usuario se unió a este grupo
        if (onGroupJoined) {
          onGroupJoined({
            group_id: groupId,
            group_name: groupNames,
            group_users: response.updated_group_users || [],
            group_size: memberSizes
          });
        }
      } else if (response.status === "already_member") {
        alert("Ya eres miembro de este grupo");
      }
    } catch (error) {
      console.error("Error al unirse al grupo:", error);
      alert("Ocurrió un error al intentar unirse al grupo");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="RecommendedGroup">
      <p className="CreatedRecommended">{memberSizes} miembros</p>
      <h2>{groupNames}</h2>
      <span>{numberAffinities} afinidad</span>
      <div className="JoinRecommendedGroup">
        {joined ? (
          <button className="JoinRecommendedButton joined" disabled>
            Unido
          </button>
        ) : (
          <button 
            className="JoinRecommendedButton" 
            onClick={handleJoinGroup} 
            disabled={joining}
          >
            {joining ? "Uniéndose..." : "Unirme"}
          </button>
        )}
      </div>
    </div>
  );
}