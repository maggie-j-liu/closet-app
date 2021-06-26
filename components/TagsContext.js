import React from "react";
const TagsContext = React.createContext({
  tags: [],
  setTags: () => {},
});
const TagsContextProvider = ({ children }) => {
  const [tags, setTags] = React.useState([]);
  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export default TagsContextProvider;

export const useTags = () => React.useContext(TagsContext);
