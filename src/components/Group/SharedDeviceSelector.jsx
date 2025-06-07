import React from "react";

export default function SharedDeviceSelector({ value, onChange }) {
  const options = [
    { label: "Sí, jugaremos en un solo dispositivo", value: "sí" },
    { label: "No, cada uno usará su dispositivo", value: "no" }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">¿Compartirán un solo dispositivo?</h2>
      <div className="flex flex-col gap-3">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="sharedDevice"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-blue-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
