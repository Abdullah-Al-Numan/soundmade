import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { Trash2, Upload } from "lucide-react";
import { useMutation } from "@apollo/client";
import { UPDATE_VIDEO } from "@/gql/video";
import { uploadFile } from "@/utils/aws";
import { ArtistData, VideoType } from "@/types";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/utils/fileSizeLimitation";
import { useToast } from "@/components/hooks/useToast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EditVideoProps = {
  selectedVideo: VideoType;
  artist: ArtistData;
  isEditModalOpen: boolean;
  onCloseEdit: () => void;
};

interface VideoFormData {
  title: string;
  description: string;
  isPaid: boolean;
  videoUrl: string;
}

const EditVideo = ({
  selectedVideo,
  artist,
  isEditModalOpen,
  onCloseEdit,
}: EditVideoProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    isPaid: false,
    videoUrl: "",
  });

  useEffect(() => {
    if (selectedVideo) {
      setFormData({
        title: selectedVideo.title || "",
        description: selectedVideo.description || "",
        isPaid: selectedVideo.isPaid || false,
        videoUrl: selectedVideo.video || "",
      });

      if (selectedVideo.video) {
        setVideoPreview(getMediaUrl(selectedVideo.video));
      } else {
        setVideoPreview(null);
      }
    }
  }, [selectedVideo]);

  const handleRemoveVideo = () => {
    setFile(null);
    setVideoPreview(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPaid: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const uploadedFile = e.target.files[0];

    if (uploadedFile.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
        variant: "destructive",
      });
      return;
    }

    setFile(uploadedFile);
    const objectUrl = URL.createObjectURL(uploadedFile);
    setVideoPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for the video",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let videoKey = formData.videoUrl;

      if (file && videoPreview) {
        const videoBlob = await fetch(videoPreview).then((res) => res.blob());
        const response = await uploadFile(videoBlob, file.name, file.type);
        videoKey = response.Key;
      }

      const response = await updateVideo({
        variables: {
          id: selectedVideo.id,
          updateVideoInput: {
            userId: artist?.id,
            title: formData.title,
            description: formData.description,
            isPaid: formData.isPaid,
            isPublished: true,
            video: videoKey,
          },
        },
      });

      toast({
        title: "Success",
        description:
          response?.data?.updateVideo?.message || "Video updated successfully",
      });

      onCloseEdit();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update video",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={onCloseEdit}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{artist?.fullName}&apos;s Video</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            {videoPreview ? (
              <div className="relative">
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Remove video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mt-2">
                  Upload a new video
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (Max {MAX_FILE_SIZE_MB}MB)
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add description (max. 300 characters)"
              className="min-h-28 resize-none"
              maxLength={300}
              value={formData.description}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.description.length}/300
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isPaid" className="cursor-pointer">
              Paid Content
            </Label>
            <Switch
              id="isPaid"
              checked={formData.isPaid}
              onCheckedChange={handleToggleChange}
            />
          </div>

          <Button
            type="submit"
            variant={"primary"}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <p className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Video"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVideo;
