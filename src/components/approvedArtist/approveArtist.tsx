"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import PaginatedTable from "@/components/paginatedTable";
import { GET_APPROVED_ARTIST_LIST } from "@/gql/artist";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import type { ArtistData } from "@/types";
import { Input } from "../ui/input";
import EditProfile from "./editProfile";
import CustomeSkeleton from "../skeleton";
import { DELETE_USER } from "@/gql";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";

const ApprovedArtist = () => {
  const { data, loading, error, refetch } = useQuery<{
    getApprovedArtist: ArtistData[];
  }>(GET_APPROVED_ARTIST_LIST, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<ArtistData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const [artistToDelete, setArtistToDelete] = useState<ArtistData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const tableHeadData = ["SL", "Name", "Email", "Location", "Action"];

  if (loading) return <CustomeSkeleton />;

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading artists. Please try again later.</div>;
  }

  const tableData = data?.getApprovedArtist ?? [];

  const filteredData = tableData.filter(
    (artist) =>
      artist?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (artist: ArtistData) => {
    router.push(
      `/approved-artist-details?data=${encodeURIComponent(
        JSON.stringify(artist)
      )}`
    );
  };

  const initiateDeleteArtist = (artist: ArtistData) => {
    setArtistToDelete(artist);
    setShowDeleteModal(true);
  };

  const handleDeleteArtist = async () => {
    if (!artistToDelete) return;
    try {
      await deleteUser({
        variables: { userId: artistToDelete.id },
      });
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      alert("Failed to delete artist");
      console.error("Error deleting artist:", error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setArtistToDelete(null);
    window.location.reload();
  };

  const handleEditDetails = (artist: ArtistData) => {
    setSelectedArtist(artist);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedArtist(null);
    refetch();
  };

  return (
    <div className="my-4">
      <Input
        type="text"
        placeholder="Type Name or Email for search"
        className="my-2 w-full md:w-1/2 lg:w-1/4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={filteredData}
        title="Artist"
        perPage={5}
        renderRow={(row, rowIndex) => (
          <tr
            key={row.id}
            className="hover:bg-slate-50 border-b border-slate-200"
          >
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{rowIndex + 1}</p>
            </td>
            <td className="px-3 py-3 flex items-center space-x-3">
              {row?.profile?.profilePic && (
                <Image
                  height={30}
                  width={30}
                  alt={row?.fullName || "User"}
                  src={getMediaUrl(row?.profile?.profilePic)}
                  className="rounded-full w-10 h-10"
                />
              )}
              <p className="text-sm text-slate-500">
                {row?.fullName || "Unknown User"}
              </p>
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">{row?.email || "N/A"}</p>
            </td>
            <td className="px-3 py-3">
              <p className="text-sm text-slate-500">
                {row?.location?.name || "Unknown Location"}
              </p>
            </td>
            <td className="px-3 py-3 flex gap-1">
              <Button
                onClick={() => handleViewDetails(row)}
                title="View"
                customClass="text-[8px] px-1.5 py-1"
              />
              <Button
                onClick={() => handleEditDetails(row)}
                title="Edit"
                customClass="text-[8px] px-1.5 py-1"
              />
              <Button
                onClick={() => initiateDeleteArtist(row)}
                title="Delete"
                variant="danger"
                customClass="text-[8px] px-1.5 py-1"
              />
            </td>
          </tr>
        )}
      />

      {isEditModalOpen && selectedArtist && (
        <EditProfile
          artistinfo={selectedArtist}
          onClose={closeEditModal}
          isEditModalOpen={isEditModalOpen}
        />
      )}

      <Dialog
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle >Delete Artist</DialogTitle>
            <DialogDescription >
              Are you sure you want to delete{" "}
              {artistToDelete?.fullName || "this artist"}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogClose asChild>
              <ShadcnButton  variant="primary">
                Cancel
              </ShadcnButton>
            </DialogClose>
            <ShadcnButton
              variant="destructive"
              onClick={handleDeleteArtist}
            >
              Delete
            </ShadcnButton>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Artist deleted successfully.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <ShadcnButton
                variant="primary"
                onClick={handleSuccessModalClose}
              >
                OK
              </ShadcnButton>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovedArtist;
