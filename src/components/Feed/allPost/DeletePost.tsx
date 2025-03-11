import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

const DeletePost = ({ post, onClose }) => {
  const handleDelete = () => {
    console.log("Post deleted:", post);
    onClose(); // Close the dialog after deletion
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-sm text-slate-500">Post: {post.text || "N/A"}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Cancel
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 text-white">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
