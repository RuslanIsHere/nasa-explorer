import { fetchJson } from "@/lib/fetchJson";
import { getCameraLabel, type Camera, type Rover } from "./rovers";
import type { MarsPhoto, MarsPhotoPage } from "./types";

// The official api.nasa.gov/mars-photos service has been shut down. These are the
// undocumented feeds behind the raw image galleries of mars.nasa.gov.
const CURIOSITY_URL = "https://mars.nasa.gov/api/v1/raw_image_items/";
const PERSEVERANCE_URL = "https://mars.nasa.gov/rss/api/";
const THIRTY_MINUTES = 1800;

export const PHOTOS_PER_PAGE = 24;

type FeedOptions = {
  sol?: number;
  camera?: Camera;
  page?: number;
  perPage: number;
};

type CuriosityItem = {
  imageid: string;
  https_url: string;
  instrument: string;
  sol: number;
  date_taken: string;
  is_thumbnail: boolean;
};

type CuriosityFeed = {
  items: CuriosityItem[];
  total: number;
};

type PerseveranceImage = {
  imageid: string;
  image_files: { medium: string };
  camera: { instrument: string };
  sol: number;
  date_taken_utc: string;
  sample_type: string;
};

type PerseveranceFeed = {
  images: PerseveranceImage[];
  total_results: number;
};

export async function getLatestSol(rover: Rover): Promise<number> {
  const url = buildFeedUrl(rover, { perPage: 1 });

  if (rover.id === "curiosity") {
    const feed = await fetchJson<CuriosityFeed>(url, THIRTY_MINUTES);
    return feed.items[0].sol;
  }

  const feed = await fetchJson<PerseveranceFeed>(url, THIRTY_MINUTES);
  return feed.images[0].sol;
}

export async function getMarsPhotos(
  rover: Rover,
  options: { sol: number; camera?: Camera; page: number },
): Promise<MarsPhotoPage> {
  const url = buildFeedUrl(rover, { ...options, perPage: PHOTOS_PER_PAGE });

  if (rover.id === "curiosity") {
    const feed = await fetchJson<CuriosityFeed>(url, THIRTY_MINUTES);
    return {
      photos: feed.items
        .filter((item) => !item.is_thumbnail)
        .map((item) => fromCuriosity(item, rover)),
      total: feed.total,
    };
  }

  const feed = await fetchJson<PerseveranceFeed>(url, THIRTY_MINUTES);
  return {
    photos: feed.images
      .filter((image) => image.sample_type !== "Thumbnail")
      .map((image) => fromPerseverance(image, rover)),
    total: feed.total_results,
  };
}

function buildFeedUrl(rover: Rover, { sol, camera, page = 1, perPage }: FeedOptions): string {
  // Sorting by anything other than sol makes the Perseverance feed ignore every filter.
  const params = new URLSearchParams({ order: "sol desc", page: String(page - 1) });

  if (sol !== undefined) {
    params.set("condition_2", `${sol}:sol:gte`);
    params.set("condition_3", `${sol}:sol:lte`);
  }

  if (camera) {
    params.set("search", `|${camera.instruments.join("|")}`);
  }

  if (rover.id === "curiosity") {
    params.set("condition_1", "msl:mission");
    params.set("per_page", String(perPage));
    return `${CURIOSITY_URL}?${params}`;
  }

  params.set("feed", "raw_images");
  params.set("category", "mars2020");
  params.set("feedtype", "json");
  params.set("ver", "1.2");
  params.set("num", String(perPage));
  return `${PERSEVERANCE_URL}?${params}`;
}

function fromCuriosity(item: CuriosityItem, rover: Rover): MarsPhoto {
  return {
    id: item.imageid,
    imageUrl: item.https_url,
    rover: rover.label,
    camera: getCameraLabel(rover, item.instrument),
    sol: item.sol,
    earthDate: item.date_taken.slice(0, 10),
  };
}

function fromPerseverance(image: PerseveranceImage, rover: Rover): MarsPhoto {
  return {
    id: image.imageid,
    imageUrl: image.image_files.medium,
    rover: rover.label,
    camera: getCameraLabel(rover, image.camera.instrument),
    sol: image.sol,
    earthDate: image.date_taken_utc.slice(0, 10),
  };
}
