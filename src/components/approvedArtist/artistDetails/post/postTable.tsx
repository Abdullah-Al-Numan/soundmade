import React, { useState } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/getMediaUrl";
import PaginatedTable from "@/components/paginatedTable";
import Button from "@/components/Button";
import { PostData, PostTableProps } from "@/types";
import { tableHeadData } from "@/utils/tableHeadData";
import ViewPost from "./ViewPost";
import EditPost from "./EditPost";
import { truncateDescription } from "@/utils/truncateDescription";

const PostTable: React.FC<PostTableProps> = ({
  posts,
  refetchPosts,
  onDeletePress,
  setShowCreatePage,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = React.useState<PostData | null>(null);

  const renderPostImage = (images: string[] | undefined) => {
    if (images && images.length > 0) {
      return (
        <Image
          height={50}
          width={50}
          alt="Post Image"
          src={getMediaUrl(images[0])}
          className="rounded-md"
        />
      );
    }
    return <p className="text-sm text-slate-500">No Image</p>;
  };

  const formatDate = (dateInput: string | number | Date | undefined | null) => {
    if (!dateInput || (typeof dateInput === "number" && dateInput === 0)) {
      return "N/A";
    }

    const date = new Date(
      !isNaN(Number(dateInput)) ? Number(dateInput) : dateInput
    );

    if (!isNaN(date.getTime())) {
      const iso = date.toISOString().slice(0, 19).replace("T", " ");
      const [year, month, day, time] = iso.split(/[- ]/);
      return `${month}/${day}/${year}, ${time}`;
    }

    return "N/A";
  };

  const handleViewPress = (post: PostData) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const onCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedPost(null);
  };

  const handleEditPress = (post: PostData) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const onCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedPost(null);
    refetchPosts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        <Button
          onClick={() => setShowCreatePage(true)}
          title="Create"
          customClass="text-sm px-3 py-1"
        />
      </div>
      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={posts}
        title="Posts"
        perPage={5}
        renderRow={(post, rowIndex) => (
          <tr
            key={post.id}
            className="hover:bg-slate-50 border-b border-slate-200"
          >
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{rowIndex + 1}</p>
            </td>
            <td className="px-3 py-3">{renderPostImage([`${post.images}`])}</td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">
                {truncateDescription(post.description)}
              </p>
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">
                {formatDate(post.createdAt)}
              </p>
            </td>
            <td className="px-3 py-3 flex gap-1">
              <Button
                onClick={() => handleViewPress(post)}
                title="View"
                customClass="text-sm px-3 py-1"
              />
              <Button
                onClick={() => handleEditPress(post)}
                title="Edit"
                customClass="text-sm px-3 py-1"
              />
              <Button
                onClick={() => onDeletePress(post)}
                title="Delete"
                variant="danger"
                customClass="text-[8px] px-1.5 py-1"
              />
            </td>
          </tr>
        )}
      />
      {isViewModalOpen && selectedPost && (
        <ViewPost
          isViewModalOpen={isViewModalOpen}
          onCloseView={onCloseView}
          selectedPost={selectedPost}
        />
      )}

      {isEditModalOpen && selectedPost && (
        <EditPost
          isEditModalOpen={isEditModalOpen}
          onCloseEdit={onCloseEdit}
          selectedPost={selectedPost}
        />
      )}
    </div>
  );
};

export default PostTable;
