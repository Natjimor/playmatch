import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTACIÓN AQUÍ
import PlaytimeSelector from "../../components/individual/Duracion";
import GenreSelector from "../../components/individual/genero";
import Game_antique from "../../components/individual/tiempo";
import { guardarPreferenciasUsuario } from "./guardar";
import mapFormToVector from "./mapFormToVector";
import "./individualForm.css";
import supabase from "../../services/supabase";

const steps = ["genres", "game_antique", "playtime"];

const initialState = {
  genres: [],
  game_antique: "",
  playtime: "",
};

export default function RecommendationForm({ onSubmit }) {
  const navigate = useNavigate(); // ✅ AQUÍ ADENTRO, DENTRO DEL COMPONENTE

  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState("");

  const currentStep = steps[step];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const name = user.user_metadata?.fullName || user.user_metadata?.name || "anon";
        setFullName(name);
      } else {
        console.error("No se pudo obtener el usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const vector = mapFormToVector(form);
      onSubmit && onSubmit(vector);

      if (!userId) {
        console.error("No hay ID de usuario disponible");
        return;
      }

      const res = await guardarPreferenciasUsuario(form, userId, fullName);
      if (res.success) {
        console.log("Preferencias guardadas exitosamente");
        navigate("/dashboard"); // ✅ NAVEGACIÓN AQUÍ
      } else {
        console.error("Error al guardar preferencias:", res.error);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      {currentStep === "genres" && (
        <GenreSelector selected={form.genres} onChange={val => handleMultiSelect("genres", val)} />
      )}
      {currentStep === "game_antique" && (
        <Game_antique value={form.game_antique} onChange={val => handleChange("game_antique", val)} />
      )}
      {currentStep === "playtime" && (
        <PlaytimeSelector value={form.playtime} onChange={val => handleChange("playtime", val)} />
      )}

      <div id="buttons">
        <button onClick={handleBack} disabled={step === 0} id="back">
          Atrás
        </button>
        <button onClick={handleNext} id="next">
          {step < steps.length - 1 ? "Continuar" : "Enviar"}
        </button>
      </div>
    </div>
  );
}