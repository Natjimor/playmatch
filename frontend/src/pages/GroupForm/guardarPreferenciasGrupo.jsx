import supabase from "../../services/supabase";

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
    const group_size = parseInt(form.groupSize, 10) || null;

    const platformIds = form.platforms.map(p => platformMap[p]).filter(Boolean);

    const sharedDeviceId = sharedDeviceMap[form.sharedDevice] || null;

    const { error } = await supabase.from("groups_web").insert({
      group_size,
      platforms_preferred: platformIds[0], 
      shared_device: sharedDeviceId,
      created_at: new Date().toISOString()
    });

    if (error) {
      console.error("Error al insertar datos:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error("Error en guardarPreferenciasGrupo:", err);
    return { success: false, error: err };
  }
}
