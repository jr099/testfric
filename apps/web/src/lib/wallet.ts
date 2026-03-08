import { mockWalletBalances, mockWalletLedger } from "../mocks/mockWallet";
import { isMockMode, supabase } from "./supabaseClient";

export async function fetchWalletBalances() {
  if (isMockMode || !supabase) {
    return { data: mockWalletBalances, error: null, source: "mock" as const };
  }
  try {
    const data = await supabase.request<Array<{ currency: string; available: number; locked: number }>>(
      "/rest/v1/wallets?select=currency,available,locked"
    );
    return { data, error: null, source: "supabase" as const };
  } catch (error) {
    return { data: [], error, source: "supabase" as const };
  }
}

export async function fetchWalletLedger() {
  if (isMockMode || !supabase) {
    return { data: mockWalletLedger, error: null, source: "mock" as const };
  }
  try {
    const data = await supabase.request<Array<{ id: string; tx_type: string; reason_code: string; amount: number; created_at: string }>>(
      "/rest/v1/wallet_ledger?select=id,tx_type,reason_code,amount,created_at&order=created_at.desc&limit=20"
    );
    return { data, error: null, source: "supabase" as const };
  } catch (error) {
    return { data: [], error, source: "supabase" as const };
  }
}
