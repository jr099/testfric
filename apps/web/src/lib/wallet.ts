import { supabase } from "./supabaseClient";

export async function fetchWalletBalances() {
  return supabase.from("wallets").select("currency,available,locked");
}
