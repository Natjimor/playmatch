import "../../styles/JoinedGroup.css";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function JoinedGroup({ groupId, groupName, memberSize }) {

  return (
    <Link to={`/groups/${groupId}`} className="group-link">
      <div className="JoinedGroup">
          <div className="JoinedGroupInfo">
          <p>{memberSize || 0} miembros</p>
          <FaEllipsisVertical size={18} className="InfoGroup"/>
          </div>
          <h2>{groupName || "Nombre del grupo"}</h2>
      </div>
    </Link>
  );
}