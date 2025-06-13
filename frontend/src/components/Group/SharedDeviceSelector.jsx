import React from "react";
import "./SharedDeviceSelector.css"

export default function SharedDeviceSelector({ value, onChange }) {
  const options = [
    { label: "Online multiplayer", value: "Online multiplayer" },
    { label: "Online Co-Op", value: "Online Co-Op" },
    { label: "Local Co-Op", value: "Local Co-Op" }
  ];

  // Log para depurar
  console.log("SharedDeviceSelector rendering with value:", value);

  const handleSelect = (selectedValue) => {
    console.log("SharedDeviceSelector selected:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div id="shared-selector">
      <h2 id="title3">¿Qué tipo de experiencia buscan?</h2>
      <div id="shared-options-container">
        {options.map((opt, index) => {
          const isSelected = value === opt.value;
          console.log(`Option ${opt.label}: ${isSelected ? 'selected' : 'not selected'}`);
          
          return (
            <label key={index} id={`shared-label-${index}`}>
              <input
                type="radio"
                name="sharedDevice"
                id={`shared-input-${index}`}
                value={opt.value}
                checked={isSelected}
                onChange={() => handleSelect(opt.value)}
              />
              <span id={`shared-circle-${index}`}></span>
              <span id={`shared-text-${index}`}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}