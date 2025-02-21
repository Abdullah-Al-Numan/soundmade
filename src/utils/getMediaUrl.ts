export const getMediaUrl = (mediaPath: string | null | undefined): string => {
  if (!mediaPath) return "";
  return `${process.env.NEXT_PUBLIC_AWS_BUCKET_BASE_URL}/${mediaPath}`;
};
