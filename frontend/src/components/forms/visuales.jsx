function VisualStoryImportance({ value, onChange }) {
  return (
    <div>
      <h2 className="font-semibold">¿Qué tan importante es que tenga buena historia o visuales?</h2>
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