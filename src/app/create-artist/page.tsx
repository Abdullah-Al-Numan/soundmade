"use client";
import ArtistCreate from "@/components/artistCreate";
import Breadcrumb from "@/components/breadcrumb";
import React from "react";

const CreateArtistPage = () => {
  return (
    <div>
      <Breadcrumb />
      <ArtistCreate />
    </div>
  );
};

export default CreateArtistPage;
