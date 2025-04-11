import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PostData } from "@/types";
import { PostImageGallery } from "./PostImageGallery";
import { Badge } from "@/components/ui/badge";

type ViewPostProps = {
  isViewModalOpen: boolean;
  onCloseView: () => void;
  selectedPost: PostData;
};

const ViewPost = ({
  isViewModalOpen,
  onCloseView,
  selectedPost,
}: ViewPostProps) => {
  return (
    <Dialog open={isViewModalOpen} onOpenChange={onCloseView}>
      <DialogContent className="sm:max-w-[425px] max-h-full flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {selectedPost?.user?.fullName}&apos;s post
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex justify-center">
            <PostImageGallery images={selectedPost?.images} />
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
            {selectedPost?.description ? (
              <p className="text-sm">{selectedPost.description}</p>
            ) : (
              <p className="text-sm text-slate-500 italic">No description</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Type:</span>
            <Badge variant={selectedPost?.isPaid ? "default" : "outline"}>
              {selectedPost?.isPaid ? "Paid" : "Free"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPost;
