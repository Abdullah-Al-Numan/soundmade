import Image from "next/image";
export const renderImage = (
  img: string,
  index: number,
  onRemoveImage: (index: number) => void
) => {
  return (
    <div key={index} className="relative">
      <Image
        src={img || "/placeholder.svg"}
        alt={`Uploaded Image ${index + 1}`}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <button
        type="button"
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
        onClick={() => onRemoveImage(index)}
      >
        ✕
      </button>
    </div>
  );
};
