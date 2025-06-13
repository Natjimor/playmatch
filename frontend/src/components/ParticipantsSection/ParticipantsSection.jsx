import { FaRegUser, FaUserPlus, FaMinus} from "react-icons/fa";
import "../../styles/ParticipantsSection.css";
import RecomendationButton from "../RecommendationButton/RecommendationButton";

export default function ParticipantsSect() {

  return (
    <section className="ParticipantsSect">
        <div className="ParticipantsTittle">
            <h1>Integrantes</h1>
            <FaUserPlus size={24} color="white" className="AddParticipant"/>
        </div>
      
        <div className="ParticipantsContainer">
            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>

            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>
            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>
            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>
            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>
            <div className="Participant">
              <div className="ParticipantContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaMinus size={22} color="white" className="DeleteParticipant"/>
              </div>
            </div>
        </div>

        <RecomendationButton/>
    </section>
  );
}