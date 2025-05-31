import Button from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UPDATE_CONTACT } from "@/gql/contact";
import { ContactData } from "@/types";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

interface ReportDetailsProps {
  isDetailsModalOpen: boolean;
  onClose: () => void;
  selectedContact: ContactData;
}

const ContactDetails = ({
  isDetailsModalOpen,
  onClose,
  selectedContact,
}: ReportDetailsProps) => {
  console.log("🚀 ~ selectedContact:", selectedContact);
  const [status, setStatus] = useState(selectedContact?.status || "pending");
  const [comment, setComment] = useState(selectedContact?.comment || "");
  const [updateContact, { loading }] = useMutation(UPDATE_CONTACT);

  const handleUpdate = async () => {
    try {
      await updateContact({
        variables: {
          contactId: selectedContact.id,
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
          <DialogTitle>Contact Details - {selectedContact?.id}</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 w-full">
              <div className="border p-4 w-1/2 space-y-2">
                <div>
                  <strong>Contact Id:</strong>{" "}
                  <span>{selectedContact?.id}</span>
                </div>
                <div>
                  <strong>Name-Email:</strong>{" "}
                  <span>
                    {selectedContact?.user?.name} -{" "}
                    {selectedContact?.user?.email}
                  </span>
                </div>
                <div>
                  <strong>Time:</strong>{" "}
                  <span>
                    {selectedContact?.reason
                      ? new Date(
                          Number(selectedContact.createdAt)
                        ).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <strong>Reason:</strong>{" "}
                  <span>{selectedContact?.reason}</span>
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
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={!selectedContact?.isActive}
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
                    disabled={!selectedContact?.isActive}
                  />
                </div>
                <div className="text-right">
                  {selectedContact?.isActive && (
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

export default ContactDetails;
