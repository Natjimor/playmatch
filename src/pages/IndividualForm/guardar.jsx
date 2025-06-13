import supabase from "../../services/supabase";
import mapFormToVector from "./mapFormToVector";

export const guardarPreferenciasUsuario = async (form, userId, username) => {
  const vector = mapFormToVector(form);
  
  console.log("Vector que se enviará a Supabase:", {
    id: userId,
    username: username,
    ...vector
  });

  const { error } = await supabase.from("userss").upsert([
    {
      id: userId, // esta es la clave primaria en tu tabla
      username: username,
      ...vector,
    },
  ]);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
};
