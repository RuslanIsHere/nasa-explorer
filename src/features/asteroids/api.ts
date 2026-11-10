import { NASA_API_KEY } from "@/lib/env";
import { fetchJson } from "@/lib/fetchJson";
import type { Asteroid } from "./types";

export const FIRST_NEO_DATE = "2015-06-13";

type NeoObject = {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  close_approach_data: {
    miss_distance: { kilometers: string; lunar: string };
    relative_velocity: { kilometers_per_second: string };
  }[];
};

type NeoFeed = {
  near_earth_objects: Record<string, NeoObject[]>;
};

export async function getAsteroids(date: string): Promise<Asteroid[]> {
  const params = new URLSearchParams({
    start_date: date,
    end_date: date,
    api_key: NASA_API_KEY,
  });
  const feed = await fetchJson<NeoFeed>(`https://api.nasa.gov/neo/rest/v1/feed?${params}`);

  return Object.values(feed.near_earth_objects)
    .flat()
    .filter((object) => object.close_approach_data.length > 0)
    .map(toAsteroid)
    .sort((a, b) => a.missDistanceKm - b.missDistanceKm);
}

function toAsteroid(object: NeoObject): Asteroid {
  const approach = object.close_approach_data[0];
  const diameter = object.estimated_diameter.kilometers;

  return {
    id: object.id,
    name: object.name.replace(/[()]/g, "").trim(),
    isHazardous: object.is_potentially_hazardous_asteroid,
    minDiameterKm: diameter.estimated_diameter_min,
    maxDiameterKm: diameter.estimated_diameter_max,
    missDistanceKm: Number(approach.miss_distance.kilometers),
    lunarDistances: Number(approach.miss_distance.lunar),
    speedKmPerSecond: Number(approach.relative_velocity.kilometers_per_second),
    detailsUrl: object.nasa_jpl_url,
  };
}
