import { supabase } from "../Register/supabaseClient";

export const guardarPreferenciasUsuario = async (form) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Usuario no autenticado", authError);
    return { success: false, error: "Usuario no autenticado" };
  }

  const { error } = await supabase.from("PreferenciasUsuario").upsert({
    user_id: user.id,
    genres: form.genres,
    group_experience: form.groupExperience,
    difficulty: form.difficulty,
    playtime: form.playtime,
    visual_story: form.visualStory
  }, { onConflict: 'user_id' }); 

  if (error) {
    console.error("Error guardando preferencias:", error);
    return { success: false, error };
  }

  return { success: true };
};
