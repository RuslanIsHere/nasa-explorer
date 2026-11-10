import { ExternalLink, TriangleAlert } from "lucide-react";
import { formatDecimal, formatDiameter, formatDistance } from "../format";
import type { Asteroid } from "../types";

export function AsteroidCard({ asteroid }: { asteroid: Asteroid }) {
  return (
    <article className="h-full rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-mono font-medium">{asteroid.name}</h2>
        <a
          href={asteroid.detailsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Fiche de ${asteroid.name} sur le site du JPL`}
          className="text-muted hover:text-accent"
        >
          <ExternalLink aria-hidden className="size-4" />
        </a>
      </div>

      {asteroid.isHazardous && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <TriangleAlert aria-hidden className="size-4" />
          Potentiellement dangereux
        </p>
      )}

      <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-muted">Distance</dt>
          <dd className="mt-0.5 tabular-nums">{formatDistance(asteroid.missDistanceKm)}</dd>
          <dd className="text-xs text-muted tabular-nums">
            {formatDecimal(asteroid.lunarDistances)} dist. lunaires
          </dd>
        </div>
        <div>
          <dt className="text-muted">Diamètre</dt>
          <dd className="mt-0.5 tabular-nums">
            {formatDiameter(asteroid.minDiameterKm)} à {formatDiameter(asteroid.maxDiameterKm)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Vitesse</dt>
          <dd className="mt-0.5 tabular-nums">{formatDecimal(asteroid.speedKmPerSecond)} km/s</dd>
        </div>
      </dl>
    </article>
  );
}
