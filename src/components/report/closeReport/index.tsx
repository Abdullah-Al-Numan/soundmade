import Button from "@/components/button";
import PaginatedTable from "@/components/paginatedTable";
import { GET_ALL_Close_REPORT } from "@/gql/report";
import { ReportData } from "@/types";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import ReportDetails from "../ReportDetails";

const CloseReport = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { data, refetch } = useQuery<{
    getAllCloseReport: ReportData[];
  }>(GET_ALL_Close_REPORT, {
    fetchPolicy: "network-only",
  });
  const tableHeadData = ["SL", "ID", "Type", "Artist", "Reporter", "Action"];
  const tableData = data?.getAllCloseReport ?? [];

  const closeDeatilsModal = () => {
    refetch();
    setIsDetailsModalOpen(false);
  };
  const openDetailsModal = (row: any) => {
    setSelectedReport(row);
    setIsDetailsModalOpen(true);
  };
  return (
    <div>
      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={tableData}
        title="Report"
        perPage={5}
        renderRow={(row, rowIndex) => (
          <tr
            key={row.id}
            className="hover:bg-slate-50 border-b border-slate-200"
          >
            <td className="px-3 py-3 text-sm text-slate-500">{rowIndex + 1}</td>

            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.reportedContentId || "N/A"}
            </td>

            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.reportedContentType || "Unknown Location"}
            </td>

            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.reportedTo?.email || "Unknown Location"}
            </td>

            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.reportedBy?.email || "Unknown Location"}
            </td>

            <td className="px-3 py-3 flex gap-1">
              <Button
                onClick={() => openDetailsModal(row)}
                title="Details"
                customClass="text-[8px] px-1.5 py-1"
              />
            </td>
          </tr>
        )}
      />

      {isDetailsModalOpen && selectedReport && (
        <ReportDetails
          isDetailsModalOpen={isDetailsModalOpen}
          onClose={closeDeatilsModal}
          selectedReport={selectedReport}
        />
      )}
    </div>
  );
};

export default CloseReport;
