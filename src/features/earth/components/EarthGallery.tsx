import { EmptyState } from "@/components/ui/EmptyState";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { formatDate } from "@/lib/dates";
import { getEarthImages } from "../api";

function formatCoordinates(latitude: number, longitude: number): string {
  const north = `${Math.abs(latitude).toFixed(1)}° ${latitude >= 0 ? "N" : "S"}`;
  const east = `${Math.abs(longitude).toFixed(1)}° ${longitude >= 0 ? "E" : "O"}`;
  return `${north}, ${east}`;
}

export async function EarthGallery({ date }: { date: string }) {
  const images = await getEarthImages(date);

  if (images.length === 0) {
    return (
      <EmptyState
        title="Aucune image pour cette date"
        description="La caméra EPIC ne publie pas tous les jours. Essayez une autre date."
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => {
        const time = image.takenAt.slice(11, 16);
        const title = `La Terre à ${time} UTC`;

        return (
          <li key={image.id}>
            <PhotoCard
              alt={`${title}, centrée sur ${formatCoordinates(image.latitude, image.longitude)}`}
              favorite={{
                id: `earth-${image.id}`,
                source: "earth",
                title: `${title}, ${formatDate(date)}`,
                date,
                imageUrl: image.imageUrl,
              }}
            >
              <p className="font-semibold">{time} UTC</p>
              <p className="mt-1 font-mono text-xs text-muted">
                {formatCoordinates(image.latitude, image.longitude)}
              </p>
            </PhotoCard>
          </li>
        );
      })}
    </ul>
  );
}
