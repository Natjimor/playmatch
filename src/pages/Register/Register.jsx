import React, { useState } from "react";
import supabase from "../../services/supabase";
import { useNavigate } from 'react-router-dom'
import "./Register.css"

const Register = () => {
    const navigate = useNavigate()
    
      const IniciarSesion = () => {
        navigate('/login')
      }

      const formulario = () => {
        navigate('/formindividual')
      }

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
    }

    // Paso 1: Registrar usuario
    const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
            data: {
                username: form.username,
            }
        }
    });

    if (error) {
        setError(error.message);
        return;
    }

    const userId = data.user?.id; // El ID único del usuario
    if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        return;
    }

    // Paso 2: Insertar en la tabla 'userss'
    const { error: insertError } = await supabase.from('userss').insert({
        id: userId,
        email: form.email,
        username: form.username
    });

    if (insertError) {
        setError("Error al insertar en la tabla userss: " + insertError.message);
        return;
    }

    setSuccess("Registro exitoso.");
    setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Paso 3: Navegar al formulario
    navigate('/formindividual');
};


    return (
       
      <div id="resgistro" style={{ margin: "40px auto", padding: 24, }}>
        <div id="img"><p>.</p></div>
        <div id="form">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Usuario</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8}}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8}}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>
                {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
                {success && <div style={{ color: "green", marginBottom: 12 }}>{success}</div>}
               <button type="submit">Next</button>
               <p>Ya tienes una cuenta? <a href="" onClick={IniciarSesion} >Login</a></p>
            </form>
            </div>
        </div>
    );
};

export default Register;
