import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { languageOptions } from "@/utils/singleData";
import React, { useState } from "react";
import CustomSelect from "@/components/ui/CustomSelect"; 

const Aditional = () => {
  const [language, setLanguage] = useState<string | null>("");

  return (
    <>
      <div className="text-start my-2">
        <p className="font-semibold">Additional Information</p>
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <p className="text-sm text-muted-foreground">
              Instrumental - This song has no lyrics
            </p>
          </div>
        </div>
      </div>
      <div className="text-start my-2">
        <p>ISRC (optional)</p>
        <Input placeholder="Write the ISRC" />
      </div>
      <div className="text-start my-2">
        <p>Language of lyrics</p>
        <CustomSelect
          options={languageOptions}
          placeholder="Select Language"
          value={language}
          onChange={setLanguage}
        />
      </div>
      <div className="text-start my-2">
        <p>Lyrics (Recommended)</p>
        <Textarea />
      </div>
    </>
  );
};

export default Aditional;
