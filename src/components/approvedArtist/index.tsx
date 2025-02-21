import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import PaginatedTable from "@/components/paginatedTable";
import { GET_APPROVED_ARTIST_LIST } from "@/gql/artist";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import type { ArtistData } from "@/types";
import { Input } from "../ui/input";

const ApprovedArtist = () => {
  const { data, loading, error } = useQuery<{
    getApprovedArtist: ArtistData[];
  }>(GET_APPROVED_ARTIST_LIST, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const tableHeadData = ["SL", "Name", "Email", "Location", "Action"];
  if (loading) {
    return <div>Loading...</div>;
  }

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
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default ApprovedArtist;
