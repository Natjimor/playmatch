export async function guardarPreferenciasGrupo(form) {
  const platformMap = {
    "PC": 4,
    "PlayStation 4": 18,
    "PlayStation 5": 187,
    "Xbox One": 1,
    "Xbox Serie S/X": 186,
    "Xbox 360": 14,
    "Nintendo Switch": 7,
    "Nintendo 3DS": 8,
    "Nintendo 64": 83,
    "IOS": 3,
    "Android": 21,
  };

  const sharedDeviceMap = {
    "Online multiplayer": 397,
    "Online Co-Op": 9,
    "Local Co-Op": 75,
  };

  try {
    // Convertir plataformas seleccionadas a IDs
    const platformIds = form.platforms.map(p => platformMap[p]).filter(Boolean);
    
    // Obtener ID del dispositivo compartido
    const sharedDeviceId = sharedDeviceMap[form.sharedDevice];
    
    // Extraer el ID del grupo (comentado para evitar error de lint, pero sería necesario para la API real)
    // const groupId = form.groupId;
    
    // En un entorno real, aquí obtendríamos el vector del grupo desde el backend
    // Simulamos la obtención del vector promedio del grupo
    // Normalmente sería una llamada a la API como:
    // const groupVectorResponse = await fetch(`/api/groups/${groupId}/vector`);
    // const groupVectorData = await groupVectorResponse.json();
    // const groupVector = groupVectorData.vector;
    
    // Por ahora, simulamos un vector normalizado de grupo (10 dimensiones)
    // Este vector representaría las preferencias colectivas del grupo
    const groupAvgVector = [0.8, 0.5, 0.3, 0.7, 0.2, 0.9, 0.4, 0.6, 0.1, 0.5];
    
    // Construir la API URL para RAWG
    // Solicitamos más juegos (12-15) para luego filtrarlos por similitud
    const platformsParam = platformIds.join(',');
    const tagsParam = sharedDeviceId ? sharedDeviceId.toString() : '';
    
    const apiUrl = `https://api.rawg.io/api/games?key=39ffc44387634851a4576b77fbd49bba&platforms=${platformsParam}&tags=${tagsParam}&metacritic=80,100&page_size=15`;

    // Simulamos un pequeño retraso para imitar una operación de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Retornar los datos necesarios para obtener recomendaciones
    return { 
      success: true, 
      apiUrl,
      platformIds,
      sharedDeviceId,
      groupAvgVector // Incluimos el vector del grupo
    };
  } catch (error) {
    console.error("Error al procesar preferencias:", error);
    return { success: false, error: error.message };
  }
}
