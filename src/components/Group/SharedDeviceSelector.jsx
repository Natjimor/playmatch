import React from "react";
import "./SharedDeviceSelector.css";

function SharedDeviceSelector({ value, onChange }) {
  const options = [
    { label: "Sí, jugaremos en un solo dispositivo", value: "sí" },
    { label: "No, cada uno usará su dispositivo", value: "no" }
  ];

  return (
    <div id="shared-selector">
      <h2 id="title3">¿Compartirán un solo dispositivo?</h2>
      <div id="shared-options-container">
        {options.map((opt, index) => (
          <label key={opt.value} id={`shared-label-${index}`}>
            <input
              type="radio"
              name="sharedDevice"
              id={`shared-input-${index}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span id={`shared-circle-${index}`}></span>
            <span id={`shared-text-${index}`}>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SharedDeviceSelector

