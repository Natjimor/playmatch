export async function fetchGames() {
  const response = await fetch("http://localhost:8000/games");
  const data = await response.json();
  console.log("RAWG response", data);
  return data.results; 
}


export const fetchGameById = async (id) => {
  const response = await fetch(`http://localhost:8000/games/${id}`);
  const data = await response.json();
  return data;
};

export const fetchGenres = async () => {
  const response = await fetch("http://localhost:8000/genres");
  const data = await response.json();
  return data;
};

export const fetchPlatforms = async () => {
  const response = await fetch("http://localhost:8000/platforms");
  const data = await response.json();
  return data;
};
