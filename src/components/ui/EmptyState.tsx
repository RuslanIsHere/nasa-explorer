type EmptyStateProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-1 max-w-md text-muted">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
