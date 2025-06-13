import { useState } from "react";
import "../../styles/RecommendedSect.css";
import "../../styles/GameGrid.css";
import GroupRecommendationForm from "../GroupRecommendationForm/GroupRecommendationForm";
import { guardarPreferenciasGrupo } from "../GroupRecommendationForm/guardarPreferenciasGrupo";
import { cosineSimilarity } from "../../utils/cosineSimilarity";

export default function RecommendedSect({ showForm = false, onCloseForm }) {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  async function handleFormSubmit(formData) {
    setLoading(true);
    setError(null);
    
    try {
      // Procesar preferencias y obtener URL de API
      const result = await guardarPreferenciasGrupo(formData);
      
      if (!result.success) {
        throw new Error(result.error || "Error procesando preferencias");
      }
      
      // Hacer fetch de juegos recomendados con la URL generada
      const response = await fetch(result.apiUrl);
      if (!response.ok) {
        throw new Error(`Error obteniendo juegos: ${response.statusText}`);
      }
      
      const data = await response.json();
      const fetchedGames = data.results || [];
      
      // Obtener el vector promedio del grupo desde el resultado
      const groupAvgVector = result.groupAvgVector;
      
      // Generar vectores simulados para cada juego (esto normalmente vendría del backend)
      const gamesWithVectors = fetchedGames.map(game => {
        // Simulamos un vector para cada juego basado en algunas propiedades
        // En una implementación real, estos vectores vendrían del backend
        const gameVector = generateGameVector(game);
        
        // Calcular similitud coseno entre el vector del juego y el vector del grupo
        const similarity = cosineSimilarity(gameVector, groupAvgVector);
        
        // Añadir la puntuación de similitud y el vector al juego
        return {
          ...game,
          similarityScore: similarity,
          gameVector
        };
      });
      
      // Ordenar por puntuación de similitud (de mayor a menor)
      const sortedGames = gamesWithVectors.sort((a, b) => b.similarityScore - a.similarityScore);
      
      // Tomar los 10 mejores juegos
      const topGames = sortedGames.slice(0, 10);
      
      // Actualizar el estado con los juegos ordenados
      setGames(topGames);
      
      // Cerrar el formulario después de obtener resultados
      if (onCloseForm) onCloseForm();
    } catch (err) {
      console.error("Error al obtener recomendaciones:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  // Función para generar un vector de características simulado para un juego
  function generateGameVector(game) {
    // En un entorno real, estos vectores vendrían del backend o de algún servicio
    // Generamos un vector de 10 dimensiones basado en propiedades del juego
    const rating = game.rating || 0; // Puntuación entre 0-5
    const normalizedRating = rating / 5; // Normalizado entre 0-1
    
    // Simular dimensiones basadas en géneros, plataformas, etc.
    // Cada juego tendrá valores diferentes en cada dimensión
    const vector = [
      normalizedRating,
      Math.random() * 0.5 + 0.5, // Popularidad (simulada)
      (game.ratings_count ? Math.min(game.ratings_count / 5000, 1) : 0.5), // Normalizado por número de ratings
      Math.random() * 0.4 + 0.3, // Dimensión de acción (simulada)
      Math.random() * 0.5 + 0.2, // Dimensión de estrategia (simulada)
      Math.random() * 0.6 + 0.1, // Dimensión social (simulada)
      Math.random() * 0.5 + 0.2, // Dimensión de historia (simulada)
      Math.random() * 0.7 + 0.1, // Dimensión de gráficos (simulada)
      Math.random() * 0.5 + 0.3, // Dimensión de jugabilidad (simulada)
      Math.random() * 0.4 + 0.4, // Dimensión de rejugabilidad (simulada)
    ];
    
    return vector;
  }

  return (
    <section className="RecommendedSect">
      <h1>Tus recomendaciones</h1>
      <div className="RecommendationsContainer">
        {showForm ? (
          <GroupRecommendationForm 
            onSubmit={handleFormSubmit} 
            onClose={onCloseForm} 
          />
        ) : loading ? (
          <div className="loading">
            <h3>Obteniendo recomendaciones...</h3>
          </div>
        ) : error ? (
          <div className="error">
            <h3>Error: {error}</h3>
          </div>
        ) : games.length > 0 ? (
          <div className="GamesGrid">
            {games.map(game => (
              <div key={game.id} className="GameCard">
                <div className="similarity-badge" title="Puntuación de similitud con las preferencias del grupo">
                  {(game.similarityScore * 100).toFixed(0)}%
                </div>
                <img 
                  src={game.background_image || "https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/default-game.png?t=2025-06-13"} 
                  alt={game.name} 
                />
                <div className="GameInfo">
                  <h3>{game.name}</h3>
                  <p>Rating: {game.rating}/5</p>
                  {game.platforms && (
                    <p className="platforms">
                      {game.platforms.slice(0, 3).map(p => p.platform.name).join(', ')}
                      {game.platforms.length > 3 ? '...' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="NoRecommendations">
            <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Mando.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvTWFuZG8ucG5nIiwiaWF0IjoxNzQ5ODAxNzgyLCJleHAiOjE3ODEzMzc3ODJ9.qtc2DmS_FbZe1LV4PxoPoXPI-KXOxMxChXDjCniOiwA" alt="MandoIMG" />
            <h3>Todavía no tienes ninguna recomendación, para obtenerla presiona el botón</h3>
          </div>
        )}
      </div>
    </section>
  );
}