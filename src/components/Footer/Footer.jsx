import '../../styles/Footer.css';
import { FaInstagram, FaTwitter, FaTelegramPlane } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="Footer">

      <div className='FooterInfo'>

        <div className='FooterLogo'>
          <img className='FooterLogo' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoPM.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvTG9nb1BNLnBuZyIsImlhdCI6MTc0NzkzMTIxNiwiZXhwIjoxNzc5NDY3MjE2fQ.HKtOrkOtEf3MQT_T22ggJF7gLe4GnnJbzrZsY9DfNiQ" alt="playmatch" />
          <p>Playmatch</p>
        </div>
        
        <div className="FooterSocial">
          <a href="#" aria-label="Instagram"><FaInstagram size={24} color="white"/></a>
          <a href="#" aria-label="Twitter"><FaTwitter size={24} color="white"/></a>
          <a href="#" aria-label="Telegram"><FaTelegramPlane size={24} color="white"/></a>
        </div>
      </div>

      <p className="FooterCopy">&copy; {new Date().getFullYear()} PlayMatch. Todos los derechos reservados.</p>
    </footer>
  );
}