export const getRecommendations = async (userPreferences) => {
  const response = await fetch("http://localhost:8000/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userPreferences),
});

  const data = await response.json();
  return data.recommendations;
};
