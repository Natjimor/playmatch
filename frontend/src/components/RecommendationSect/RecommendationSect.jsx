import "../../styles/RecommendedSect.css";
import RecomendationButton from "../RecommendationButton/RecommendationButton";

export default function RecommendedSect() {

  return (
    <section className="RecommendedSect">
      <h1>Tus recomendaciones</h1>
      <div className="RecommendationsContainer">
        <div className="NoRecommendations">
            <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Mando.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvTWFuZG8ucG5nIiwiaWF0IjoxNzQ5ODAxNzgyLCJleHAiOjE3ODEzMzc3ODJ9.qtc2DmS_FbZe1LV4PxoPoXPI-KXOxMxChXDjCniOiwA" alt="MandoIMG" />
            <h3>Todavía no tienes ninguna recomendación, para obtenerla presiona el botón</h3>
        </div>
      </div>
    </section>
  );
}