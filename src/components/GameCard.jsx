const GameCard = ({ game }) => {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
      <img src={game.background_image} alt={game.name} style={{ width: "100%", borderRadius: 8 }} />
      <h3>{game.name}</h3>
      <p>{game.genres?.map(g => g.name).join(", ")}</p>
    </div>
  );
};

export default GameCard;
