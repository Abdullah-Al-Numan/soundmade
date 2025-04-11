import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@apollo/client";
import { uploadFile } from "@/utils/aws";
import { CREATE_VIDEO } from "@/gql/video";
import { useSearchParams } from "next/navigation";
import { ArtistData } from "@/types";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/utils/fileSizeLimitation";
import { getApprovedArtistDetailsUrl } from "@/utils/navigation";

const Video = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createVideo] = useMutation(CREATE_VIDEO);

  const searchParams = useSearchParams();
  const artistDataString = searchParams.get("data");
  if (!artistDataString) {
    return <div>No artist data found.</div>;
  }

  const artistData: ArtistData = JSON.parse(
    decodeURIComponent(artistDataString)
  );

  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
        return false;
      }
      return true;
    });

    const videoPromises = validFiles.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    setVideoFiles(validFiles);

    try {
      const videoData = await Promise.all(videoPromises);
      setVideos((prevVideos) => [...prevVideos, ...videoData]);
    } catch (error) {
      console.error("Error processing video files:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videos.length) {
      alert("Please upload a video.");
      return;
    }

    setLoading(true);

    try {
      const file = videoFiles[0];
      const videoBlob = await fetch(videos[0]).then((res) => res.blob());

      const response = await uploadFile(videoBlob, file.name, file.type);

      await createVideo({
        variables: {
          createVideoInput: {
            userId: artistData.id,
            title,
            description,
            video: response.Key,
            isPublished: true,
            isPaid,
          },
        },
      });

      resetForm();
      const userConfirmed = window.confirm("Video created successfully.");
      if (userConfirmed) {
        const redirectUrl = getApprovedArtistDetailsUrl(artistData);
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("Error submitting video:", error);
      alert("Failed to create video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setVideos([]);
    setVideoFiles([]);
    setTitle("");
    setDescription("");
    setIsPaid(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 m-auto">
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
            multiple
          />
          <div className="flex flex-col items-center gap-2 text-gray-600">
            {videos.length > 0 ? (
              <video controls className="w-40 h-40 object-cover rounded-lg">
                <source src={videos[0]} type={videoFiles[0]?.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <span className="text-lg">🎥</span>
                <p className="text-sm">Click to upload videos</p>
              </>
            )}
          </div>
        </label>
      </div>

      <div className="my-2">
        <Input
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <p>Gold</p>
        <Switch checked={isPaid} onCheckedChange={setIsPaid} />
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

export default Video;
