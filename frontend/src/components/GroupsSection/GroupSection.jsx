import { useEffect, useRef, useState } from "react";
import "../../styles/Group.css";
import AddGroup from "../AddGroup/AddGroup";
import JoinedGroup from "../JoinedGroup/JoinedGroup";
import RecommendedGroup from "../RecommendedGroup/RecommendedGroup";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../services/supabase";

export default function GroupSect() {
  const joinedRef = useRef(null);
  const recommendedRef = useRef(null);
  const { user } = useAuth();

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [username, setUsername] = useState("");
  console.log(username)

  useEffect(() => {
    const getUsernameAndGroups = async () => {
      if (!user) return;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error("Error al obtener username:", userError);
        return;
      }

      const currentUsername = userData.username;
      setUsername(currentUsername);

      // Buscar grupos donde el usuario está incluido
      const { data: groupsData, error: groupsError } = await supabase
        .from("groups")
        .select("*")
        .contains("group_users", [currentUsername]);

      if (groupsError) {
        console.error("Error al obtener grupos:", groupsError);
      } else {
        setJoinedGroups(groupsData);
      }
    };

    getUsernameAndGroups();
  }, [user]);

  // Scroll horizontal con rueda del mouse
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

    if (joined) joined.addEventListener("wheel", joinedListener, { passive: false });
    if (recommended) recommended.addEventListener("wheel", recommendedListener, { passive: false });

    return () => {
      if (joined) joined.removeEventListener("wheel", joinedListener);
      if (recommended) recommended.removeEventListener("wheel", recommendedListener);
    };
  }, []);

  return (
    <section className="GroupsSect">
      <h1>Tus grupos</h1>
      <div className="JoinedGroupsContainer" ref={joinedRef}>
        <AddGroup onGroupCreated={() => {
          // Recargar los grupos después de crear uno
          user && setUsername(prev => {
            const fetchGroups = async () => {
              const { data: newGroups, error } = await supabase
                .from("groups")
                .select("*")
                .contains("group_users", [prev]);
              if (!error) setJoinedGroups(newGroups);
            };
            fetchGroups();
            return prev;
          });
        }} />
        {joinedGroups.length === 0 ? (
          <p></p>
        ) : (
          joinedGroups.map((group) => (
            <JoinedGroup key={group.group_id} group={group} />
          ))
        )}
      </div>

      <h1>Recomendaciones de grupos</h1>
      <div className="RecommendedGroupsContainer" ref={recommendedRef}>
        <RecommendedGroup />
        <RecommendedGroup />
        <RecommendedGroup />
        <RecommendedGroup />
      </div>
    </section>
  );
}