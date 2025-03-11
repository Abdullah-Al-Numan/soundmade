import { Input } from "@/components/ui/input";
import React from "react";

const Advanced = () => {
  return (
    <>
      <div className="text-start my-2">
        <p>Label name (optional)</p>
        <Input placeholder="Write the label name" />
      </div>
      <div className="text-start my-2">
        <p>Recording location (optional)</p>
        <Input placeholder="Write the Recording location" />
      </div>
      <div className="text-start my-2">
        <p>UPC/EAN code (optional)</p>
        <Input placeholder="Write the UPC/EAN code" />
      </div>
    </>
  );
};

export default Advanced;
