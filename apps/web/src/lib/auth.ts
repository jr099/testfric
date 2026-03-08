import { mockUser } from "../mocks/mockUser";
import { isMockMode, supabase } from "./supabaseClient";

export async function getCurrentUser() {
  if (isMockMode || !supabase) {
    return { data: mockUser, error: null, source: "mock" as const };
  }
  try {
    const data = await supabase.request<{ id: string; email?: string }>("/auth/v1/user", { method: "GET" });
    return { data, error: null, source: "supabase" as const };
  } catch (error) {
    return { data: null, error, source: "supabase" as const };
  }
}

export async function signInWithMagicLink(email: string) {
  if (isMockMode || !supabase) {
    return { data: { message: `mock_magic_link_sent_to:${email}` }, error: null, source: "mock" as const };
  }
  try {
    const data = await supabase.request<{ sent: boolean }>("/auth/v1/otp", {
      method: "POST",
      body: JSON.stringify({ email, create_user: true })
    });
    return { data, error: null, source: "supabase" as const };
  } catch (error) {
    return { data: null, error, source: "supabase" as const };
  }
}
