import { FaRegUser, FaUserMinus, FaUserPlus } from "react-icons/fa";
import "../../styles/ParticipantsSection.css";

export default function ParticipantsSect() {

  return (
    <section className="ParticipantsSect">
        <div className="ParticipantsTittle">
            <h1>Integrantes</h1>
            <FaUserPlus size={24} color="white" className="AddParticipant"/>
        </div>
      
        <div className="ParticipantsContainer">
            <div className="Participant">
              <div className="InvitationContent">
                <div className="InviIcon">
                  <FaRegUser size={22} color="white" />
                </div>
                <p> Natjimor</p>
                <FaUserMinus/>
              </div>
            </div>
        </div>
    </section>
  );
}