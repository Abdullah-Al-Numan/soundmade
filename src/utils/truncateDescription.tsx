export const truncateDescription = (
  text: string | null | undefined,
  maxWords = 10,
  ellipsis = "...",
  fallback = "N/A"
): string => {
  if (!text || typeof text !== "string") {
    return fallback;
  }

  const trimmedText = text.trim().replace(/\s+/g, " ");

  if (!trimmedText) {
    return fallback;
  }

  const words = trimmedText.split(" ");

  if (words.length <= maxWords) {
    return trimmedText;
  }

  return words.slice(0, maxWords).join(" ") + ellipsis;
};
