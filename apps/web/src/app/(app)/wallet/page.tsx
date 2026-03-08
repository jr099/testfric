import { LedgerTable } from "@/components/wallet/ledger-table";

export default function WalletPage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Wallet</h1>
      <p>Portefeuille multi-ressources et journal append-only.</p>
      <LedgerTable />
    </main>
  );
}
