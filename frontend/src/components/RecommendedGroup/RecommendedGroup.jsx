import "../../styles/RecommendedGroup.css";

export default function RecommendedGroup({ memberSizes, groupNames, numberAffinities }) {

  return (
    <div className="RecommendedGroup">
        <p className="CreatedRecommended">{memberSizes} miembros</p>
        <h2>{groupNames}</h2>
        <span className="CreatedRecommended">{numberAffinities} de afinidad</span>
        <div className="JoinRecommendedGroup">
            <button className='JoinRecommendedButton'>Unirme</button>
        </div>
    </div>
  );
}