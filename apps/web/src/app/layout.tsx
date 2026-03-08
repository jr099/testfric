import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "Inter, sans-serif", background: "#0B1020", color: "#E9ECF8" }}>
        {children}
      </body>
    </html>
  );
}
