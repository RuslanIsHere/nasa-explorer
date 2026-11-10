import type { Metadata } from "next";
import { Suspense } from "react";
import { DateForm } from "@/components/ui/DateForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { getToday, resolveDate } from "@/lib/dates";
import { FIRST_NEO_DATE } from "@/features/asteroids/api";
import { AsteroidResult } from "@/features/asteroids/components/AsteroidResult";
import { AsteroidSkeleton } from "@/features/asteroids/components/AsteroidSkeleton";

export const metadata: Metadata = { title: "Astéroïdes" };

type AsteroidsPageProps = {
  searchParams: Promise<{ date?: string | string[] }>;
};

export default async function AsteroidsPage({ searchParams }: AsteroidsPageProps) {
  const today = getToday();
  const { date: dateParam } = await searchParams;
  const date = resolveDate(dateParam, { min: FIRST_NEO_DATE, max: today, fallback: today });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Asteroids - NeoWs"
        title="Les astéroïdes proches"
        description="Tous les objets passant près de la Terre à une date donnée, du plus proche au plus lointain."
      />
      <DateForm action="/asteroids" date={date} min={FIRST_NEO_DATE} max={today} />
      <Suspense key={date} fallback={<AsteroidSkeleton />}>
        <AsteroidResult date={date} />
      </Suspense>
    </div>
  );
}
