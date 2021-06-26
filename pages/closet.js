import React from "react";
import UploadModal from "../components/UploadModal";
import ImageGrid from "../components/ImageGrid";

const Closet = () => {
  return (
    <div>
      <div
        className={
          "bg-gray-50 w-full h-72 flex items-center justify-between px-20"
        }
      >
        <h1 className={"text-5xl font-bold"}>My Closet</h1>
        <div>Icon of closet here</div>
      </div>
      <UploadModal />
      <ImageGrid images={[]} />
    </div>
  );
};
export default Closet;
