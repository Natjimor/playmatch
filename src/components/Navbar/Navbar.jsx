import '../../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const navigateRegister = () => {
    navigate('/register')
  }
  const navigateLogin = () => {
    navigate('/login')
  }

  return (
    <nav className='PlaymatchNav'>
        <div className='HomeLogo'>
            <img className='NavLogo' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoPM.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvTG9nb1BNLnBuZyIsImlhdCI6MTc0NzkzMTIxNiwiZXhwIjoxNzc5NDY3MjE2fQ.HKtOrkOtEf3MQT_T22ggJF7gLe4GnnJbzrZsY9DfNiQ" alt="playmatch" />
            <p>Playmatch</p>
        </div>
        <div className='HomeButtons'>
            <button className='HomeRegister' onClick={navigateRegister}>Registrarse</button>
            <button className='HomeLogin' onClick={navigateLogin}>Iniciar sesión</button>
        </div>
    </nav>
  )
}