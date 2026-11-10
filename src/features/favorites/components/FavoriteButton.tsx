"use client";

import { Heart } from "lucide-react";
import type { Favorite } from "../types";
import { useFavorites } from "../useFavorites";

type FavoriteButtonProps = {
  favorite: Favorite;
  className?: string;
};

export function FavoriteButton({ favorite, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isSaved = isFavorite(favorite.id);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={`${isSaved ? "Retirer des favoris" : "Ajouter aux favoris"} : ${favorite.title}`}
      onClick={() => toggleFavorite(favorite)}
      className={`rounded-full bg-ink/80 p-2 backdrop-blur transition-colors hover:text-accent ${className}`}
    >
      <Heart aria-hidden className={`size-5 ${isSaved ? "fill-accent text-accent" : ""}`} />
    </button>
  );
}
