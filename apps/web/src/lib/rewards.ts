import { supabase } from "./supabaseClient";

export async function fetchRewardCatalog() {
  return supabase.from("reward_catalog").select("id,title,credit_cost,stock,status");
}
