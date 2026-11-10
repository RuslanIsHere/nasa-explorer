import type { Metadata } from "next";
import { Suspense } from "react";
import { DateForm } from "@/components/ui/DateForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { getToday, resolveDate } from "@/lib/dates";
import { FIRST_APOD_DATE } from "@/features/apod/api";
import { ApodResult } from "@/features/apod/components/ApodResult";
import { ApodSkeleton } from "@/features/apod/components/ApodSkeleton";

export const metadata: Metadata = { title: "L'espace" };

type SpacePageProps = {
  searchParams: Promise<{ date?: string | string[] }>;
};

export default async function SpacePage({ searchParams }: SpacePageProps) {
  const today = getToday();
  const { date: dateParam } = await searchParams;
  const date = resolveDate(dateParam, { min: FIRST_APOD_DATE, max: today, fallback: today });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Astronomy Picture of the Day"
        title="L'image du jour"
        description="Chaque jour depuis 1995, une image de l'univers commentée par des astronomes."
      />
      <DateForm action="/space" date={date} min={FIRST_APOD_DATE} max={today} />
      <Suspense key={date} fallback={<ApodSkeleton />}>
        <ApodResult date={date} />
      </Suspense>
    </div>
  );
}
