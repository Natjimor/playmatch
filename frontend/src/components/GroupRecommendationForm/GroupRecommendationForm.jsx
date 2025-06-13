import React, { useState } from "react";
import PlatformSelector from "../../components/Group/PlatformSelector"
import SharedDeviceSelector from "../../components/Group/SharedDeviceSelector"
import { guardarPreferenciasGrupo } from "./guardarPreferenciasGrupo"
import "./GroupRecommendationForm.css"

const steps = ["platforms", "sharedDevice"];

const initialState = {
  groupSize: "",
  platforms: [],
  sharedDevice: ""
};

function GroupRecommendationForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const currentStep = steps[step];

  const handleChange = (key, value) => {
    console.log(`Cambiando ${key} a:`, value);
    setForm(prev => {
      const newForm = { ...prev, [key]: value };
      console.log("Nuevo estado del formulario:", newForm);
      return newForm;
    });
  };

  const handleNext = () => {
    // Limpiar mensaje de error anterior
    setError(null);
    
    // Validar según el paso actual
    if (currentStep === "platforms") {
      if (form.platforms.length === 0) {
        setError("Por favor selecciona al menos una plataforma.");
        return;
      }
      // Todo bien, avanzamos al siguiente paso
      setStep(step + 1);
      return;
    }
    
    if (currentStep === "sharedDevice") {
      if (!form.sharedDevice) {
        setError("Por favor selecciona un tipo de experiencia.");
        return;
      }
      // Es el último paso, procesamos el formulario
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Mostrar información de depuración
      console.log("Estado del formulario:", form);
      
      // Validar que el usuario haya seleccionado al menos una plataforma
      if (!form.platforms || form.platforms.length === 0) {
        setError("Debes seleccionar al menos una plataforma");
        setIsSubmitting(false);
        return;
      }
      
      // Validar que el usuario haya seleccionado un tipo de dispositivo compartido
      if (!form.sharedDevice || form.sharedDevice === "") {
        setError("Debes seleccionar un tipo de dispositivo compartido");
        console.log("Valor de sharedDevice:", form.sharedDevice);
        setIsSubmitting(false);
        return;
      }
      
      // Preparar los datos del formulario
      const formData = {
        platforms: form.platforms,
        sharedDevice: form.sharedDevice,
        groupId: window.location.pathname.split('/').pop() // Extraer el ID de grupo de la URL
      };

      console.log("Datos enviados al servicio:", formData);

      // Llamar a la función para enviar al servicio
      guardarPreferenciasGrupo(formData).then(res => {
        console.log("Respuesta del servicio:", res);
        if (res.success) {
          console.log("Preferencias grupales guardadas exitosamente");
          if (onSubmit) {
            onSubmit(formData);
          }
          // Reiniciamos el formulario y cerramos
          setForm(initialState);
          setStep(0); 
          if (onClose) onClose();
        } else {
          setError(res.error || "Error al guardar preferencias");
          console.error("Error al guardar preferencias grupales:", res.error);
        }
      });
      
    } catch (err) {
      setError(err.message || "Error desconocido. Inténtalo de nuevo.");
      console.error("Error al enviar formulario:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (onClose) {
      // Si estamos en el primer paso, el botón atrás debe cerrar el formulario
      onClose();
    }
  };

  // Debug del estado actual al renderizar
  console.log("[RENDER] Estado actual:", {
    currentStep, 
    platformsValue: form.platforms, 
    sharedDeviceValue: form.sharedDevice,
    error
  });

  return (
    <div className="group-form-container">
      <h1 className="group-form-title">Preferencias del Grupo</h1>

      {error && <div className="form-error">{error}</div>}

      {currentStep === "platforms" && (
        <PlatformSelector 
          selected={form.platforms} 
          onChange={(newSelection) => handleChange("platforms", newSelection)}
        />
      )}
      {currentStep === "sharedDevice" && (
        <SharedDeviceSelector 
          value={form.sharedDevice} 
          onChange={val => handleChange("sharedDevice", val)} 
        />
      )}

      <div className="group-form-buttons">
        <button
          onClick={handleBack}
          className="group-form-button back"
          disabled={isSubmitting}
        >
          {step === 0 ? "Cancelar" : "Atrás"}
        </button>
        <button
          onClick={handleNext}
          className="group-form-button next"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : (step < steps.length - 1 ? "Continuar" : "Enviar")}
        </button>
      </div>
    </div>
  );
}

export default GroupRecommendationForm;
