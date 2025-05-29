import { useEffect, useState } from "react";
import { fetchGames } from "../../api/rawg";
import GameList from "../../components/GameList";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGames();
      setGames(result);
      setLoading(false);
    };

    loadGames();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Explorar Juegos</h1>
      {loading ? <p>Cargando juegos...</p> : <GameList games={games} />}
    </div>
  );
};

export default Home;
