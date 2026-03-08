import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div style={{ border: "1px solid #2A355E", borderRadius: 12, padding: 16 }}>{children}</div>;
}
