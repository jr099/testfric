import { useEffect, useState } from "react";
import { fetchWalletBalances, fetchWalletLedger } from "../lib/wallet";

type Balance = { currency: string; available: number; locked: number };
type LedgerItem = { id: string; type?: string; tx_type?: string; reason?: string; reason_code?: string; amount: string | number; createdAt?: string; created_at?: string };

export function WalletPage() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);

  useEffect(() => {
    fetchWalletBalances().then((res) => setBalances((res.data as Balance[]) ?? []));
    fetchWalletLedger().then((res) => setLedger((res.data as LedgerItem[]) ?? []));
  }, []);

  return (
    <section>
      <h2>Wallet</h2>
      <ul>
        {balances.map((b) => (
          <li key={b.currency}>{b.currency}: {b.available} (locked: {b.locked})</li>
        ))}
      </ul>
      <h3>Dernières transactions</h3>
      <ul>
        {ledger.map((tx) => (
          <li key={tx.id}>{tx.type ?? tx.tx_type} • {tx.reason ?? tx.reason_code} • {tx.amount} • {tx.createdAt ?? tx.created_at}</li>
        ))}
      </ul>
    </section>
  );
}
