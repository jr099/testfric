import { AppRouter } from "./app/router";

export function App() {
  return (
    <main style={{ fontFamily: "Inter, sans-serif", padding: 16, background: "#0B1020", color: "#E9ECF8", minHeight: "100vh" }}>
      <AppRouter />
    </main>
  );
}
