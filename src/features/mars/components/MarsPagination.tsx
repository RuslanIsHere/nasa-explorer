import Link from "next/link";
import type { Camera, Rover } from "../rovers";

type MarsPaginationProps = {
  rover: Rover;
  camera?: Camera;
  sol: number;
  page: number;
  lastPage: number;
};

const LINK_STYLES = "rounded-md border border-line px-4 py-2 text-sm hover:border-accent";

export function MarsPagination({ rover, camera, sol, page, lastPage }: MarsPaginationProps) {
  if (lastPage <= 1) return null;

  function getPageUrl(targetPage: number): string {
    const params = new URLSearchParams({
      rover: rover.id,
      sol: String(sol),
      page: String(targetPage),
    });
    if (camera) params.set("camera", camera.id);
    return `/mars?${params}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-4">
      {page > 1 && (
        <Link href={getPageUrl(page - 1)} className={LINK_STYLES}>
          Précédent
        </Link>
      )}
      <p className="font-mono text-sm text-muted">
        Page {page} / {lastPage}
      </p>
      {page < lastPage && (
        <Link href={getPageUrl(page + 1)} className={LINK_STYLES}>
          Suivant
        </Link>
      )}
    </nav>
  );
}
