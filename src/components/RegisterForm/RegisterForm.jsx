import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/RegisterForm.css';
import supabase from '../../services/supabase';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const irALogin = () => navigate('/login');

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName: fullName,
            },
        },
    });

    if (error) {
        setErrorMessage(error.message);
    } else {
        const userId = data.user?.id;
        if (!userId) {
            setErrorMessage("No se pudo obtener el ID del usuario.");
            return;
        }

        navigate('/forms', { state: { userId } });
    }
    };


    return (
        <section className='RegisterSection'>
            <div className="RegisterHeader">
                <img className='LogoRegister' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoAzul.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvTG9nb0F6dWwucG5nIiwiaWF0IjoxNzQ5NDM0NTQxLCJleHAiOjE3ODA5NzA1NDF9.mSMmgRWZ2UcXaVab5Dl--EE-SuWfcBJquS00A0rC0G8" alt="LogoPlayMatch" />
                <h1>Crea tu cuenta en PlayMatch</h1>
            </div>

            <form className="RegisterForm" onSubmit={handleSubmit}>
                <div className='RegisterFormInfo'>
                    <p>Correo electrónico</p>
                    <input
                        type="email"
                        name="email"
                        className='inputRegister'
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <p>Nombre de usuario</p>
                    <input
                        type="text"
                        name="fullName"
                        className='inputRegister'
                        placeholder="Ingresa tu nombre de usuario"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <p>Contraseña</p>
                    <div className="passwordInputContainer">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className='inputRegister'
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="togglePassword" onClick={togglePasswordVisibility}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>

                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>

                <div className='RegisterEnlaces'>
                    <button type="submit">Crear cuenta</button>
                    <div className="LoginorRegister">
                        <p>¿Ya tienes una cuenta?</p>
                        <h5 onClick={irALogin} className='RegisterEnlaceText'>Ingresar</h5>
                    </div>
                </div>
            </form>
        </section>
    );
}