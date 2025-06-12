import "../../styles/RecommendedGroup.css";

export default function RecommendedGroup() {

  return (
    <div className="RecommendedGroup">
        <p className="CreatedRecommended">4 miembros</p>
        <h2>Nombre del grupo</h2>
        <div className="JoinRecommendedGroup">
            <button className='JoinRecommendedButton'>Unirme</button>
        </div>
    </div>
  );
}