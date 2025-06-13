import React, { useState } from "react";
import PlatformSelector from "./../../components/Group/PlatformSelector"
import SharedDeviceSelector from "./../../components/Group/SharedDeviceSelector"
import "./Group_form.css"
import guardarPreferenciasGrupo from "./guardarPreferenciasGrupo"
const steps = ["platforms", "sharedDevice"];

const initialState = {
  groupSize: "",
  platforms: [],
  sharedDevice: ""
};
function GroupRecommendationForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(1);

  const currentStep = steps[step];

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };


const handleNext = () => {
  if (currentStep === "platforms" && form.platforms.length === 0) {
    alert("Por favor selecciona al menos una plataforma.");
    return;
  }


  if (step < steps.length - 1) {
    setStep(step + 1);
  } else {
    guardarPreferenciasGrupo(form).then(res => {
      if (res.success) {
        console.log("Preferencias grupales guardadas exitosamente");
        onSubmit?.(form); 
      } else {
        console.error("Error al guardar preferencias grupales:", res.error);
      }
    });
  }
};


  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div id="containerprincipal">
      <h1 id="titleprincipal">Preferencias del Grupo</h1>

      {currentStep === "platforms" && (
       <PlatformSelector selected={form.platforms} onChange={(newSelection) => handleChange("platforms", newSelection)}/>
      )}
      {currentStep === "sharedDevice" && (
        <SharedDeviceSelector value={form.sharedDevice} onChange={val => handleChange("sharedDevice", val)} />
      )}

      <div id="buttons">
        <button
          onClick={handleBack}
          disabled={step === 0}
          id="back"
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          id="next"
        >
          {step < steps.length - 1 ? "Continuar" : "Enviar"}
        </button>
      </div>
    </div>
  );
}

export default GroupRecommendationForm