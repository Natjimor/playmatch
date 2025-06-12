import "./dificultad.css"

function Game_antique({ value, onChange }) {
  return (
    <div id="Individual-options">
      <h2 id="tittle1">¿Te importa si el juego es difícil o complejo?</h2>
     <div id="options-container-individual">
      {["Muy importante", "Algo importante", "Me da igual", "Prefiero juegos con algunos años", "Prefiero juegos clásicos"].map(opt => (
        <label id="label" key={opt}>
          <input id="checkboxRadio" type="radio" name="difficulty" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
        
      ))}
      </div>
    </div>
  );
}

export default Game_antique