export type Asteroid = {
  id: string;
  name: string;
  isHazardous: boolean;
  minDiameterKm: number;
  maxDiameterKm: number;
  missDistanceKm: number;
  lunarDistances: number;
  speedKmPerSecond: number;
  detailsUrl: string;
};
