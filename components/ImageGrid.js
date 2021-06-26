const Image = ({ url, tags }) => {
  console.log("image tags", tags);
  return (
    <div
      className={"relative w-full h-full group flex justify-center focus-ring"}
      tabIndex={0}
    >
      <img src={url} className={"self-center"} />
      <div
        className={
          "absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-60 group-focus:opacity-60"
        }
      />
      <div
        className={"absolute inset-0 flex flex-col items-center justify-center"}
      >
        <div
          className={
            "flex flex-wrap items-center justify-center gap-2 px-6 py-4"
          }
        >
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={
                "opacity-0 group-hover:opacity-100 group-focus:opacity-100 h-max bg-indigo-300/90 px-1 py-0.5 rounded-md"
              }
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageGrid = ({ images }) => {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 py-10"
      }
    >
      {images.map(({ url, tags }, idx) => (
        <Image key={idx} url={url} tags={tags} />
      ))}
    </div>
  );
};

export default ImageGrid;
