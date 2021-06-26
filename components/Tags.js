import React from "react";

const Tags = () => {
  const [tags, setTags] = React.useState([]);
  const [currTag, setCurrTag] = React.useState("");
  const handleChange = (e) => {
    setCurrTag(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      console.log("here");
      console.log(tags);
      e.preventDefault();
      tags.push(currTag);
      setCurrTag("");
    }
  };
  const removeTag = (idx) => {
    tags.splice(idx, 1);
    setTags([...tags]);
  };
  return (
    <div>
      <div className={"text-gray-900 font-medium"}>Tags</div>
      <div className={"flex gap-2 flex-wrap mt-1.5"}>
        {tags.map((tag, idx) => {
          return (
            <div className={"px-2 py-0.5 bg-indigo-100 rounded-sm"} key={idx}>
              <span>{tag}</span>
              <button
                className={"inline ml-1"}
                type="button"
                onClick={() => removeTag(idx)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        className={
          "mt-1 w-full h-10 rounded-md border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
        }
        value={currTag}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <span className={"text-xs font-light text-gray-700"}>
        Hit enter to add a tag
      </span>
    </div>
  );
};

export default Tags;
