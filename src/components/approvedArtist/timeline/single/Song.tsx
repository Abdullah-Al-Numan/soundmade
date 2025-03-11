import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { rolesOptions } from "@/utils/singleData";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/CustomSelect";

const Song = () => {
  const [songwriters, setSongwriters] = useState<string[]>([""]);
  const [artists, setArtists] = useState<{ name: string; role: string }[]>([
    { name: "", role: "" },
  ]);

  const handleAddSongwriter = () => {
    setSongwriters([...songwriters, ""]);
  };

  const handleRemoveSongwriter = (index: number) => {
    setSongwriters(songwriters.filter((_, i) => i !== index));
  };

  const handleAddArtist = () => {
    setArtists([...artists, { name: "", role: "" }]);
  };

  const handleRemoveArtist = (index: number) => {
    setArtists(artists.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="text-start my-2">
        <p>Song title (required)</p>
        <Input placeholder="Write a title for the single" />
      </div>

      <div className="text-start my-2">
        <div className="flex justify-between items-center">
          <p>Song Writer (required)</p>
          <Button variant="outline" size="icon" onClick={handleAddSongwriter}>
            +
          </Button>
        </div>
        {songwriters.map((_, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <Input placeholder="Write the song writer's name" />
            {index > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="text-red-600"
                onClick={() => handleRemoveSongwriter(index)}
              >
                x
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="text-start my-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Artist/creative</p>
          <Button variant="outline" size="icon" onClick={handleAddArtist}>
            +
          </Button>
        </div>
        {artists.map((artist, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <Input
              className="w-1/2"
              placeholder="Write the artist/creative name"
            />
            <CustomSelect
              options={rolesOptions}
              className="w-1/2"
              placeholder="Select role"
              value={artist.role}
              onChange={(role) => {
                const updatedArtists = [...artists];
                updatedArtists[index].role = role;
                setArtists(updatedArtists);
              }}
            />
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
        <p>Copyright ownership</p>
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <p className="text-sm text-muted-foreground">
              I confirm that I hold full rights to the music I am uploading to
              Soundmade (required)
            </p>
          </div>
        </div>
      </div>
      <div className="text-start my-2">
        <p>Is this a cover of another song? (required)</p>
        <RadioGroup className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="cover-yes" />
            <Label htmlFor="cover-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="cover-no" />
            <Label htmlFor="cover-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default Song;
