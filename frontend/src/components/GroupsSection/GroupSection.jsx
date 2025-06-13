import { useEffect, useRef, useState } from "react";
import "../../styles/Group.css";
import AddGroup from "../AddGroup/AddGroup";
import JoinedGroup from "../JoinedGroup/JoinedGroup";
import RecommendedGroup from "../RecommendedGroup/RecommendedGroup";
import { apiUtils } from "../../utils/apiUtils";

export default function GroupSect() {
  const joinedRef = useRef(null);
  const recommendedRef = useRef(null);
  const [recommendedGroups, setRecommendedGroups] = useState([]);

  useEffect(() => {
    const getRecommendedGroups = async () => {
      try {
        const response = await apiUtils({
          url: "api/current_user/group_affinities",
          method: "GET",
        });
        console.log(response);
        setRecommendedGroups(response.groups);
      } catch (error) {
        console.error("Error al obtener grupos recomendados:", error);
      }
    };
    getRecommendedGroups();
  }, []);

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
      <h1>Tus grupos</h1>
      <div className="JoinedGroupsContainer" ref={joinedRef}>
        <AddGroup />
        <JoinedGroup />
        <JoinedGroup />
        <JoinedGroup />
        <JoinedGroup />
        <JoinedGroup />
      </div>
      <h1>Recomendaciones de grupos</h1>
      <div className="RecommendedGroupsContainer" ref={recommendedRef}>
        {recommendedGroups.map((group) => (
          <RecommendedGroup
            key={group.group_id}
            groupNames={group.group_name}
            memberSizes={group.users_count}
            numberAffinities={Math.round(group.affinity_percentage).toString() + '%'}
          />
        ))}
      </div>
    </section>
  );
}
