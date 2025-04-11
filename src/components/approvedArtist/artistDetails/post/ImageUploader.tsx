"use client";
import type React from "react";
import { renderImage } from "@/utils/renderImage";
type ImageUploaderProps = {
  images: string[];
  onAddImages: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onRemoveAll: () => void;
};

export const ImageUploader = ({
  images,
  onAddImages,
  onRemoveImage,
  onRemoveAll,
}: ImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onAddImages(files);
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <label className="cursor-pointer w-full">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          multiple
        />
        <div className="flex flex-col items-center gap-2 text-gray-600">
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 w-full">
              {images.map((img, index) =>
                renderImage(img, index, onRemoveImage)
              )}
            </div>
          ) : (
            <>
              <span className="text-lg">📷</span>
              <p className="text-sm">Click to upload images</p>
            </>
          )}
        </div>
      </label>

      {images.length > 0 && (
        <button
          type="button"
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onRemoveAll}
        >
          Remove All
        </button>
      )}
    </div>
  );
};
