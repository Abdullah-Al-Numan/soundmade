import Image from "next/image";
import { getMediaUrl } from "@/utils/getMediaUrl";

type PostImageGalleryProps = {
  images: string | string[] | undefined;
};

export const PostImageGallery = ({ images }: PostImageGalleryProps) => {
  const imageArray = typeof images === "string" ? [images] : images;

  if (!imageArray || imageArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-md">
        <p className="text-sm text-slate-500">No images</p>
      </div>
    );
  }

  const getLayoutClass = () => {
    if (imageArray.length === 1) return "grid-cols-1";
    if (imageArray.length === 2) return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <div className={`grid ${getLayoutClass()} gap-2 w-full`}>
      {imageArray.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            fill
            alt={`Post Image ${index + 1}`}
            src={getMediaUrl(image) || "/placeholder.svg"}
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
};
