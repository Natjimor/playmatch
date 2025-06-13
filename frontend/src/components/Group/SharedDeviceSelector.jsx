import React from "react";
import "./SharedDeviceSelector.css"

export default function SharedDeviceSelector({ value, onChange }) {
  const options = [
    { label: "Online multiplayer" },
    { label: "Online Co-Op" },
     { label: "Local Co-Op" }
  ];

  return (
    <div id="shared-selector">
      <h2 id="title3">¿Qué tipo de experiencia buscan?</h2>
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