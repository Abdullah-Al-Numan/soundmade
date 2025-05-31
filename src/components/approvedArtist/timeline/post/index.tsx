import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import { ArtistData } from "@/types";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/gql/post";
import { uploadFile } from "@/utils/aws";
import { getApprovedArtistDetailsUrl } from "@/utils/navigation";
import Image from "next/image";

const POST = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isToggledPaid, setIsToggledPaid] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [createPost] = useMutation(CREATE_POST);

  const searchParams = useSearchParams();
  const artistDataString = searchParams.get("data");
  if (!artistDataString) {
    return <div>No artist data found.</div>;
  }

  const artistData: ArtistData = JSON.parse(
    decodeURIComponent(artistDataString)
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);
    let uploadedImages: string[] = [];

    try {
      if (images?.length > 0 && images[0]?.name) {
        uploadedImages = await Promise.all(
          images.map(async (image) => {
            const imgBlob = await (
              await fetch(URL.createObjectURL(image))
            ).blob();
            if (!imgBlob) {
              throw new Error("Failed to upload image. Please try again.");
            }
            if (!image.name || !image.type) {
              throw new Error("Image file name or mime type not found.");
            }
            const responseImg = await uploadFile(
              imgBlob,
              image.name,
              image.type
            );
            return responseImg?.Key;
          })
        );
      }

      const postData = {
        userId: artistData.id,
        description,
        images: uploadedImages,
        isPublished: true,
        isPaid: isToggledPaid,
      };

      await createPost({
        variables: { createPostInput: postData },
      });

      const userConfirmed = window.confirm("Post created successfully.");
      if (userConfirmed) {
        const redirectUrl = getApprovedArtistDetailsUrl(artistData);

        window.location.href = redirectUrl;
      }
      setImages([]);
      setDescription("");
      setIsToggledPaid(false);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-1/2 m-auto">
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            multiple
          />
          <div className="flex flex-col items-center gap-2 text-gray-600">
            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="Uploaded"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
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
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setImages([])}
          >
            Remove Images
          </button>
        )}
      </div>

      <div className="my-2">
        <Textarea
          placeholder="Add text (max. 300 characters)"
          className="min-h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-4 my-2 items-center">
        <p>Paid</p>
        <Switch
          checked={isToggledPaid}
          onCheckedChange={(checked) => setIsToggledPaid(checked)}
        />
      </div>

      <Button
        type="submit"
        name="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? <span className="animate-spin">🔄</span> : "Publish"}
      </Button>
    </form>
  );
};

export default POST;
