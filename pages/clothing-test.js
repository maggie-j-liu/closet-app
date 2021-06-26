import React, { Fragment } from "react";

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
      function () {
        let url = reader.result;
        url = url.replace("data:image/jpeg;base64,", "");
        /* ^ extract prefix to get base64 */

        /* fetch the data */
        fetch(`https://clothing-api-server.vercel.app/fetch`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            base64: url,
          }),
        }).then((data) => {
          data.json().then((newTags) => {
            console.log(newTags);
            setTags(newTags);
          });
        });
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
