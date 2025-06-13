const mapFormToVector = (form) => {
  const genreList = [
    "action", "indie", "adventure", "rpg", "strategy",
    "shooter", "casual", "simulation", "puzzle", 
    "arcade", "platformer", "racing", "massively multiplayer",
    "sports", "fighting", "family", "card", "educational"
  ];

  const genreVector = {};
  genreList.forEach(g => {
    const key = g.toLowerCase().replace(/ /g, "_");
    genreVector[key] = form.genres.includes(g) ? 1 : 0;
  });

  const gameAntiqueMap = {
    "Muy importante": 5,
    "Algo importante": 4,
    "Me da igual": 3,
    "Prefiero juegos con algunos años": 2,
    "Prefiero juegos clásicos": 1
  };

  const playtimeMap = {
    "Menos de 5 horas": 1,
    "Entre 5 y 15 horas": 2,
    "Entre 15 y 30 horas": 3,
    "Entre 30 y 60 horas": 4,
    "Más de 60 horas": 5
  };

  return {
    ...genreVector,
    game_antique: gameAntiqueMap[form.game_antique] || 3,
    playtime_today_minutes: playtimeMap[form.playtime] || 1
  };
};

export default mapFormToVector