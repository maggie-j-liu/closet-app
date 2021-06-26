import React from "react";
import UploadModal from "../components/UploadModal";
import ImageGrid from "../components/ImageGrid";
import { useUser } from "../firebase/useUser";
import NotLoggedInMessage from "../components/NotLoggedInMessage";
import Loading from "../components/Loading";

const Closet = () => {
  const { user } = useUser();
  if (user === null) {
    return <Loading />;
  } else if (user === undefined) {
    return (
      <NotLoggedInMessage>Log in to access your closet</NotLoggedInMessage>
    );
  }
  return (
    <div>
      <div
        className={
          "bg-indigo-50 w-full h-72 flex items-center justify-between px-20"
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
