import { supabase } from "./supabaseClient";

export async function signInWithMagicLink(email: string) {
  return supabase.auth.signInWithOtp({ email });
}
