import "./dificultad.css"
function VisualStoryImportance({ value, onChange }) {
  return (
    <div id="Individual-options">
      <h2 id="tittle1">¿Qué tan importante es que tenga buena historia o visuales?</h2>
      
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div>Valor: {value}</div>
    </div>
  );
}

export default VisualStoryImportance