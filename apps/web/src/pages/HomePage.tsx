export function HomePage() {
  return (
    <section>
      <h1>PulsePlay</h1>
      <p>Plateforme de mini-jeux mobile-first avec portefeuille transparent et rewards audités.</p>
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="#dashboard">Dashboard</a>
        <a href="#wallet">Wallet</a>
        <a href="#rewards">Rewards</a>
        <a href="#competitions">Competitions</a>
        <a href="#account">Account</a>
      </nav>
    </section>
  );
}
