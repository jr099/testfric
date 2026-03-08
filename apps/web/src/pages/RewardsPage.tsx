import { useEffect, useState } from "react";
import { fetchRewardCatalog } from "../lib/rewards";

type Reward = { id: string; title: string; credit_cost: number; stock: number | null; status: string };

export function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    fetchRewardCatalog().then((res) => setRewards((res.data as Reward[]) ?? []));
  }, []);

  return (
    <section>
      <h2>Rewards</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>{reward.title} • {reward.credit_cost} RC • stock: {reward.stock ?? "∞"}</li>
        ))}
      </ul>
    </section>
  );
}
