export const BACKEND_URL = "http://localhost:3000";

export enum ContentType  {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  Website = "website",
}

export type BrainContent = {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
};
