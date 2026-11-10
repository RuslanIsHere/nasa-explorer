import type { Metadata } from "next";
import { Suspense } from "react";
import { DateForm } from "@/components/ui/DateForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoGridSkeleton } from "@/components/ui/PhotoGridSkeleton";
import { resolveDate } from "@/lib/dates";
import { FIRST_EPIC_DATE, getLatestEarthDate } from "@/features/earth/api";
import { EarthGallery } from "@/features/earth/components/EarthGallery";

export const metadata: Metadata = { title: "La Terre" };

type EarthPageProps = {
  searchParams: Promise<{ date?: string | string[] }>;
};

export default async function EarthPage({ searchParams }: EarthPageProps) {
  const { date: dateParam } = await searchParams;
  const latestDate = await getLatestEarthDate();
  const date = resolveDate(dateParam, {
    min: FIRST_EPIC_DATE,
    max: latestDate,
    fallback: latestDate,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Earth Polychromatic Imaging Camera"
        title="La Terre vue de l'espace"
        description="La caméra EPIC du satellite DSCOVR photographie la face éclairée de la Terre plusieurs fois par jour."
      />
      <DateForm action="/earth" date={date} min={FIRST_EPIC_DATE} max={latestDate} />
      <Suspense key={date} fallback={<PhotoGridSkeleton />}>
        <EarthGallery date={date} />
      </Suspense>
    </div>
  );
}
