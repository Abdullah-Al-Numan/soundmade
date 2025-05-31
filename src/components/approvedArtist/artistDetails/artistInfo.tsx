import React from "react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { ArtistInfoProps } from "@/types";

const ArtistInfo: React.FC<ArtistInfoProps> = ({ artist }) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{artist.fullName}</h1>
      <p>Email: {artist.email}</p>
      <p>Location: {artist.location?.name || "Unknown"}</p>
      {artist.profile?.profilePic && (
        <Image
          height={50}
          width={50}
          alt={artist.fullName || "Artist"}
          src={getMediaUrl(artist.profile.profilePic)}
          className="rounded-full w-12 h-12"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ArtistInfo;
