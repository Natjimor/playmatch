import { FaRegUser, FaUserPlus, FaMinus } from "react-icons/fa";
import "../../styles/ParticipantsSection.css";
import RecomendationButton from "../RecommendationButton/RecommendationButton";
import { useAuth } from "../../context/AuthContext";

export default function ParticipantsSect({ groupUsers = [], onShowRecommendationForm }) {
  const { userName } = useAuth();

  return (
    <section className="ParticipantsSect">
        <div className="ParticipantsTittle">
            <h1>Integrantes</h1>
            <FaUserPlus size={24} color="white" className="AddParticipant"/>
        </div>
      
        <div className="ParticipantsContainer">
          {groupUsers.length > 0 ? (
            groupUsers.map((user, index) => (
              <div className="Participant" key={index}>
                <div className="ParticipantContent">
                  <div className="InviIcon">
                    <FaRegUser size={22} color="white" />
                  </div>
                  <p>{user}{user === userName && " (Tú)"}</p>
                  <FaMinus 
                    size={22} 
                    color="white" 
                    className="DeleteParticipant"
                    style={{ visibility: user === userName ? 'hidden' : 'visible' }} 
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="no-participants">No hay participantes en este grupo</div>
          )}
        </div>

        <div onClick={onShowRecommendationForm}>
          <RecomendationButton/>
        </div>
    </section>
  );
}