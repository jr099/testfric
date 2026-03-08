export function LedgerTable() {
  return (
    <section>
      <h2>Historique des transactions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Date</th>
            <th align="left">Type</th>
            <th align="left">Raison</th>
            <th align="right">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>Aucune transaction pour le moment.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
