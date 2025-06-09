import RegisterForm from '../../components/RegisterForm/RegisterForm'
import '../../styles/Register.css'

export default function Register() {

  return (
    <div className='RegisterContainer'
    style={{
        backgroundImage: 'url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/FondoV.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRm9uZG9WLnBuZyIsImlhdCI6MTc0ODQ2OTgyOSwiZXhwIjoxNzgwMDA1ODI5fQ.NG4MKDjYMdbI-GZEuu2yFxBcLJJyN3642AcNEKU5Vlc")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}
    >
        <div className="Register">
            <RegisterForm/>
            <div className="RegisterIMG"
            style={{
                backgroundImage: 'url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Login.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvTG9naW4ucG5nIiwiaWF0IjoxNzQ5NDQ3Mjg0LCJleHAiOjE3ODA5ODMyODR9.aO3450mrljXrpg4v3g5NML0RRdjj3K7ry5hkqHtBP0A")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            ></div>
        </div>
    </div>
  )
}