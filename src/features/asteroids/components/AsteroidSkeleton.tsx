const STATS = [1, 2, 3, 4];
const CARDS = [1, 2, 3, 4];

export function AsteroidSkeleton() {
  return (
    <div role="status" aria-label="Chargement des astéroïdes" className="animate-pulse">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat} className="h-24 rounded-lg bg-surface" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => (
          <div key={card} className="h-36 rounded-lg bg-surface" />
        ))}
      </div>
    </div>
  );
}
