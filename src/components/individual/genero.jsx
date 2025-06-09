import "./generoyExperiencia.css"
const GENRES = [
  "Acción", "Aventura", "Estrategia", "RPG", "Terror",
  "Simulación", "Carreras", "Puzzle", "Deportes", "Party / minijuegos", "No sé / me da igual"
];

function GenreSelector({ selected, onChange }) {
  return (
    <div  id="Individual-options">
      <h2 id="tittle1">¿Qué tipo de juegos te gustan más?</h2>
      <div id="options-container">
        {GENRES.map(g => (
          <label id="label" key={g}>
            <input type="checkbox" checked={selected.includes(g)} onChange={() => onChange(g)} /> {g}
          </label>
        ))}
      </div>
    </div>
  );
}

export default GenreSelector