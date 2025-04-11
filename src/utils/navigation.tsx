import { ArtistData } from "@/types";

export const getApprovedArtistDetailsUrl = (artist: ArtistData): string => {
  return `/approved-artist-details?data=${encodeURIComponent(JSON.stringify(artist))}`;
};
