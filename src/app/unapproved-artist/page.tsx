"use client";
import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";
import Button from "@/components/Button";
import PaginatedTable from "@/components/paginatedTable";
import { APPROVED_ARTIST, GET_UNAPPROVED_ARTIST_LIST } from "@/gql/artist";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import type { ArtistData } from "@/types";

const ArtistList = () => {
  const [ApprovedArtist, { loading: mutationLoading }] =
    useMutation(APPROVED_ARTIST);

  const { data, loading, error, refetch } = useQuery<{
    getUnapprovedArtist: ArtistData[];
  }>(GET_UNAPPROVED_ARTIST_LIST, {
    fetchPolicy: "network-only",
  });
  const router = useRouter();

  const tableHeadData = ["SL", "Name", "Email", "Location", "Action"];
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading artists. Please try again later.</div>;
  }

  const tableData = data?.getUnapprovedArtist ?? [];

  const handleApprovedArtist = async (id: string) => {
    try {
      await ApprovedArtist({
        variables: { userId: id },
      });
      refetch();
    } catch (err) {
      console.error("Error approving artist:", err);
    }
  };

  const handleViewDetails = (artist: ArtistData) => {
    router.push(`/unapproved-artist-details?data=${encodeURIComponent(JSON.stringify(artist))}`);
  };

  return (
    <>
      <Breadcrumb />
      <div className="my-4">
        <PaginatedTable
          tableHeadData={tableHeadData}
          tableData={tableData}
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
                <Button onClick={() => handleViewDetails(row)}
                  title="View" customClass="text-[8px] px-1.5 py-1" />
                <Button
                  title={mutationLoading ? "Approving..." : "Approve"}
                  customClass="text-[8px] px-1.5 py-1"
                  onClick={() => handleApprovedArtist(row?.id)}
                  disabled={mutationLoading}
                />
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
};

export default ArtistList;
