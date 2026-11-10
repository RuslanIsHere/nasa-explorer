export type MarsPhoto = {
  id: string;
  imageUrl: string;
  rover: string;
  camera: string;
  sol: number;
  earthDate: string;
};

export type MarsPhotoPage = {
  photos: MarsPhoto[];
  total: number;
};
