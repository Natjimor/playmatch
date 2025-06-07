import React from "react";

export default function PlatformSelector({ selected, onChange }) {
  const options = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Móvil"];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">¿En qué plataformas quieren jugar?</h2>
      <div className="flex gap-2 flex-wrap">
        {options.map(platform => (
          <button
            key={platform}
            onClick={() => onChange(platform)}
            className={`px-4 py-2 rounded border 
              ${selected.includes(platform) ? "bg-blue-600 text-white" : "bg-white border-gray-300"}`}
          >
            {platform}
          </button>
        ))}
      </div>
    </div>
  );
}
