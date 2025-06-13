import "../../styles/JoinedGroup.css";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function JoinedGroup({ group }) {

const navigate = useNavigate();

  const handleClick = () => {
    navigate("/groups", {
      state: {
        groupId: group.group_id,
        participants: group.group_users,
        fullGroupData: group,
      },
    });
  };

  return (
    <div className="JoinedGroup" onClick={handleClick}>
      <div className="JoinedGroupInfo">
        <p>{group.group_size} miembros</p>
        <FaEllipsisVertical size={18} className="InfoGroup" />
      </div>
      <h2>{group.group_name}</h2>
      <p className="CreatedJoined">Creador: {group.group_users[0]}</p>
    </div>
  );
}