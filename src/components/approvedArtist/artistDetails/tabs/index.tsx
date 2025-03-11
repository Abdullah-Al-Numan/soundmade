import React from "react";

import { useSearchParams } from "next/navigation";
import { ArtistData } from "@/types";
import POST from "../../timeline/post";
import Video from "../../timeline/video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommingSoon from "@/components/commingSoon";

const PostTabs = () => {
  const searchParams = useSearchParams();
  const artistDataString = searchParams.get("data");
  if (!artistDataString) {
    return <div>No artist data found.</div>;
  }

  const artistData: ArtistData = JSON.parse(
    decodeURIComponent(artistDataString)
  );
  const tabsData = [
    {
      value: "post",
      label: "Post",
      content: <POST />,
    },
    {
      value: "video",
      label: "Videos",
      content: <Video />,
    },
    {
      value: "single",
      label: "Single",
      content: <CommingSoon />,
    },
    {
      value: "albums",
      label: "Albums",
      content: <CommingSoon />,
    },
    {
      value: "events",
      label: "Events",
      content: <CommingSoon />,
    },
  ];

  return (
    <div className="mt-4">
      <div className="w-full text-center mb-2">
        <p>
          All Changes for the
          <span className="font-semibold ml-2 text-[#f77811]">
            {artistData.fullName}
          </span>
        </p>
      </div>
      <Tabs defaultValue={tabsData[0]?.value} className="w-full text-center">
        <TabsList>
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-10">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PostTabs;
