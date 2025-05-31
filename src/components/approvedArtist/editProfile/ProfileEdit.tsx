import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { ProfileEditType } from "@/types";
import { uploadFile } from "@/utils/aws";
import { UPDATE_ARTIST_MUTATION } from "@/gql";
import { useMutation } from "@apollo/client";
import ErrorMessage from "@/components/errorMessage";

const ProfileEdit = ({ artistinfo }: ProfileEditType) => {
  const [formData, setFormData] = useState({
    fullName: artistinfo?.fullName || "",
    username: artistinfo?.username || "",
    email: artistinfo?.email || "",
    location: artistinfo?.location?.name || "",
    phoneNumber: artistinfo?.validation?.phoneNumber || "",
    profilePic:
      getMediaUrl(artistinfo?.profile?.profilePic) || "/soundmade.png",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateArtist] = useMutation(UPDATE_ARTIST_MUTATION, {
    onCompleted: (data) => {
      if (data?.updateArtist?.message) {
        alert("Profile updated successfully!");
        setErrorMessage(null);
      }
    },
    onError: (error) => {
      console.error("GraphQL Error:", error);
      setErrorMessage(
        error.message || "Failed to update profile. Please try again."
      );
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setFormData((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      let profilePic = artistinfo?.profile?.profilePic;

      if (profileImage) {
        try {
          const imageUrl = URL.createObjectURL(profileImage);
          const imgBlob = await (await fetch(imageUrl)).blob();

          if (!imgBlob)
            throw new Error("Failed to upload image. Please try again.");
          if (!profileImage.name || !profileImage.type)
            throw new Error("Image file name or mime type not found.");

          const responseImg = await uploadFile(
            imgBlob,
            profileImage.name,
            profileImage.type
          );
          profilePic = responseImg?.Key;
        } catch (imgError) {
          console.error("Image upload failed:", imgError);
          throw imgError;
        }
      }

      const updateArtistInput = {
        email: artistinfo?.email,
        profilePic,
        fullName: formData.fullName,
        username: formData.username,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
      };

      const { data } = await updateArtist({ variables: { updateArtistInput } });
      console.log("Artist updated successfully:", data);
      setIsSubmitting(false);
    } catch (error: any) {
      console.error("Error updating artist:", error);
      setErrorMessage(error?.message || "Error updating profile.");
      setIsSubmitting(false);
    }
  };

  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    isDisabled = false
  ) => (
    <div className="text-start" key={name}>
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={`Enter ${label}`}
        value={formData[name]}
        onChange={!isDisabled ? handleChange : undefined}
        disabled={isDisabled}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={formData.profilePic}
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profilePic"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer"
          >
            Change
          </label>
        </div>
      </div>

      {renderInputField("Full Name", "fullName")}
      {renderInputField("Username", "username")}
      {renderInputField("Email", "email", true)}
      {renderInputField("Location", "location")}
      {renderInputField("Phone Number", "phoneNumber")}

      <ErrorMessage errorMessage={errorMessage} />

      <div className="w-full mt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleUpdate}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
