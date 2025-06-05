import React, { useState } from "react";
import VisualStoryImportance from "../../components/forms/visuales";
import PlaytimeSelector from "../../components/forms/tiempo";
import GenreSelector from "../../components/forms/genero";
import GroupExperienceSelector from "../../components/forms/experiencia";
import DifficultySelector from "../../components/forms/dificultad";
import { guardarPreferenciasUsuario } from "./guardar";

const steps = [
  "genres",
  "groupExperience",
  "difficulty",
  "playtime",
  "visualStory"
];

const initialState = {
  genres: [],
  groupExperience: [],
  difficulty: "",
  playtime: "",
  visualStory: 3
};

export default function RecommendationForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);

  const currentStep = steps[step];

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const vector = mapFormToVector(form);
      onSubmit(vector);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  guardarPreferenciasUsuario(form).then(res => {
  if (res.success) {
    console.log("Preferencias guardadas exitosamente");
    // redirigir o mostrar confirmación
  } else {
    console.error("Error al guardar preferencias:", res.error);
  }
});

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Recomendador de Videojuegos</h1>

      {currentStep === "genres" && (
        <GenreSelector selected={form.genres} onChange={val => handleMultiSelect("genres", val)} />
      )}
      {currentStep === "groupExperience" && (
        <GroupExperienceSelector selected={form.groupExperience} onChange={val => handleMultiSelect("groupExperience", val)} />
      )}
      {currentStep === "difficulty" && (
        <DifficultySelector value={form.difficulty} onChange={val => handleChange("difficulty", val)} />
      )}
      {currentStep === "playtime" && (
        <PlaytimeSelector value={form.playtime} onChange={val => handleChange("playtime", val)} />
      )}
      {currentStep === "visualStory" && (
        <VisualStoryImportance value={form.visualStory} onChange={val => handleChange("visualStory", val)} />
      )}

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {step < steps.length - 1 ? "Continuar" : "Enviar"}
        </button>
      </div>
    </div>
  );
}


