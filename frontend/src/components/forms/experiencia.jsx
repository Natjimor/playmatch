const GROUP_EXPERIENCES = [
  "Competir entre nosotros (vs.)",
  "Colaborar como un equipo (co-op)",
  "Resolver retos o acertijos juntos",
  "Reírnos y pasar el rato sin presión (party games)",
  "Que haya historia para seguir entre todos",
  "No sé / me da igual"
];

function GroupExperienceSelector({ selected, onChange }) {
  return (
    <div>
      <h2 className="font-semibold">¿Qué tipo de experiencia grupal prefieres?</h2>
      {GROUP_EXPERIENCES.map(g => (
        <label key={g}>
          <input type="checkbox" checked={selected.includes(g)} onChange={() => onChange(g)} /> {g}
        </label>
      ))}
    </div>
  );
}

export default GroupExperienceSelector