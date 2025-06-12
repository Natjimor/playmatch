import "./dificultad.css"
function PlaytimeSelector({ value, onChange }) {
  return (
    <div id="Individual-options">
      <h2 id="tittle1">¿Cuanto tiempo te gustaria jugar hoy?</h2>
      <div id="options-container-individual">
      {["Menos de 5 horas", "Entre 5 y 15 horas", "Entre 15 y 30 horas", "Entre 30 y 60 horas", "Más de 60 horas"].map(opt => (
        <label key={opt}>
          <input type="radio" name="playtime" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
      ))}
      </div>
    </div>
  );
}

export default PlaytimeSelector