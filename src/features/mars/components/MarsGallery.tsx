import { EmptyState } from "@/components/ui/EmptyState";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { formatDate } from "@/lib/dates";
import { getMarsPhotos, PHOTOS_PER_PAGE } from "../api";
import type { Camera, Rover } from "../rovers";
import { MarsPagination } from "./MarsPagination";

type MarsGalleryProps = {
  rover: Rover;
  camera?: Camera;
  sol: number;
  page: number;
};

export async function MarsGallery({ rover, camera, sol, page }: MarsGalleryProps) {
  const { photos, total } = await getMarsPhotos(rover, { sol, camera, page });

  if (total === 0) {
    return (
      <EmptyState
        title="Aucune photo trouvée"
        description="Ce rover n'a rien envoyé avec cette caméra pour ce sol. Essayez un autre sol ou une autre caméra."
      />
    );
  }

  const lastPage = Math.ceil(total / PHOTOS_PER_PAGE);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => {
          const title = `${photo.rover}, ${photo.camera}, sol ${photo.sol}`;

          return (
            <li key={photo.id}>
              <PhotoCard
                alt={title}
                favorite={{
                  id: `mars-${photo.id}`,
                  source: "mars",
                  title,
                  date: photo.earthDate,
                  imageUrl: photo.imageUrl,
                }}
              >
                <p className="font-semibold">{photo.camera}</p>
                <p className="mt-1 text-muted">
                  Sol {photo.sol} · {formatDate(photo.earthDate)}
                </p>
              </PhotoCard>
            </li>
          );
        })}
      </ul>
      <MarsPagination rover={rover} camera={camera} sol={sol} page={page} lastPage={lastPage} />
    </>
  );
}
