import "../../styles/JoinedGroup.css";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function JoinedGroup() {

  return (
    <div className="JoinedGroup">
        <div className="JoinedGroupInfo">
        <p>4 miembros</p>
        <FaEllipsisVertical size={18} className="InfoGroup"/>
        </div>
        <h2>Nombre del grupo</h2>
        <p className="CreatedJoined">Creador: Natjimor</p>
    </div>
  );
}