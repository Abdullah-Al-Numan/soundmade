import { ArtistData } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const searchParams = useSearchParams();
  const artistDataString = searchParams.get("data");

  if (!artistDataString) {
    return <div>No artist data found.</div>;
  }

  const artistData: ArtistData = JSON.parse(
    decodeURIComponent(artistDataString)
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed top-24 right-0 z-30 bg-gray-100 hover:bg-gray-200 p-2 rounded-l-md shadow-md border border-r-0 border-gray-200"
        aria-label={isOpen ? "Hide profile" : "Show profile"}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <aside
        id="profile-container"
        className={`fixed border z-20 h-full top-20 right-0 transition-all ease-in-out duration-300 mt-22 ${
          isOpen ? "w-full md:w-[25%]" : "w-0"
        } bg-white border-r border-gray-200 overflow-hidden`}
        aria-label="Sidebar"
      >
        <div className="flex-1 flex items-center flex-col h-full min-h-0 overflow-y-auto p-4">
          <div className="mb-10">
            <Image
              src={
                getMediaUrl(artistData?.profile?.profilePic) || "/soundmade.png"
              }
              alt={artistData.fullName || "Artist"}
              width={160}
              height={160}
              className="rounded-full mx-auto mb-4"
            />
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Bio:</span>{" "}
              {artistData.profile?.bio || "No bio provided"}
            </p>
          </div>

          <div className="w-full text-center md:text-start mb-24">
            <p className="text-md font-medium text-gray-700 mb-2">
              <span className="font-semibold">Full Name:</span>{" "}
              {artistData.fullName || "Unknown"}
            </p>
            <p className="text-md font-medium text-gray-700 mb-2">
              <span className="font-semibold">Username:</span>{" "}
              {artistData.username || "N/A"}
            </p>
            <p className="text-md font-medium text-gray-700 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {artistData.email || "N/A"}
            </p>
            <p className="text-md font-medium text-gray-700 mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {artistData.location?.name || "Unknown"}
            </p>
            <div className="mt-4">
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Phone Number:</span>{" "}
                {artistData.validation?.phoneNumber || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Facebook:</span>{" "}
                {artistData.validation?.facebookLink || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Instagram:</span>{" "}
                {artistData.validation?.instagramLink || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">SoundCloud:</span>{" "}
                {artistData.validation?.soundcloudLink || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Spotify:</span>{" "}
                {artistData.validation?.spotifyLink || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-2">
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
