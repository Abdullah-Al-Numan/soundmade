import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const TopForm = () => {
  const [artists, setArtists] = useState<string[]>([""]);
  const [explicitLyrics, setExplicitLyrics] = useState<string | null>(null);

  const handleAddArtist = () => {
    setArtists([...artists, ""]);
  };

  const handleRemoveArtist = (index: number) => {
    const updatedArtists = artists.filter((_, i) => i !== index);
    setArtists(updatedArtists);
  };

  return (
    <div>
      <div className="text-start">
        <p>Title</p>
        <Input placeholder="Write a title for the single" />
      </div>

      <div className="text-start my-2">
        <div className="flex justify-between items-center">
          <p>Main artist name</p>
          <Button variant="outline" size="icon" onClick={handleAddArtist}>
            +
          </Button>
        </div>

        {artists.map((_, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <Input placeholder="Write the Main artist" />
            {index > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="text-red-600"
                onClick={() => handleRemoveArtist(index)}
              >
                x
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="text-start my-2">
        <p>Do this song have explicit lyrics?</p>
        <RadioGroup
          className="flex gap-4"
          onValueChange={(value) => setExplicitLyrics(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="explicit-yes" />
            <Label htmlFor="explicit-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="explicit-no" />
            <Label htmlFor="explicit-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {explicitLyrics === "no" && (
        <div className="text-start my-2">
          <p className="mb-2 text-sm">
            Select yes if your release features any explicit content. Submitting
            incorrect metadata will lead to a delay or rejection from
            distribution.
          </p>
          <p>Do this song have explicit lyrics?</p>
          <RadioGroup className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nested-explicit-yes" />
              <Label htmlFor="nested-explicit-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nested-explicit-no" />
              <Label htmlFor="nested-explicit-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default TopForm;
