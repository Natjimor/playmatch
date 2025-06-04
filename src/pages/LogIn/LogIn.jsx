import React, { useState } from "react";
import { supabase } from "../Register/supabaseClient";
import "./login.css"
const LogIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
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

        const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess("Inicio de sesión exitoso.");
            setForm({
                email: "",
                password: "",
            });
        }
    };

    return (
        <div id="iniciarSesion" style={{ margin: "40px auto", padding: 24, borderRadius: 8 }}>
          <div id="img1"><p>.</p></div>
           <div id="form1">
            <h2 > Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
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
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
                {success && <div style={{ color: "green", marginBottom: 12 }}>{success}</div>}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: 10,
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                    }}
                >
                    Iniciar Sesión
                </button>
            </form>
            </div>
        </div>
    );
};

export default LogIn;