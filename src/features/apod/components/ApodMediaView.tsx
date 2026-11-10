import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Apod } from "../types";

export function ApodMediaView({ apod }: { apod: Apod }) {
  const { media, title, previewUrl } = apod;

  return (
    <div className="relative aspect-[4/3] self-start overflow-hidden rounded-lg border border-line bg-surface">
      {media?.kind === "image" && (
        <Lightbox src={media.url} alt={title}>
          <Image
            src={media.url}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-contain"
          />
        </Lightbox>
      )}

      {media?.kind === "video" && (
        <video
          src={media.url}
          poster={previewUrl ?? undefined}
          controls
          className="size-full object-contain"
        />
      )}

      {media?.kind === "embed" && (
        <iframe src={media.url} title={title} allowFullScreen className="size-full" />
      )}

      {!media && (
        <p className="flex size-full items-center justify-center p-6 text-center text-muted">
          Le média n&apos;est pas disponible pour cette date.
        </p>
      )}
    </div>
  );
}
