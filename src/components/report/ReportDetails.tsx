import Button from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UPDATE_REPORT } from "@/gql/report";
import { ReportData } from "@/types";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

interface ReportDetailsProps {
  isDetailsModalOpen: boolean;
  onClose: () => void;
  selectedReport: ReportData;
}

const ReportDetails = ({
  isDetailsModalOpen,
  onClose,
  selectedReport,
}: ReportDetailsProps) => {
  const [status, setStatus] = useState(selectedReport?.status || "pending");
  const [comment, setComment] = useState(selectedReport?.comment || "");
  const [updateReport, { loading }] = useMutation(UPDATE_REPORT);

  const handleUpdate = async () => {
    try {
      await updateReport({
        variables: {
          reportId: selectedReport.id,
          status,
          comment,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[75%] max-h-full flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Report Details - {selectedReport?.reportedContentId}
          </DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 w-full">
              <div className="border p-4 w-1/2 space-y-2">
                <div>
                  <strong>Content Id:</strong>{" "}
                  <span>{selectedReport?.reportedContentId}</span>
                </div>
                <div>
                  <strong>Content Type:</strong>{" "}
                  <span>{selectedReport?.reportedContentType}</span>
                </div>
                <div>
                  <strong>Artist Name-Email:</strong>{" "}
                  <span>
                    {selectedReport?.reportedTo?.name} -{" "}
                    {selectedReport?.reportedTo?.email}
                  </span>
                </div>
                <div>
                  <strong>Reporter Name-Email:</strong>{" "}
                  <span>
                    {selectedReport?.reportedBy?.name} -{" "}
                    {selectedReport?.reportedBy?.email}
                  </span>
                </div>
                <div>
                  <strong>Issue:</strong>{" "}
                  <span>{selectedReport?.reportType}</span>
                </div>
              </div>

              <div className="border p-4 w-1/2 space-y-4">
                <div>
                  <label htmlFor="status" className="font-semibold">
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "pending" | "resolved")}
                    disabled={!selectedReport?.isActive}
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="font-semibold">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!selectedReport?.isActive}
                  />
                </div>
                <div className="text-right">
                  {selectedReport?.isActive && (
                    <Button
                      onClick={handleUpdate}
                      title={loading ? "Updating..." : "Update"}
                      customClass="text-[8px] px-1.5 py-1"
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetails;
