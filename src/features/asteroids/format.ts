const decimal = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function formatDistance(kilometers: number): string {
  return kilometers >= 1_000_000
    ? `${decimal.format(kilometers / 1_000_000)} M km`
    : `${whole.format(kilometers)} km`;
}

export function formatDiameter(kilometers: number): string {
  return kilometers >= 1
    ? `${decimal.format(kilometers)} km`
    : `${whole.format(kilometers * 1000)} m`;
}

export function formatDecimal(value: number): string {
  return decimal.format(value);
}
