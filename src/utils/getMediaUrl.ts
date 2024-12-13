export const getMediaUrl = (mediaPath: string | null | undefined): string => {
  if (!mediaPath) return "";
  return `${process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL}/${mediaPath}`;
};
