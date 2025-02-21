"use client";
import ApprovedArtistDetails from "@/components/approvedArtist/artistDetails";
import React, { Suspense } from "react";

const ApprovedArtistDetailsPage = () => {
  return (
    <div>
      <ApprovedArtistDetails />
    </div>
  );
};

const ApprovedArtistDetailsSuspense = () => (
    <Suspense fallback={<div>Loading artist details...</div>}>
        <ApprovedArtistDetailsPage />
    </Suspense>
);

export default ApprovedArtistDetailsSuspense;