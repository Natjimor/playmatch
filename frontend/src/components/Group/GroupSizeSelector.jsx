import React from "react";
import "./GroupSizeSelector.css";

function GroupSizeSelector({ value, onChange }) {
  const options = [2, 3, 4, 5, 6];

  return (
    <div id="group-selector">
      <h2 id="titulo1">¿Cuántas personas jugarán?</h2>
      <div id="options-container">
        {options.map(size => (
          <label key={size} id="label1">
            <input
              type="radio"
              name="groupSize"
              value={size}
              checked={value === size}
              onChange={() => onChange(size)}
            />
            <span id="circle"></span>
            <span id="text">{size} jugadores</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default GroupSizeSelector