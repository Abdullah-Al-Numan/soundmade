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

const Video = () => {
  const [videos, setVideos] = useState<string[]>([]);
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

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newVideos = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newVideos).then((videoData) =>
      setVideos([...videos, ...videoData] as string[])
    );
  };

  const handleSubmit = async () => {
    try {
      if (!videos.length) {
        alert("Please upload a video.");
        return;
      }

      setLoading(true);

      const videoBlob = await (await fetch(videos[0])).blob();
      const response = await uploadFile(videoBlob, "video.mp4", "video/mp4");

      const videoData = {
        userId: artistData.id,
        title,
        description,
        video: response.Key,
        isPublished: true,
        isPaid,
      };

      await createVideo({
        variables: { createVideoInput: videoData },
      });

      setVideos([]);
      setTitle("");
      setDescription("");
      setIsPaid(false);

      alert("Video published successfully.");
    } catch (error) {
      console.error("Error submitting video:", error);
      alert("Failed to create video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 m-auto">
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg ">
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
                <source src={videos[0]} type="video/mp4" />
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
          placeholder="Add text (max.300 characters)"
          className="min-h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4 my-2">
        <p>Gold</p>
        <Switch checked={isPaid} onCheckedChange={setIsPaid} />
      </div>
      <Button
        type="submit"
        name="submit"
        variant="primary"
        className="w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <span className="animate-spin">🔄</span> : "Publish"}
      </Button>
    </div>
  );
};
export default Video;
