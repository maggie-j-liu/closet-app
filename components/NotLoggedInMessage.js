const NotLoggedInMessage = ({ children }) => {
  return (
    <div
      className={
        "text-3xl font-extralight absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }
    >
      {children}
    </div>
  );
};

export default NotLoggedInMessage;
