import React, { Fragment } from "react";
import getImageTags from "../utils/getImageTags";

export default function ClothingTest() {
  /* generated tags */
  const [tags, setTags] = React.useState([]);
  /* basically extract the image, call the api, and write the
    data in <pre> */
  const read = (event) => {
    /* convert to base64 */
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener(
      "load",
      async function () {
        setTags(await getImageTags(reader.result));
      },
      false
    );
  };
  return (
    <div className="px-10">
      <input
        type="file"
        accept="image/jpeg, image/png"
        className={"p-0.5 rounded-md focus-ring w-min"}
        onChange={(e) => {
          console.log(URL.createObjectURL(e.target.files[0]));
          read(e);
        }}
      />
      <ul className="list-disc">
        {tags.map((tag) => {
          return (
            <li>
              {" "}
              <strong>{tag[0]}</strong> {tag[1]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
