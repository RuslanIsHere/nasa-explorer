export type ApodMedia =
  | { kind: "image"; url: string }
  | { kind: "video"; url: string }
  | { kind: "embed"; url: string };

export type Apod = {
  date: string;
  title: string;
  explanation: string;
  credit: string | null;
  media: ApodMedia | null;
  previewUrl: string | null;
  articleUrl: string;
};
