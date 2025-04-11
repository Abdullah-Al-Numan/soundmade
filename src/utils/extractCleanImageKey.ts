export const extractCleanImageKey = (imageUrl: string): string => {
  const matches = imageUrl.match(
    /([\w-]+\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico))$/i
  );
  return matches ? matches[1] : imageUrl.split("/").pop() || imageUrl;
};
