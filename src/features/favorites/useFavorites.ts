"use client";

import { useSyncExternalStore } from "react";
import { getFavorites, getServerFavorites, subscribe, toggleFavorite } from "./store";

const subscribeToNothing = () => () => {};

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getFavorites, getServerFavorites);
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  return {
    favorites,
    isReady,
    isFavorite: (id: string) => favorites.some((favorite) => favorite.id === id),
    toggleFavorite,
  };
}
