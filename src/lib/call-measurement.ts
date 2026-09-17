// Google provides an unformatted dialable number separately from its display text.
export function normalizeForwardingNumber(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.replace(/[\s()+.-]/g, "");
  if (!/^\d{10,15}$/.test(digits)) return null;
  return `+${digits.length === 10 ? "1" : ""}${digits}`;
}
