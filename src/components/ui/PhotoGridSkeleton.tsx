const PLACEHOLDERS = Array.from({ length: 6 }, (_, index) => index);

export function PhotoGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement des images"
      className="grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {PLACEHOLDERS.map((placeholder) => (
        <div key={placeholder} className="aspect-square rounded-lg bg-surface" />
      ))}
    </div>
  );
}
