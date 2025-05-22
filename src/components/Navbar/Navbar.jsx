import '../../styles/Navbar.css'

export default function Navbar() {

  return (
    <nav className='PlaymatchNav'>
        <div className='HomeLogo'>
            <img className='NavLogo' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoPM.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvTG9nb1BNLnBuZyIsImlhdCI6MTc0Nzg4MjQwOCwiZXhwIjoxNzc5NDE4NDA4fQ.c2HKB4sFVheq-nyUBgPzQFTH7xSA4f5Oebye7YKzK4s" alt="playmatch" />
            <p>Playmatch</p>
        </div>
        <div className='HomeButtons'>
            <button className='HomeRegister'>Registrarse</button>
            <button className='HomeLogin'>Iniciar sesión</button>
        </div>
    </nav>
  )
}