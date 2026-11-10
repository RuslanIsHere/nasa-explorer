const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// NASA publishes on US Eastern time, so "today" must not depend on the server timezone.
export function getToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

export function shiftDate(date: string, days: number): string {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function resolveDate(
  value: string | string[] | undefined,
  { min, max, fallback }: { min: string; max: string; fallback: string },
): string {
  if (typeof value !== "string" || !ISO_DATE.test(value)) return fallback;
  if (Number.isNaN(Date.parse(value))) return fallback;
  if (value < min || value > max) return fallback;
  return value;
}
