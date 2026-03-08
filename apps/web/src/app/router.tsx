import { useEffect, useMemo, useState } from "react";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { WalletPage } from "../pages/WalletPage";
import { RewardsPage } from "../pages/RewardsPage";
import { CompetitionsPage } from "../pages/CompetitionsPage";
import { AccountPage } from "../pages/AccountPage";

type RouteKey = "home" | "dashboard" | "wallet" | "rewards" | "competitions" | "account";

function resolveRoute(hash: string): RouteKey {
  const normalized = hash.replace("#", "").toLowerCase();
  if (["dashboard", "wallet", "rewards", "competitions", "account"].includes(normalized)) {
    return normalized as RouteKey;
  }
  return "home";
}

export function AppRouter() {
  const [route, setRoute] = useState<RouteKey>(() => resolveRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(resolveRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const CurrentPage = useMemo(() => {
    switch (route) {
      case "dashboard":
        return DashboardPage;
      case "wallet":
        return WalletPage;
      case "rewards":
        return RewardsPage;
      case "competitions":
        return CompetitionsPage;
      case "account":
        return AccountPage;
      case "home":
      default:
        return HomePage;
    }
  }, [route]);

  return <CurrentPage />;
}
