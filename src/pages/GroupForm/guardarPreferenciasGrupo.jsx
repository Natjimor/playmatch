import { supabase } from "../Register/supabaseClient";

export const guardarPreferenciasGrupo = async (form) => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Usuario no autenticado", authError);
    return { success: false, error: "Usuario no autenticado" };
  }

  // Insertar o actualizar preferencias del grupo
  const { error } = await supabase.from("PreferenciasGrupo").upsert(
    {
      user_id: user.id,
      group_size: form.groupSize,         
      platforms: form.platforms,          
      shared_device: form.sharedDevice    
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Error guardando preferencias del grupo:", error);
    return { success: false, error };
  }

  return { success: true };
};
