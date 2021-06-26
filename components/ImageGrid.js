const Image = ({ url, tags }) => {
  console.log("image tags", tags);
  return (
    <div className={"relative w-full h-full group flex justify-center"}>
      <img src={url} className={"self-center"} />
      <div
        className={
          "absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-60"
        }
      />
      <div
        className={"absolute inset-0 flex flex-col items-center justify-center"}
      >
        <div
          className={"flex flex-wrap items-center justify-center gap-2 px-6"}
        >
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={
                "opacity-0 group-hover:opacity-100 h-max bg-indigo-300/70 px-1 py-0.5 rounded-md"
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
  console.log(images);
  images = images.reverse();
  return (
    <div className={"grid grid-cols-4 gap-4 px-8"}>
      {images.map(({ url, tags }, idx) => (
        <Image key={idx} url={url} tags={tags} />
      ))}
    </div>
  );
};

export default ImageGrid;
