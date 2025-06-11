import { FaRegUser } from 'react-icons/fa'
import '../../styles/Invitation.css'

export default function InvitationSect() {

  return (
    <section className='InvitationsSect'>
        <h1>Invitaciones</h1>
        <div className='InvitationsContainer'>
          <div className='Invitation'>
            <div className='InvitationContent'>
              <div className='InviIcon'>
                <FaRegUser size={22} color="#1E1E1E"/>
              </div>
              {/* <img src="https://www.wradio.com.co/resizer/v2/AWILDPLXHOBMS5WQAPP6YFZCFM.jpg?auth=26debeecbff253e7ab9ad7904a11c198973a82fadfb19d213956158070646a07&width=650&height=488&quality=70&smart=true" alt="Foto de perfil" /> */}
              <p>Natalia te ha invitado a unirte a un grupo</p>
            </div>
            <div className='InvitationButtons'>
              <button className='JoinButton'>Unirme</button>
              <button className='RefuseButton'>Rechazar</button>
            </div>
          </div>

          <div className='Invitation'>
            <div className='InvitationContent'>
              <div className='InviIcon'>
                <FaRegUser size={22} color="#1E1E1E"/>
              </div>
              {/* <img src="https://www.wradio.com.co/resizer/v2/AWILDPLXHOBMS5WQAPP6YFZCFM.jpg?auth=26debeecbff253e7ab9ad7904a11c198973a82fadfb19d213956158070646a07&width=650&height=488&quality=70&smart=true" alt="Foto de perfil" /> */}
              <p>Natalia te ha invitado a unirte a un grupo</p>
            </div>
            <div className='InvitationButtons'>
              <button className='JoinButton'>Unirme</button>
              <button className='RefuseButton'>Rechazar</button>
            </div>
          </div>

          <div className='Invitation'>
            <div className='InvitationContent'>
              <div className='InviIcon'>
                <FaRegUser size={22} color="#1E1E1E"/>
              </div>
              {/* <img src="https://www.wradio.com.co/resizer/v2/AWILDPLXHOBMS5WQAPP6YFZCFM.jpg?auth=26debeecbff253e7ab9ad7904a11c198973a82fadfb19d213956158070646a07&width=650&height=488&quality=70&smart=true" alt="Foto de perfil" /> */}
              <p>Natalia te ha invitado a unirte a un grupo</p>
            </div>
            <div className='InvitationButtons'>
              <button className='JoinButton'>Unirme</button>
              <button className='RefuseButton'>Rechazar</button>
            </div>
          </div>

          <div className='Invitation'>
            <div className='InvitationContent'>
              <div className='InviIcon'>
                <FaRegUser size={22} color="#1E1E1E"/>
              </div>
              {/* <img src="https://www.wradio.com.co/resizer/v2/AWILDPLXHOBMS5WQAPP6YFZCFM.jpg?auth=26debeecbff253e7ab9ad7904a11c198973a82fadfb19d213956158070646a07&width=650&height=488&quality=70&smart=true" alt="Foto de perfil" /> */}
              <p>Natalia te ha invitado a unirte a un grupo</p>
            </div>
            <div className='InvitationButtons'>
              <button className='JoinButton'>Unirme</button>
              <button className='RefuseButton'>Rechazar</button>
            </div>
          </div>

        </div>
    </section>
  )
}