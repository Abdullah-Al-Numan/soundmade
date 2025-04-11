import React from "react";
import Profile from "./Profile";
import PostTabs from "./tabs";

const CreateArtistPage = () => {
  return (
    <section className="flex w-full">
      <div className="w-9/12">
        <PostTabs />
      </div>
      <div className="w-3/12">
        <Profile />
      </div>
    </section>
  );
};

export default CreateArtistPage;
