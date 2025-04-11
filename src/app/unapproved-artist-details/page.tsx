"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { APPROVED_ARTIST } from "@/gql/artist";
import { useMutation } from "@apollo/client";
import { getMediaUrl } from "@/utils/getMediaUrl";
import type { ArtistData } from "@/types";

const ArtistDetails = () => {
    const [approveArtist, { loading: mutationLoading }] = useMutation(APPROVED_ARTIST);
    const searchParams = useSearchParams();
    const router = useRouter();
    const artistDataString = searchParams.get("data");

    if (!artistDataString) {
        return <div>No artist data found.</div>;
    }

    const artistData: ArtistData = JSON.parse(decodeURIComponent(artistDataString));


    const handleApproveArtist = async () => {
        try {
            await approveArtist({ variables: { userId: artistData.id } });
            router.push("/unapproved-artist");
        } catch (error) {
            console.error("Error approving artist:", error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Artist Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold">Full Name:</span> {artistData.fullName || "Unknown"}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold">Username:</span> {artistData.username || "N/A"}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold">Email:</span> {artistData.email || "N/A"}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold">Location:</span>{" "}
                            {artistData.location?.name || "Unknown"}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold">Bio:</span> {artistData.profile?.bio || "No bio provided"}
                        </p>
                    </div>
                    {artistData.profile?.profilePic && (
                        <Image
                            src={getMediaUrl(artistData.profile.profilePic)}
                            alt={artistData.fullName || "Artist"}
                            width={160}
                            height={160}
                            className="rounded-full shadow-md border-2 border-gray-200"
                        />
                    )}
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Validation Details</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">Phone Number:</span> {artistData.validation?.phoneNumber || "N/A"}
                    </li>
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">Facebook:</span> {artistData.validation?.facebookLink || "N/A"}
                    </li>
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">Instagram:</span> {artistData.validation?.instagramLink || "N/A"}
                    </li>
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">SoundCloud:</span> {artistData.validation?.soundcloudLink || "N/A"}
                    </li>
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">Spotify:</span> {artistData.validation?.spotifyLink || "N/A"}
                    </li>
                    <li className="text-lg text-gray-700">
                        <span className="font-semibold">YouTube:</span> {artistData.validation?.youtubeLink || "N/A"}
                    </li>
                </ul>

                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={handleApproveArtist}
                        disabled={mutationLoading}
                        className="bg-regularAccent text-white font-medium px-6 py-2 rounded-md hover:bg-lightAccent transition disabled:opacity-50"
                    >
                        {mutationLoading ? "Approving..." : "Approve Artist"}
                    </button>
                    <button
                        onClick={() => router.push("/unapproved-artist")}
                        className="bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Back To List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtistDetails;
