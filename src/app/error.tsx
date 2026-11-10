"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ErrorPage({ retry }: { error: Error; retry: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <EmptyState
        title="Les données de la NASA sont indisponibles"
        description="Le service ne répond pas pour le moment. Réessayez dans quelques instants."
      >
        <Button onClick={retry}>Réessayer</Button>
      </EmptyState>
    </div>
  );
}
