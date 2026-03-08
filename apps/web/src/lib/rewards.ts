import { mockRewards } from "../mocks/mockRewards";
import { isMockMode, supabase } from "./supabaseClient";

export async function fetchRewardCatalog() {
  if (isMockMode || !supabase) {
    return { data: mockRewards, error: null, source: "mock" as const };
  }
  try {
    const data = await supabase.request<Array<{ id: string; title: string; credit_cost: number; stock: number | null; status: string }>>(
      "/rest/v1/reward_catalog?select=id,title,credit_cost,stock,status&status=eq.active&order=credit_cost.asc"
    );
    return { data, error: null, source: "supabase" as const };
  } catch (error) {
    return { data: [], error, source: "supabase" as const };
  }
}
