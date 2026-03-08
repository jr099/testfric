import { mockLeaderboard } from "../mocks/mockLeaderboard";

export function CompetitionsPage() {
  return (
    <section>
      <h2>Competitions</h2>
      <ol>
        {mockLeaderboard.map((entry) => (
          <li key={entry.rank}>#{entry.rank} {entry.player} — {entry.score} pts</li>
        ))}
      </ol>
    </section>
  );
}
