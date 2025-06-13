const GENRES = [
  "Acción", "Aventura", "Estrategia", "RPG", "Terror",
  "Simulación", "Carreras", "Puzzle", "Deportes", "Party / minijuegos", "No sé / me da igual"
];

function GenreSelector({ selected, onChange }) {
  return (
    <div>
      <h2 className="font-semibold">¿Qué tipo de juegos te gustan más?</h2>
      <div className="grid grid-cols-2 gap-2">
        {GENRES.map(g => (
          <label key={g}>
            <input type="checkbox" checked={selected.includes(g)} onChange={() => onChange(g)} /> {g}
          </label>
        ))}
      </div>
    </div>
  );
}

export default GenreSelector