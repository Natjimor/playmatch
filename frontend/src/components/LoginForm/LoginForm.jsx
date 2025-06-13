import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase';
import '../../styles/LoginForm.css'

export default function LoginForm() {

    const navigate = useNavigate();
    const irARegister = () => {
        navigate('/register');
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <section className='LoginSection'>
            <div className="LoginHeader">
                <img className='LogoLogin' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/LogoAzul.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvTG9nb0F6dWwucG5nIiwiaWF0IjoxNzQ5NDM0NTQxLCJleHAiOjE3ODA5NzA1NDF9.mSMmgRWZ2UcXaVab5Dl--EE-SuWfcBJquS00A0rC0G8" alt="LogoPlayMatch" />
                <h1>Inicia sesión en PlayMatch</h1>
            </div>

            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className='LoginFormInfo'>
                    <p>Correo electrónico</p>
                    <input
                        type="email"
                        name="email"
                        className='inputLogin'
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <div className='LoginEnlaces'>
                    <button type="submit">Ingresar</button>
                    <div className="LoginorRegister">
                        <p>¿Todavía no tienes una cuenta?</p>
                        <h5 onClick={irARegister} className='LoginEnlaceText'>Crea una</h5>
                    </div>
                </div>
            </form>
        </section>
    );
}