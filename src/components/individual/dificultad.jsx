function DifficultySelector({ value, onChange }) {
  return (
    <div>
      <h2 className="font-semibold">¿Te importa si el juego es difícil o complejo?</h2>
      {["Prefiero juegos fáciles o casuales", "Me gustan los retos", "No me importa"].map(opt => (
        <label key={opt}>
          <input type="radio" name="difficulty" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
      ))}
    </div>
  );
}

export default DifficultySelector