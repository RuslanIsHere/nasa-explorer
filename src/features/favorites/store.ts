import type { Favorite } from "./types";

const STORAGE_KEY = "nasa-explorer:favorites";
const NO_FAVORITES: Favorite[] = [];

const listeners = new Set<() => void>();
let cachedFavorites: Favorite[] | null = null;

function readFromStorage(): Favorite[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return NO_FAVORITES;
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function handleStorageEvent(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  cachedFavorites = null;
  notifyListeners();
}

export function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", handleStorageEvent);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorageEvent);
  };
}

export function getFavorites(): Favorite[] {
  cachedFavorites ??= readFromStorage();
  return cachedFavorites;
}

export function getServerFavorites(): Favorite[] {
  return NO_FAVORITES;
}

export function toggleFavorite(favorite: Favorite) {
  const favorites = getFavorites();
  const isSaved = favorites.some(({ id }) => id === favorite.id);

  cachedFavorites = isSaved
    ? favorites.filter(({ id }) => id !== favorite.id)
    : [favorite, ...favorites];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedFavorites));
  notifyListeners();
}
