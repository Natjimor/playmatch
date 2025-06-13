import React, { useEffect, useRef, useState } from 'react';
import "../../styles/Group.css";
import "../../styles/GroupTransition.css";
import RecommendedGroup from "../RecommendedGroup/RecommendedGroup";
import JoinedGroup from "../JoinedGroup/JoinedGroup";
import GroupSkeleton from "../SkeletonLoaders/GroupSkeleton";
import { useAuth } from "../../context/AuthContext";
import { apiUtils } from "../../utils/apiUtils";
import AddGroup from "../AddGroup/AddGroup";

export default function GroupSection() {
  const [recommendedGroups, setRecommendedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState({});
  const joinedRef = useRef();
  const recommendedRef = useRef();
  const { user } = useAuth();

  function handleGroupJoined(joinedGroup) {
    // Marcar este grupo como "cargando" durante la transición
    setLoadingGroups(prev => ({
      ...prev,
      [joinedGroup.group_id]: true
    }));
    
    // 1. Eliminar el grupo de la lista de recomendados
    setRecommendedGroups(prev => 
      prev.filter(group => group.group_id !== joinedGroup.group_id)
    );
    
    // 2. Agregar a la lista de grupos unidos con un pequeño retraso para animar
    setTimeout(() => {
      // Añadir el grupo con la propiedad isNew para activar la animación
      // Añadimos al principio del arreglo para que aparezca primero (izquierda a derecha)
      setJoinedGroups(prev => [{ ...joinedGroup, isNew: true }, ...prev]);
      
      // Eliminar el estado de "cargando" para este grupo
      setLoadingGroups(prev => {
        const updated = {...prev};
        delete updated[joinedGroup.group_id];
        return updated;
      });
      
      // Después de 2 segundos, quitamos la marca de "nuevo" para que la animación no se repita
      setTimeout(() => {
        setJoinedGroups(prev => 
          prev.map(group => 
            group.group_id === joinedGroup.group_id ? 
              { ...group, isNew: false } : group
          )
        );
      }, 2000);
    }, 1000); // Retraso de 1 segundo para la animación
  }
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        console.error("No hay usuario logueado");
        setLoading(false);
        return;
      }

      try {
        // Obtener grupos recomendados
        const recommendedResponse = await apiUtils({
          url: "api/current_user/group_affinities",
          method: "GET"
        });
        setRecommendedGroups(recommendedResponse.groups || []);

        // Obtener grupos unidos
        const joinedResponse = await apiUtils({
          url: `api/current_user/joined_groups/${user.id}`,
          method: "GET"
        });
        setJoinedGroups(joinedResponse.joined_groups || []);
      } catch (error) {
        console.error("Error al obtener grupos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  console.log(recommendedGroups);

  useEffect(() => {
    const handleWheel = (e, container) => {
      if (container && e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const joined = joinedRef.current;
    const recommended = recommendedRef.current;

    const joinedListener = (e) => handleWheel(e, joined);
    const recommendedListener = (e) => handleWheel(e, recommended);

    if (joined)
      joined.addEventListener("wheel", joinedListener, { passive: false });
    if (recommended)
      recommended.addEventListener("wheel", recommendedListener, {
        passive: false,
      });

    return () => {
      if (joined) joined.removeEventListener("wheel", joinedListener);
      if (recommended)
        recommended.removeEventListener("wheel", recommendedListener);
    };
  }, []);

  return (
    <section className="GroupsSect">
      <div className="GroupsHeader">
        <h1>Tus grupos</h1>
        <AddGroup />
      </div>
      <div className="JoinedGroupsContainer" ref={joinedRef}>
        {loading ? (
          [...Array(4)].map((_, index) => (
            <GroupSkeleton key={`joined-skeleton-${index}`} type="joined" />
          ))
        ) : joinedGroups.length > 0 ? (
          joinedGroups.map((group) => (
            <div 
              key={group.group_id}
              className={`group-container ${group.isNew ? 'group-joining' : ''}`}
            >
              <JoinedGroup 
                groupId={group.group_id}
                groupName={group.group_name}
                memberSize={group.group_size || (group.group_users ? group.group_users.length : 0)}
              />
            </div>
          ))
        ) : (
          <p className="NoGroupsMessage">Aún no te has unido a ningún grupo</p>
        )}
      </div>
      <div className="GroupsHeader">
        <h1>Recomendaciones de grupos</h1>
      </div>
      <div className="RecommendedGroupsContainer" ref={recommendedRef}>
        {loading ? (
          [...Array(4)].map((_, index) => (
            <GroupSkeleton key={`recommended-skeleton-${index}`} type="recommended" />
          ))
        ) : recommendedGroups.length > 0 ? (
          recommendedGroups.map((group) => (
            <div 
              key={group.group_id} 
              className={loadingGroups[group.group_id] ? 'group-loading' : ''}
            >
              <RecommendedGroup
                groupId={group.group_id}
                groupNames={group.group_name}
                memberSizes={group.users_count}
                numberAffinities={Math.round(group.affinity_percentage).toString() + '%'}
                onGroupJoined={handleGroupJoined}
              />
            </div>
          ))
        ) : (
          <p className="NoGroupsMessage">No hay grupos recomendados disponibles</p>
        )}
      </div>
    </section>
  );
}
