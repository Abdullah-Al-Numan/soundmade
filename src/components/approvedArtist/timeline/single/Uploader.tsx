import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React from "react";

const Uploader = () => {
  return (
    <div className="space-y-4">
      <div className="text-start my-2">
        <p>Upload Audio</p>
        <input type="file" accept="audio/*" className="border p-2 w-full" />
      </div>
      <div className="text-start my-2">
        <p>Upload Image</p>
        <input type="file" accept="image/*" className="border p-2 w-full" />
      </div>
      <div className="text-start my-2">
        <p className="text-xl font-semibold">Exclusive Access</p>
        <p>
          Turn on to release this single exclusively for Gold users. Leave it
          off to make it available to everyone.
        </p>
      </div>
      <div className="flex gap-4 my-2">
        <p>Gold</p>
        <Switch />
      </div>
      <div>
        <Button variant={"primary"} className="w-full">
          Release
        </Button>
      </div>
    </div>
  );
};

export default Uploader;
