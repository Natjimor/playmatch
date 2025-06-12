import "./dificultad.css"

function DifficultySelector({ value, onChange }) {
  return (
    <div id="Individual-options">
      <h2 id="tittle1">¿Te importa si el juego es difícil o complejo?</h2>
     <div id="options-container-individual">
      {["Prefiero juegos fáciles o casuales", "Me gustan los retos", "No me importa"].map(opt => (
        <label id="label" key={opt}>
          <input id="checkboxRadio" type="radio" name="difficulty" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
        
      ))}
      </div>
    </div>
  );
}

export default DifficultySelector