import Image from "next/image";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import type { Favorite } from "@/features/favorites/types";
import { Lightbox } from "./Lightbox";

type PhotoCardProps = {
  favorite: Favorite;
  alt: string;
  children: React.ReactNode;
};

export function PhotoCard({ favorite, alt, children }: PhotoCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-square bg-ink">
        <Lightbox src={favorite.imageUrl} alt={alt}>
          <Image
            src={favorite.imageUrl}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Lightbox>
        <FavoriteButton favorite={favorite} className="absolute top-2 right-2" />
      </div>
      <div className="p-3 text-sm">{children}</div>
    </article>
  );
}
