import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import PaginatedTable from "@/components/paginatedTable";
import { Input } from "@/components/ui/input";
import { getMediaUrl } from "@/utils/getMediaUrl";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

const dummyData = [
  {
    id: "1",
    text: "lorem ipsam",
    pic: "",
    createAt: "2024-02-28",
    createBy: "John Doe",
  },
  {
    id: "2",
    text: "sample text",
    pic: "",
    createAt: "2024-02-27",
    createBy: "Jane Smith",
  },
  {
    id: "3",
    text: "another example",
    pic: "",
    createAt: "2024-02-26",
    createBy: "Alice Johnson",
  },
];

const AllPost = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const tableHeadData = [
    "SL",
    "Picture",
    "Text",
    "Created At",
    "Created By",
    "Action",
  ];

  const filteredData = dummyData.filter(
    (post) =>
      post?.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.createBy?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (post: any) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const handleDelete = (post: any) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="my-4">
      <Input
        type="text"
        placeholder="Type text or creator name for search"
        className="my-2 w-full md:w-1/2 lg:w-1/4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={filteredData}
        title="Posts"
        perPage={5}
        renderRow={(row, rowIndex) => (
          <tr
            key={row.id}
            className="hover:bg-slate-50 border-b border-slate-200"
          >
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{rowIndex + 1}</p>
            </td>
            <td className="px-3 py-3">
              {row?.pic ? (
                <Image
                  height={30}
                  width={30}
                  alt={"Post Image"}
                  src={getMediaUrl(row?.pic)}
                  className="rounded w-10 h-10"
                />
              ) : (
                <p className="text-sm text-slate-500">No Image</p>
              )}
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{row?.text || "N/A"}</p>
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{row?.createAt || "N/A"}</p>
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">
                {row?.createBy || "Unknown"}
              </p>
            </td>
            <td className="px-3 py-3 flex gap-1">
              <Button
                onClick={() => handleEdit(row)}
                title="Edit"
                customClass="text-[8px] px-1.5 py-1 bg-blue-500 text-white"
              />
              <Button
                onClick={() => handleDelete(row)}
                title="Delete"
                customClass="text-[8px] px-1.5 py-1 bg-red-500 text-white"
              />
            </td>
          </tr>
        )}
      />
      {isEditOpen && selectedPost && (
        <EditPost post={selectedPost} onClose={() => setIsEditOpen(false)} />
      )}
      {isDeleteDialogOpen && selectedPost && (
        <DeletePost
          post={selectedPost}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AllPost;
