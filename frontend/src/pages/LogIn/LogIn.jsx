import LoginForm from '../../components/LoginForm/LoginForm'
import '../../styles/Login.css'

export default function Login() {

  return (
    <div className='LoginContainer'
    style={{
        backgroundImage: 'url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/FondoV.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRm9uZG9WLnBuZyIsImlhdCI6MTc0ODQ2OTgyOSwiZXhwIjoxNzgwMDA1ODI5fQ.NG4MKDjYMdbI-GZEuu2yFxBcLJJyN3642AcNEKU5Vlc")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}
    >
        <div className="Login">
            <LoginForm/>
            <div className="LoginIMG"
            style={{
                backgroundImage: 'url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/8978969.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvODk3ODk2OS5wbmciLCJpYXQiOjE3NDk0NDAxNzEsImV4cCI6MTc4MDk3NjE3MX0.vKbhRBwgyALBq-O9beOm6zaIDk0FDZ8FplgIWcWkqy4")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            ></div>
        </div>
    </div>
  )
}
