import React from "react";
import "./PlatformSelector.css";

export default function PlatformSelector({ selected, onChange }) {
  const options = [
    "PC", "PlayStation 4", "PlayStation 5", "Xbox One",
    "Xbox Serie S/X", "Xbox 360", "Nintendo Switch",
    "Nintendo 3DS", "Nintendo 64", "IOS", "Android"
  ];

  const handleSelect = (platform) => {
    onChange(platform);
  };

  return (
    <div id="platform-selector">
      <h2 id="title2">¿En qué plataformas quieren jugar?</h2>
      <div id="platforms-container">
       {options.map((platform) => {
  const id = platform.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return (
    <label key={platform} id={`label-${id}`}>
      <input
        id={`input-${id}`}
        type="radio"
        name="platform"
        checked={selected === platform}
        onChange={() => handleSelect(platform)}
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

