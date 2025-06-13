import supabase from "./supabase";
import mapFormToVector from "./mapFormToVector";

export const guardarPreferenciasUsuario = async (form, userId, fullName) => {
  const vector = mapFormToVector(form);

  console.log("Vector que se enviará a Supabase:", {
    id: userId,
    username: fullName,
    ...vector,
  });

  const { error } = await supabase.from("users").upsert([
    {
      id: userId,
      username: fullName,
      ...vector,
    },
  ]);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
};