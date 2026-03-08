const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isMockMode = !supabaseUrl || !supabaseAnonKey;

export type LightweightSupabaseClient = {
  url: string;
  anonKey: string;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
};

export const supabase: LightweightSupabaseClient | null = isMockMode
  ? null
  : {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
      async request<T>(path: string, init?: RequestInit): Promise<T> {
        const response = await fetch(`${supabaseUrl}${path}`, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            ...(init?.headers ?? {})
          }
        });
        if (!response.ok) {
          throw new Error(`Supabase request failed: ${response.status}`);
        }
        return (await response.json()) as T;
      }
    };
