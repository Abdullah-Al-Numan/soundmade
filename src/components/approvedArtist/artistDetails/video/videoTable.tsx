import React, { useState } from "react";
import PaginatedTable from "@/components/paginatedTable";
import Button from "@/components/Button";
import { ArtistData, VideoType } from "@/types";
import ViewVideo from "./ViewVideo";
import EditVideo from "./EditVideo";

interface VideoTableProps {
  videos: VideoType[];
  artist: ArtistData;
  onDeletePress: (video: VideoType) => void;
  setShowCreatePage: (value: boolean) => void;
  refetchVideos: () => void;
}

const VideoTable: React.FC<VideoTableProps> = ({
  videos,
  artist,
  onDeletePress,
  setShowCreatePage,
  refetchVideos,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const handleViewPress = (video: VideoType) => {
    setSelectedVideo(video);
    setIsViewModalOpen(true);
  };

  const onCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedVideo(null);
  };

  const handleEditPress = (video: VideoType) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const onCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedVideo(null);
    refetchVideos();
  };

  const tableHeadData = ["SL", "Title", "Description", "Created At", "Action"];

  const formatVideoDate = (video: VideoType): string => {
    const d = video.createdAt || video.updatedAt;
    if (!d || (typeof d === "number" && d === 0)) return "N/A";
    const date = new Date(!isNaN(Number(d)) ? Number(d) : d);
    if (!isNaN(date.getTime())) {
      const iso = date.toISOString().slice(0, 19).replace("T", " ");
      const [year, month, day, time] = iso.split(/[- ]/);
      return `${month}/${day}/${year}, ${time}`;
    }
    return "N/A";
  };

  return (
    <div className="mt-6">
      <Button
        onClick={() => setShowCreatePage(true)}
        title="Create"
        customClass="text-sm px-3 py-1"
      />
      <h2 className="text-xl font-semibold mb-2">Latest Videos</h2>
      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={videos}
        title="Videos"
        perPage={5}
        renderRow={(video, rowIndex) => {
          const formattedDate = formatVideoDate(video);
          return (
            <tr
              key={video.id}
              className="hover:bg-slate-50 border-b border-slate-200"
            >
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">{rowIndex + 1}</p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">{video.title || "N/A"}</p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {video.description || "N/A"}
                </p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">{formattedDate}</p>
              </td>
              <td className="px-3 py-3 flex gap-1">
                <Button
                  onClick={() => handleViewPress(video)}
                  title="View"
                  customClass="text-sm px-3 py-1"
                />
                <Button
                  onClick={() => handleEditPress(video)}
                  title="Edit"
                  customClass="text-sm px-3 py-1"
                />
                <Button
                  onClick={() => onDeletePress(video)}
                  title="Delete"
                  variant="danger"
                  customClass="text-[8px] px-1.5 py-1"
                />
              </td>
            </tr>
          );
        }}
      />

      {selectedVideo && (
        <>
          {isViewModalOpen && (
            <ViewVideo
              isViewModalOpen={isViewModalOpen}
              onCloseView={onCloseView}
              selectedVideo={selectedVideo}
              artist={artist}
            />
          )}
          {isEditModalOpen && (
            <EditVideo
              isEditModalOpen={isEditModalOpen}
              onCloseEdit={onCloseEdit}
              selectedVideo={selectedVideo}
              artist={artist}
            />
          )}
        </>
      )}
    </div>
  );
};

export default VideoTable;
