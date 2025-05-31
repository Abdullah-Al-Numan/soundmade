import React, { useState } from "react";
import Image from "next/image";
import PaginatedTable from "@/components/paginatedTable";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useQuery } from "@apollo/client";
import { Input } from "../ui/input";
import CustomeSkeleton from "../skeleton";
import { GET_ALL_USERS_BY_TYPE } from "@/gql/user";
import { UserData } from "@/types";
import { tableHeadUserData } from "@/utils/tableHeadData";

const UserList = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS_BY_TYPE, {
    variables: { type: "USER" },
    fetchPolicy: "no-cache",
  });
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <CustomeSkeleton />;

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading users. Please try again later.</div>;
  }

  const tableData = data?.getAllUsersByType ?? [];

  const filteredData = tableData.filter(
    (user: { fullName: string; email: string }) =>
      user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        tableHeadData={tableHeadUserData}
        tableData={filteredData}
        title="user"
        perPage={5}
        renderRow={(row: UserData, rowIndex) => (
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
              <p className="text-sm text-slate-500">
                {row?.category || "Unknown Location"}
              </p>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default UserList;
