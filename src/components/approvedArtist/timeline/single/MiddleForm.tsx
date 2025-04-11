import React, { useState } from "react";
import {
  languageOptions,
  primaryGenreOptions,
  secondaryGenreOptions,
} from "@/utils/singleData";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/CustomSelect";

const MiddleForm = () => {
  const [date, setDate] = useState<Date | null>(null);  // Initialize as null
  const [language, setLanguage] = useState<string | null>("");
  const [primaryGenre, setPrimaryGenre] = useState<string | null>("");
  const [secondaryGenre, setSecondaryGenre] = useState<string | null>("");
  const [preRelease, setPreRelease] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);  // Added state for calendar visibility

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);  // Close calendar after selecting a date
  };

  return (
    <div>
      <div className="text-start my-2">
        <p>Language</p>
        <CustomSelect
          options={languageOptions}
          placeholder="Select Language"
          value={language}
          onChange={setLanguage}
        />
      </div>
      <div className="text-start my-2">
        <p>Primary Genre</p>
        <CustomSelect
          options={primaryGenreOptions}
          placeholder="Select primary genre"
          value={primaryGenre}
          onChange={setPrimaryGenre}
        />
      </div>
      <div className="text-start my-2">
        <p>Secondary Genre (Optional)</p>
        <CustomSelect
          options={secondaryGenreOptions}
          placeholder="Select secondary genre"
          value={secondaryGenre}
          onChange={setSecondaryGenre}
        />
      </div>
      <div className="text-start my-2">
        <p>Release date</p>
        <div className="relative">
          <Button
            variant={"outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>

          {/* Date picker modal */}
          {isCalendarOpen && (
            <div className="absolute z-10 mt-2 p-2 border rounded-md bg-white shadow-lg">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-start my-2">
        <p>Previously released?</p>
        <RadioGroup
          className="flex gap-4"
          value={preRelease}
          onValueChange={setPreRelease}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pre-release-yes" />
            <Label htmlFor="pre-release-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pre-release-no" />
            <Label htmlFor="pre-release-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default MiddleForm;
