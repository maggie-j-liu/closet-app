const ImageGrid = ({ images }) => {
  return (
    <div className={"grid grid-cols-4 gap-4 px-8"}>
      {images.map((image, idx) => (
        <img key={idx} src={image} />
      ))}
    </div>
  );
};

export default ImageGrid;
