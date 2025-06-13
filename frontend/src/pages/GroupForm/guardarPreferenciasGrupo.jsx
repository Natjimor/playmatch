import supabase from "../../services/supabase";
import { v4 as uuidv4 } from "uuid";

export async function guardarPreferenciasGrupo(form, user) {
  const platformMap = {
    "PC": 4, "PlayStation 4": 18, "PlayStation 5": 187, "Xbox One": 1,
    "Xbox Serie S/X": 186, "Xbox 360": 14, "Nintendo Switch": 7,
    "Nintendo 3DS": 8, "Nintendo 64": 83, "IOS": 3, "Android": 21
  };

  const sharedDeviceMap = {
    "Online multiplayer": 397,
    "Online Co-Op": 9,
    "Local Co-Op": 75
  };

  try {
    const platformIds = [platformMap[form.platforms]].filter(Boolean);
    const sharedDeviceId = sharedDeviceMap[form.sharedDevice] || null;

    const groupId = uuidv4();

console.log("Objeto que se va a guardar:", {
  platforms_preferred: platformIds[0],
  experience_type: sharedDeviceId,
  created_at: new Date().toISOString()
});

    const { data, error } = await supabase.from("groups").insert({
  group_id: groupId,
  group_name: `Grupo de ${user.user_metadata?.name || "Usuario"}`,
  group_users: [user.email],
  group_size: 1,
  platforms_preferred: platformIds[0],
  experience_type: sharedDeviceId,
  created_at: new Date().toISOString()
}).select("*");

console.log("Respuesta de Supabase:", data);


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

