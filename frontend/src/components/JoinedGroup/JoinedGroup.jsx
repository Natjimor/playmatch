import "../../styles/JoinedGroup.css";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function JoinedGroup({ groupName, memberSize }) {

  return (
    <div className="JoinedGroup">
        <div className="JoinedGroupInfo">
        <p>{memberSize || 0} miembros</p>
        <FaEllipsisVertical size={18} className="InfoGroup"/>
        </div>
        <h2>{groupName || "Nombre del grupo"}</h2>
    </div>
  );
}