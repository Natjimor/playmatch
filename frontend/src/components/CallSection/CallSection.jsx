import { useNavigate } from 'react-router-dom';
import '../../styles/CallSection.css'
import { FaTelegramPlane } from "react-icons/fa";

export default function CalltoAction() {

  const navigate = useNavigate();
    const irARegister = () => {
        navigate('/register');
    };

  return (
    <section className='CalltoActSect'
    style={{
      backgroundImage: `linear-gradient(to top,#140151,#1401510b,#14015100),url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/FondoV.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRm9uZG9WLnBuZyIsImlhdCI6MTc0ODQ2OTgyOSwiZXhwIjoxNzgwMDA1ODI5fQ.NG4MKDjYMdbI-GZEuu2yFxBcLJJyN3642AcNEKU5Vlc")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
        <div className='CalltoActInfo'>
          <h2>¿Tu grupo de amigos nunca se decide a qué jugar? ¡Dejen que PlayMatch lo resuelva por ustedes!</h2>
          <p>Reúnanse, compartan sus gustos y reciban recomendaciones personalizadas en segundos.</p>
          <div className='CalltoActBtn'>
            <button className='CallBtnWeb'onClick={irARegister}>Comienza desde la web</button>
            <button className='CallBtnTel' onClick={() => window.open("https://t.me/PlayMatch_bot")}><FaTelegramPlane size={25} color="white" />Comienza con nuestro Bot</button>
          </div>
        </div>
        <div className='CalltoActImg'
        style={{
          backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Mando.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvTWFuZG8ucG5nIiwiaWF0IjoxNzQ4NDcwNDkxLCJleHAiOjE3ODAwMDY0OTF9.pts_y1QL8EVXQTuojU9nM57ha4PI4UBePRLZ2-9HxIM")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        >
        </div>
    </section>
  )
}