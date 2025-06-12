import React from "react";


function PlatformSelector({ selected, onChange }) {
  const options = ["PC", "PlayStation 4", "PlayStation 5", "Xbox One","Xbox Serie S/X","Xbox 360", "Nintendo Switch", "Nintendo 3DS", "Nintendo 64", "IOS", "Android"];
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