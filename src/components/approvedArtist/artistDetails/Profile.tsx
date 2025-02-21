import { ArtistData } from "@/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/getMediaUrl";

const Profile = () => {
  const searchParams = useSearchParams();
  const artistDataString = searchParams.get("data");
  if (!artistDataString) {
    return <div>No artist data found.</div>;
  }

  const artistData: ArtistData = JSON.parse(
    decodeURIComponent(artistDataString)
  );

  return (
    <div>
      <aside
        id="profile-container"
        className={`fixed border z-20 h-full top-20 right-0 transition-width ease-in-out duration-300 mt-22 w-96 bg-white border-r border-gray-200 overflow-hidden`}
        aria-label="Sidebar"
      >
        <div className="flex-1 flex items-center flex-col h-full min-h-0 overflow-y-auto">
          <div className="mb-10">
            <Image
              src={
                getMediaUrl(artistData?.profile?.profilePic) || "/soundmade.png"
              }
              alt={artistData.fullName || "Artist"}
              width={160}
              height={160}
            />
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Bio:</span>{" "}
              {artistData.profile?.bio || "No bio provided"}
            </p>
          </div>

          <div className="px-4">
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Full Name:</span>{" "}
              {artistData.fullName || "Unknown"}
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Username:</span>{" "}
              {artistData.username || "N/A"}
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {artistData.email || "N/A"}
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Location:</span>{" "}
              {artistData.location?.name || "Unknown"}
            </p>
            <div className="mt-2">
              <p className="text-md text-gray-700">
                <span className="font-semibold">Phone Number:</span>{" "}
                {artistData.validation?.phoneNumber || "N/A"}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Facebook:</span>{" "}
                {artistData.validation?.facebookLink || "N/A"}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Instagram:</span>{" "}
                {artistData.validation?.instagramLink || "N/A"}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">SoundCloud:</span>{" "}
                {artistData.validation?.soundcloudLink || "N/A"}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Spotify:</span>{" "}
                {artistData.validation?.spotifyLink || "N/A"}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">YouTube:</span>{" "}
                {artistData.validation?.youtubeLink || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Profile;
