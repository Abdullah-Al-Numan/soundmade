import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { ArtistValidation, GraphQLResponseError } from "@/types";
import { useMutation } from "@apollo/client";
import { UPDATE_SOCIAL_LINK } from "@/gql/profile";
import ErrorMessage from "@/components/errorMessage";

const LinkEdit = ({
  socialLink,
  userId,
}: {
  socialLink?: ArtistValidation;
  userId?: string;
}) => {
  const [links, setLinks] = useState({
    facebook: "",
    instagram: "",
    soundcloud: "",
    spotify: "",
    youtube: "",
  });

  useEffect(() => {
    setLinks({
      facebook: socialLink?.facebookLink || "",
      instagram: socialLink?.instagramLink || "",
      soundcloud: socialLink?.soundcloudLink || "",
      spotify: socialLink?.spotifyLink || "",
      youtube: socialLink?.youtubeLink || "",
    });
  }, [socialLink]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateSocialLink] = useMutation(UPDATE_SOCIAL_LINK);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage("User ID is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await updateSocialLink({
        variables: {
          updateSocialLinkInput: {
            userId,
            facebookLink: links.facebook,
            instagramLink: links.instagram,
            soundcloudLink: links.soundcloud,
            spotifyLink: links.spotify,
            youtubeLink: links.youtube,
          },
        },
      });

      const successMessage = response?.data?.updateSocialLink?.message;
      if (!successMessage) {
        throw new Error("Failed to update links.");
      }

      alert("Social links updated successfully!");
      setErrorMessage(null);
    } catch (error) {
      const graphQLError = (error as GraphQLResponseError)?.graphQLErrors?.[0]
        ?.message;
      setErrorMessage(
        graphQLError || "Failed to update links, please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (label: string, name: keyof typeof links) => (
    <div className="text-start" key={name}>
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={`Enter ${label} Link`}
        value={links[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <section className="flex justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow-lg"
      >
        <p className="text-2xl text-center font-bold text-gray-900">
          Update Social Url
        </p>

        {renderInput("Facebook", "facebook")}
        {renderInput("Instagram", "instagram")}
        {renderInput("SoundCloud", "soundcloud")}
        {renderInput("Spotify", "spotify")}
        {renderInput("YouTube", "youtube")}

        <ErrorMessage errorMessage={errorMessage} />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </section>
  );
};

export default LinkEdit;
