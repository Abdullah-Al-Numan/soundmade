"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_POSTS_BY_USER_ID,
  DELETE_POST,
  GET_VIDEOS_BY_USER_ID,
  DELETE_VIDEO,
} from "@/gql";
import CustomeSkeleton from "../../skeleton";
import PostTabs from "./tabs";
import ArtistInfo from "./artistInfo";
import PostTable from "./post/postTable";
import CreateArtistPage from "./createArtistPage";
import { ArtistData, PostData, VideoType } from "@/types";
import VideoTable from "./video/videoTable";
import GenericDialog from "./GenericDialog";

const ApprovedArtistDetails = () => {
  const searchParams = useSearchParams();
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [postToDelete, setPostToDelete] = useState<PostData | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<VideoType | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [deleteType, setDeleteType] = useState<"post" | "video" | null>(null);
  const [activeTab, setActiveTab] = useState<string>("post");

  useEffect(() => {
    const artistData = searchParams.get("data");
    if (artistData) {
      try {
        const parsed: ArtistData = JSON.parse(decodeURIComponent(artistData));
        setArtist(parsed);
      } catch (error) {
        console.error("Failed to parse artist data", error);
      }
    }
  }, [searchParams]);

  const {
    data: postData,
    loading: postLoading,
    error: postError,
    refetch: refetchPosts,
  } = useQuery(GET_POSTS_BY_USER_ID, {
    variables: { authorId: artist?.id, userId: artist?.id },
    skip: !artist?.id,
    fetchPolicy: "no-cache",
  });

  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
    refetch: refetchVideos,
  } = useQuery(GET_VIDEOS_BY_USER_ID, {
    variables: { authorId: artist?.id, userId: artist?.id },
    skip: !artist?.id,
    fetchPolicy: "no-cache",
  });

  const [deletePost] = useMutation(DELETE_POST);
  const [deleteVideo] = useMutation(DELETE_VIDEO);

  const posts: PostData[] = postData?.getPostsByUserId || [];
  const videos: VideoType[] = videoData?.getVideosByUserId || [];

  const handleDeletePress = (
    item: PostData | VideoType,
    type: "post" | "video"
  ) => {
    const isPost = type === "post";

    setPostToDelete(isPost ? (item as PostData) : null);
    setVideoToDelete(isPost ? null : (item as VideoType));

    setDeleteType(type);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteType === null) {
        throw new Error("Delete type is not specified");
      }
      const isPost = deleteType === "post";
      const itemToDelete = isPost ? postToDelete : videoToDelete;
      const deleteFunction = isPost ? deletePost : deleteVideo;
      const refetchFunction = isPost ? refetchPosts : refetchVideos;

      if (itemToDelete) {
        const { data } = await deleteFunction({
          variables: { id: itemToDelete.id },
        });

        if (data?.[isPost ? "deletePost" : "deleteVideo"]) {
          setShowDeleteConfirmModal(false);
          setShowDeleteSuccessModal(true);
          refetchFunction();
        } else {
          throw new Error(
            `${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deletion failed on the server`
          );
        }
      }
    } catch (err: any) {
      alert(`Failed to delete ${deleteType}: ${err.message}`);
    }
  }, [
    postToDelete,
    videoToDelete,
    deletePost,
    deleteVideo,
    refetchPosts,
    refetchVideos,
    deleteType,
  ]);

  const handleCloseSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    setPostToDelete(null);
    setVideoToDelete(null);
    setDeleteType(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getDeletionInfo = () => {
    const type = deleteType === "post" ? "post" : "video";
    const title = type === "post" ? postToDelete?.title : videoToDelete?.title;
    return { type, title };
  };

  const { type, title } = getDeletionInfo();

  if (!artist) return <div>No artist data found.</div>;
  if (postLoading || videoLoading) return <CustomeSkeleton />;
  if (postError) return <div>Error loading posts: {postError.message}</div>;
  if (videoError) return <div>Error loading videos: {videoError.message}</div>;

  return (
    <div className="my-4">
      {showCreatePage ? (
        <CreateArtistPage />
      ) : (
        <>
          <PostTabs showTabsOnly={true} onTabChange={handleTabChange} />
          <ArtistInfo artist={artist} />
          {activeTab === "post" && (
            <PostTable
              posts={posts}
              artist={artist}
              refetchPosts={refetchPosts}
              onDeletePress={(post) => handleDeletePress(post, "post")}
              setShowCreatePage={setShowCreatePage}
            />
          )}
          {activeTab === "video" && (
            <VideoTable
              videos={videos}
              artist={artist}
              refetchVideos={refetchVideos}
              onDeletePress={(video) => handleDeletePress(video, "video")}
              setShowCreatePage={setShowCreatePage}
            />
          )}
          <GenericDialog
            open={showDeleteConfirmModal}
            onOpenChange={setShowDeleteConfirmModal}
            title="Confirm Deletion"
            description={`Are you sure you want to delete the ${type} "${title}"? This action cannot be undone.`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            confirmButtonClass="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          />
          <GenericDialog
            open={showDeleteSuccessModal}
            onOpenChange={setShowDeleteSuccessModal}
            title={`${deleteType === "post" ? "Post" : "Video"} Deleted`}
            description={`The ${deleteType} has been successfully deleted.`}
            confirmText="Close"
            onConfirm={handleCloseSuccessModal}
          />
        </>
      )}
    </div>
  );
};

export default ApprovedArtistDetails;
