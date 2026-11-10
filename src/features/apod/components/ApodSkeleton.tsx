export function ApodSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement de l'image du jour"
      className="grid animate-pulse gap-8 lg:grid-cols-[3fr_2fr]"
    >
      <div className="aspect-[4/3] rounded-lg bg-surface" />
      <div className="space-y-3">
        <div className="h-8 w-3/4 rounded bg-surface" />
        <div className="h-40 rounded bg-surface" />
      </div>
    </div>
  );
}
