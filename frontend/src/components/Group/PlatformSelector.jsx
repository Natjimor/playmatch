import React from "react";
import "./PlatformSelector.css";

function PlatformSelector({ selected, onChange }) {
  const options = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Móvil"];

  const handleToggle = (platform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter(p => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div id="platform-selector">
      <h2 id="title2">¿En qué plataformas quieren jugar?</h2>
      <div id="platforms-container">
        {options.map((platform) => {
          const id = platform.toLowerCase().replace(/\s+/g, "-");
          return (
            <label key={id} id={`label-${id}`}>
              <input
                id={`input-${id}`}
                type="checkbox"
                checked={selected.includes(platform)}
                onChange={() => handleToggle(platform)}
              />
              <span id={`checkbox-${id}`}></span>
              <span id={`text-${id}`}>{platform}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default  PlatformSelector