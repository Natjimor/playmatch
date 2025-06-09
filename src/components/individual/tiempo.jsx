import "./dificultad.css"
function PlaytimeSelector({ value, onChange }) {
  return (
    <div id="Individual-options">
      <h2 id="tittle1">¿Qué tanto tiempo quieres jugar hoy?</h2>
      <div id="options-container-individual">
      {["Menos de 30 minutos", "30 min a 1 hora", "1 a 2 horas", "Más de 2 horas"].map(opt => (
        <label key={opt}>
          <input type="radio" name="playtime" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
      ))}
      </div>
    </div>
  );
}

export default PlaytimeSelector