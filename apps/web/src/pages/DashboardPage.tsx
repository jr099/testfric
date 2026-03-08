import { mockUser } from "../mocks/mockUser";
import { isMockMode } from "../lib/supabaseClient";

export function DashboardPage() {
  return (
    <section>
      <h2>Dashboard</h2>
      <p>Bienvenue {mockUser.displayName} • Niveau saison {mockUser.seasonLevel} • VIP {mockUser.vipStatus}</p>
      <p>Mode de données: {isMockMode ? "mock local" : "supabase"}</p>
    </section>
  );
}
