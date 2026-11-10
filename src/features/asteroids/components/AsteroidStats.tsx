import { formatDiameter, formatDistance } from "../format";
import type { Asteroid } from "../types";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

export function AsteroidStats({ asteroids }: { asteroids: Asteroid[] }) {
  const hazardousCount = asteroids.filter((asteroid) => asteroid.isHazardous).length;
  const largestDiameter = Math.max(...asteroids.map((asteroid) => asteroid.maxDiameterKm));

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Objets recensés" value={String(asteroids.length)} />
      <StatTile label="Potentiellement dangereux" value={String(hazardousCount)} />
      <StatTile label="Passage le plus proche" value={formatDistance(asteroids[0].missDistanceKm)} />
      <StatTile label="Diamètre maximal estimé" value={formatDiameter(largestDiameter)} />
    </dl>
  );
}
