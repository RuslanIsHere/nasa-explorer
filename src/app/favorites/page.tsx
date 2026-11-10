import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FavoritesList } from "@/features/favorites/components/FavoritesList";

export const metadata: Metadata = { title: "Favoris" };

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Votre collection"
        title="Favoris"
        description="Les images que vous avez gardées. Elles sont enregistrées dans ce navigateur."
      />
      <FavoritesList />
    </div>
  );
}
