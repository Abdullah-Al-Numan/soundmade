"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PostData } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { UPDATE_POST } from "@/gql/post";
import { uploadFile } from "@/utils/aws";
import { ImageUploader } from "./ImageUploader";
import { extractCleanImageKey } from "@/utils/extractCleanImageKey";

type EditPostProps = {
  isEditModalOpen: boolean;
  onCloseEdit: () => void;
  selectedPost: PostData;
};

const EditPost = ({
  isEditModalOpen,
  onCloseEdit,
  selectedPost,
}: EditPostProps) => {
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isToggledPaid, setIsToggledPaid] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatePost] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (selectedPost) {
      setDescription(selectedPost.description || "");
      setIsToggledPaid(selectedPost.isPaid || false);

      const cleanedUrls = Array.isArray(selectedPost.images)
        ? selectedPost.images.map((img) => extractCleanImageKey(img))
        : [];
      setExistingImages(cleanedUrls);
    }
  }, [selectedPost]);

  const combinedImagePreviews = [
    ...existingImages.map((img) => getMediaUrl(img)),
    ...newImages.map((file) => URL.createObjectURL(file)),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedPost?.id) {
      console.error("Post ID is required but not found");
      setLoading(false);
      return;
    }

    try {
      const uploadedImages = await uploadNewImages();

      const combinedFinalImages = [...existingImages, ...uploadedImages];

      const postData = {
        id: selectedPost.id,
        updatePostInput: {
          userId: selectedPost?.user?.id,
          description,
          images: combinedFinalImages,
          isPublished: true,
          isPaid: isToggledPaid,
        },
      };

      const response = await updatePost({ variables: postData });
      window.alert(response?.data?.updatePost?.message);
      onCloseEdit();
    } catch (error: any) {
      window.alert(`Failed to update post: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadNewImages = async (): Promise<string[]> => {
    if (newImages.length === 0) return [];

    try {
      return await Promise.all(
        newImages.map(async (image) => {
          try {
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
            return extractCleanImageKey(responseImg?.Key || "");
          } catch (error) {
            throw error;
          }
        })
      );
    } catch (error) {
      throw error;
    }
  };

  const handleAddImages = (files: File[]) => {
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    if (index >= existingImages.length) {
      setNewImages((prevImages) =>
        prevImages.filter((_, i) => i !== index - existingImages.length)
      );
    } else {
      setExistingImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
  };

  const handleRemoveAllImages = () => {
    setExistingImages([]);
    setNewImages([]);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={onCloseEdit}>
      <DialogContent className="sm:max-w-[425px] max-h-full flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedPost?.user?.fullName}&apos;s post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader
            images={combinedImagePreviews}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
            onRemoveAll={handleRemoveAllImages}
          />

          <Textarea
            placeholder="Add text (max. 300 characters)"
            className="min-h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
          />

          <div className="flex gap-4">
            <span>Paid</span>
            <Switch checked={isToggledPaid} onCheckedChange={setIsToggledPaid} />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? <span className="animate-spin">⏳</span> : "Update Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
