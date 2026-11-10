import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoGridSkeleton } from "@/components/ui/PhotoGridSkeleton";
import { getLatestSol } from "@/features/mars/api";
import { MarsFilters } from "@/features/mars/components/MarsFilters";
import { MarsGallery } from "@/features/mars/components/MarsGallery";
import { findCamera, findRover } from "@/features/mars/rovers";

export const metadata: Metadata = { title: "Mars" };

type MarsPageProps = {
  searchParams: Promise<{
    rover?: string | string[];
    camera?: string | string[];
    sol?: string | string[];
    page?: string | string[];
  }>;
};

function parsePositiveInteger(value: string | string[] | undefined): number | null {
  return typeof value === "string" && /^\d+$/.test(value) ? Number(value) : null;
}

export default async function MarsPage({ searchParams }: MarsPageProps) {
  const params = await searchParams;
  const rover = findRover(params.rover);
  const camera = findCamera(rover, params.camera);
  const sol = parsePositiveInteger(params.sol) ?? (await getLatestSol(rover));
  const page = parsePositiveInteger(params.page) || 1;
  const filtersKey = `${rover.id}-${camera?.id}-${sol}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Mars raw images"
        title="Les photos des rovers"
        description="Les images brutes envoyées par les rovers, sol après sol. Un sol est un jour martien."
      />
      <MarsFilters key={filtersKey} roverId={rover.id} cameraId={camera?.id} sol={sol} />
      <Suspense key={`${filtersKey}-${page}`} fallback={<PhotoGridSkeleton />}>
        <MarsGallery rover={rover} camera={camera} sol={sol} page={page} />
      </Suspense>
    </div>
  );
}
