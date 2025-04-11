import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArtistData, VideoType } from "@/types";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useRef, useState } from "react";

type ViewVideoProps = {
  isViewModalOpen: boolean;
  onCloseView: () => void;
  selectedVideo: VideoType;
  artist: ArtistData;
};

const ViewVideo = ({
  isViewModalOpen,
  onCloseView,
  selectedVideo,
  artist,
}: ViewVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const videoUrl = selectedVideo?.video ? getMediaUrl(selectedVideo.video) : "";

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <Dialog open={isViewModalOpen} onOpenChange={onCloseView}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] max-h-[90vh] flex flex-col overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
            {artist?.fullName}&apos;s Video
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
            {selectedVideo?.video ? (
              videoError ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                  <p className="h-10 w-10 mb-2" />
                  <p>
                    Unable to load video. The file may be corrupted or
                    unavailable.
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg aspect-video"
                  onError={handleVideoError}
                  poster="/placeholder.svg?height=400&width=600"
                />
              )
            ) : (
              <div className="flex items-center justify-center p-8 text-center text-muted-foreground">
                <p>No video available</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Details</h3>
              <p>{selectedVideo?.isPaid ? "Paid" : "Free"}</p>
            </div>

            <div className="bg-card p-4 rounded-md border">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Title
              </h4>
              {selectedVideo?.title ? (
                <p className="text-md">{selectedVideo.title}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No title</p>
              )}
            </div>

            <div className="bg-card p-4 rounded-md border">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h4>
              {selectedVideo?.description ? (
                <p className="text-sm whitespace-pre-line">
                  {selectedVideo.description}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No description
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewVideo;
