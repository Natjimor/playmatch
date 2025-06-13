function PlaytimeSelector({ value, onChange }) {
  return (
    <div>
      <h2 className="font-semibold">¿Qué tanto tiempo quieres jugar hoy?</h2>
      {["Menos de 30 minutos", "30 min a 1 hora", "1 a 2 horas", "Más de 2 horas"].map(opt => (
        <label key={opt}>
          <input type="radio" name="playtime" value={opt} checked={value === opt} onChange={() => onChange(opt)} /> {opt}
        </label>
      ))}
    </div>
  );
}

export default PlaytimeSelector