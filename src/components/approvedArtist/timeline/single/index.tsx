import React from "react";
import TopForm from "./TopForm";
import MiddleForm from "./MiddleForm";
import Advanced from "./Advanced";
import Song from "./Song";
import Aditional from "./Aditional";
import Uploader from "./Uploader";

const Single = () => {
  return (
    <div className="w-1/2 m-auto mb-10">
      <TopForm />
      <MiddleForm />
      <Advanced />
      <Song />
      <Aditional />
      <Uploader />
    </div>
  );
};

export default Single;
