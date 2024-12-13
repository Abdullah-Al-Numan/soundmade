export const getMediaUrl = (mediaPath: string | null | undefined): string => {
  if (!mediaPath) return "";
  return `https://sdmd.ams3.digitaloceanspaces.com/${mediaPath}`;
};
