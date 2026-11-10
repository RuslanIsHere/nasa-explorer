export type FavoriteSource = "apod" | "earth" | "mars";

export type Favorite = {
  id: string;
  source: FavoriteSource;
  title: string;
  date: string;
  imageUrl: string;
};
