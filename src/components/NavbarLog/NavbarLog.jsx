import '../../styles/NavbarLog.css'
import { useNavigate } from 'react-router-dom'
import { FaRegBell, FaRegUser } from "react-icons/fa";

export default function NavbarLog() {
  const navigate = useNavigate()

  const navigateProfile = () => {
    navigate('/profile')
  }

  return (
    <nav className='PlaymatchNavLog'>
        <div className='HomeLogLogo'>
            <img className='NavLogLogo' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoPM.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvTG9nb1BNLnBuZyIsImlhdCI6MTc0NzkzMTIxNiwiZXhwIjoxNzc5NDY3MjE2fQ.HKtOrkOtEf3MQT_T22ggJF7gLe4GnnJbzrZsY9DfNiQ" alt="playmatch" />
            <p>Playmatch</p>
        </div>
        
        <div className='HomeLogButtons'>
          <div className='UserInformation' onClick={navigateProfile}>
            {/* <img src="https://www.wradio.com.co/resizer/v2/AWILDPLXHOBMS5WQAPP6YFZCFM.jpg?auth=26debeecbff253e7ab9ad7904a11c198973a82fadfb19d213956158070646a07&width=650&height=488&quality=70&smart=true" alt="Foto de perfil" className='HomeLogLogin' onClick={navigateLogin}/> */}
            <div className='NavLogIcon'>
              <FaRegUser size={22} color="white" className='NavLogNotification'/>
            </div>
            <p>Natjimor</p>
          </div>
                
          <div className='NavLogIcon'>
            <FaRegBell size={22} color="white" className='NavLogNotification'/>
          </div>
        </div>
    </nav>
  )
}