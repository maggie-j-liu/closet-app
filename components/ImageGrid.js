const ImageGrid = ({ images }) => {
  console.log(images);
  images = images.reverse();
  return (
    <div className={"grid grid-cols-4 gap-4 px-8"}>
      {images.map(({ url, tags }, idx) => (
        <img key={idx} src={url} />
      ))}
    </div>
  );
};

export default ImageGrid;
