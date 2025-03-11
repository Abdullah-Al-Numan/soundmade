import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const EditPost = ({ post, onClose }) => {
  const [name, setName] = useState(post.text);
  const [username, setUsername] = useState(post.createBy);
  const [images, setImages] = useState(post.pic || []);


  useEffect(() => {
    setName(post.text);
    setUsername(post.createBy);
    setImages(post.pic || []);
  }, [post]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSave = () => {
    console.log("Saving changes:", { name, username, images });
    onClose();
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove image by index
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you &apos; re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images
            </Label>
            <div className="col-span-3">
              {images.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        height={20}
                        width={20}
                        src={image}
                        alt={`Selected Post Image ${index}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <Button
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Images</p>
              )}
              <Input
                id="images"
                type="file"
                onChange={handleImageChange}
                className="mt-2"
                multiple
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Text
            </Label>
            <Textarea
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Created Date
            </Label>
            <Input
              id="createAt"
              readOnly
              value={post?.createAt}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Created By
            </Label>
            <Input
              id="username"
              readOnly
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} type="button">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
