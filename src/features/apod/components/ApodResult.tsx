import { ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/dates";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { getApod } from "../api";
import { ApodMediaView } from "./ApodMediaView";

export async function ApodResult({ date }: { date: string }) {
  const apod = await getApod(date);

  if (!apod) {
    return (
      <EmptyState
        title="Pas d'image pour cette date"
        description="L'image du jour n'est peut-être pas encore publiée. Essayez un autre jour."
      />
    );
  }

  return (
    <article className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <ApodMediaView apod={apod} />

      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{formatDate(apod.date)}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{apod.title}</h2>
          </div>
          {apod.previewUrl && (
            <FavoriteButton
              className="shrink-0 border border-line"
              favorite={{
                id: `apod-${apod.date}`,
                source: "apod",
                title: apod.title,
                date: apod.date,
                imageUrl: apod.previewUrl,
              }}
            />
          )}
        </div>

        <p lang="en" className="mt-4 leading-relaxed text-muted">
          {apod.explanation}
        </p>
        {apod.credit && <p className="mt-4 text-sm text-muted">Crédit : {apod.credit}</p>}

        <a
          href={apod.articleUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-accent underline underline-offset-4"
        >
          Lire sur science.nasa.gov
          <ExternalLink aria-hidden className="size-4" />
        </a>
      </div>
    </article>
  );
}
