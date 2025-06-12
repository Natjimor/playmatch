import CardsGames from "./cardsGames"
import "../../../styles/Group/printRecommendations.css"

export default function PrintRecommendations() {

  return (
    <section className="PrintRecommendations">
        <div className="titlesGroup">
            <h1>Recomendaciones para los tilines</h1>
            <p>Basado en las preferencias de 2 miembros</p>
        </div>
        <div className="cardsGames">
            <CardsGames/>
        </div>
    </section>
  )
}