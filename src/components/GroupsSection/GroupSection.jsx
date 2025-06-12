import "../../styles/Group.css";
import AddGroup from "../AddGroup/AddGroup";

export default function GroupSect() {

  return (
    <section className="GroupsSect">
      <h1>Tus grupos</h1>
      <div className="JoinedGroupsContainer">
        <AddGroup/>
        <div className="JoinedGroup">
          <h1>Hola</h1>
        </div>
      </div>

      <h1>Recomendaciones de grupos</h1>
      <div className="RecommendedGroupsContainer"></div>
    </section>
  );
}