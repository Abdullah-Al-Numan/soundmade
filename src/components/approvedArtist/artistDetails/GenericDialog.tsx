"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ConfirmDialogProps } from "@/types";

const renderCancelButton = (text: string) => (
  <DialogClose asChild>
    <button
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      data-testid="dialog-cancel-button"
    >
      {text}
    </button>
  </DialogClose>
);

const renderConfirmButton = (text: string, onConfirm: () => void) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={onConfirm}
    data-testid="dialog-confirm-button"
  >
    {text}
  </button>
);

const GenericDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-content">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title">{title}</DialogTitle>
          <DialogDescription data-testid="dialog-description">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {typeof cancelText === "string" &&
            cancelText.length > 0 &&
            renderCancelButton(cancelText)}
          {renderConfirmButton(confirmText, onConfirm)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenericDialog;
