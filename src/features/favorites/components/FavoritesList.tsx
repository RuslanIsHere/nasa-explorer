"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { PhotoGridSkeleton } from "@/components/ui/PhotoGridSkeleton";
import { formatDate } from "@/lib/dates";
import type { FavoriteSource } from "../types";
import { useFavorites } from "../useFavorites";

type Filter = "all" | FavoriteSource;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "apod", label: "Espace" },
  { value: "earth", label: "Terre" },
  { value: "mars", label: "Mars" },
];

export function FavoritesList() {
  const { favorites, isReady } = useFavorites();
  const [filter, setFilter] = useState<Filter>("all");

  if (!isReady) return <PhotoGridSkeleton />;

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Aucun favori pour le moment"
        description="Touchez le cœur sur une photo pour la retrouver ici."
      >
        <Link href="/space" className="text-accent underline underline-offset-4">
          Découvrir l&apos;image du jour
        </Link>
      </EmptyState>
    );
  }

  const visibleFavorites =
    filter === "all" ? favorites : favorites.filter(({ source }) => source === filter);

  return (
    <>
      <div role="group" aria-label="Filtrer par source" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === value ? "border-accent text-accent" : "border-line text-muted hover:text-star"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleFavorites.length === 0 ? (
        <EmptyState title="Rien ici" description="Aucun favori pour cette source." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFavorites.map((favorite) => (
            <li key={favorite.id}>
              <PhotoCard favorite={favorite} alt={favorite.title}>
                <p className="font-semibold">{favorite.title}</p>
                <p className="mt-1 text-muted">{formatDate(favorite.date)}</p>
              </PhotoCard>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
