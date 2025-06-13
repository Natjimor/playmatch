import "../../styles/JoinedGroup.css";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function JoinedGroup({ group }) {
  return (
    <div className="JoinedGroup">
      <div className="JoinedGroupInfo">
        <p>{group.group_size} miembros</p>
        <FaEllipsisVertical size={18} className="InfoGroup" />
      </div>
      <h2>{group.group_name}</h2>
      <p className="CreatedJoined">Creador: {group.group_users[0]}</p>
    </div>
  );
}