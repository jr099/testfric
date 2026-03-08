import { DashboardPage } from "../pages/DashboardPage";
import { WalletPage } from "../pages/WalletPage";
import { RewardsPage } from "../pages/RewardsPage";
import { CompetitionsPage } from "../pages/CompetitionsPage";

export function App() {
  return (
    <main style={{ fontFamily: "Inter, sans-serif", padding: 16, background: "#0B1020", color: "#E9ECF8", minHeight: "100vh" }}>
      <h1>PulsePlay</h1>
      <DashboardPage />
      <WalletPage />
      <RewardsPage />
      <CompetitionsPage />
    </main>
  );
}
