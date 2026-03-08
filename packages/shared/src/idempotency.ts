export function buildIdempotencyKey(parts: string[]): string {
  return parts.map((p) => p.trim()).filter(Boolean).join(":");
}
