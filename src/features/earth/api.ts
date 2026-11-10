import { fetchJson } from "@/lib/fetchJson";
import type { EarthImage } from "./types";

// The api.nasa.gov proxy for EPIC is gone; the instrument's own API needs no key.
const EPIC_URL = "https://epic.gsfc.nasa.gov";

export const FIRST_EPIC_DATE = "2015-06-13";

type EpicImage = {
  image: string;
  caption: string;
  date: string;
  centroid_coordinates: { lat: number; lon: number };
};

export async function getLatestEarthDate(): Promise<string> {
  const dates = await fetchJson<string[]>(`${EPIC_URL}/api/natural/available`);
  return dates[dates.length - 1];
}

export async function getEarthImages(date: string): Promise<EarthImage[]> {
  const images = await fetchJson<EpicImage[]>(`${EPIC_URL}/api/natural/date/${date}`);
  return images.map(toEarthImage);
}

function toEarthImage(image: EpicImage): EarthImage {
  const [year, month, day] = image.date.slice(0, 10).split("-");

  return {
    id: image.image,
    takenAt: image.date,
    imageUrl: `${EPIC_URL}/archive/natural/${year}/${month}/${day}/jpg/${image.image}.jpg`,
    caption: image.caption,
    latitude: image.centroid_coordinates.lat,
    longitude: image.centroid_coordinates.lon,
  };
}
