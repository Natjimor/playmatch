import { useState } from "react";
import GameList from "../../components/GameList";
import { getRecommendations } from "../../services/recommender";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = async () => {
    const mockUserPreferences = {
      genres: ["Indie", "Adventure"],
      difficulty: 2,
      time: 60,
      platforms: ["PC", "PS5"]
    };

    const result = await getRecommendations(mockUserPreferences);
    setRecommendations(result);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Recomendaciones</h1>
      <button onClick={handleGetRecommendations}>Obtener recomendaciones</button>
      <GameList games={recommendations} />
    </div>
  );
};

export default Recommendation;
