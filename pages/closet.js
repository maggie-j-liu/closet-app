import Image from "../components/image";
import React from "react";
const Closet = () => {
  const [file, setFile] = React.useState();
  const [image, setImage] = React.useState();
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
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={(event) => {
          console.log(event);
          setFile(event.target.files[0]);
          setImage(URL.createObjectURL(event.target.files[0]));
        }}
      />
      <img src={image} />
    </div>
  );
};
export default Closet;
