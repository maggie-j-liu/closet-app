import Tags from "./Tags";
import { useTags } from "./TagsContext";
function siml(a, b) {
  var res = 0;
  for (var i = 0; i < a.length; i++) {
      if (a.indexOf(b[i]) != -1) {
          res ++;
      }
  }
  return res;
}
const TagSearch = (userCloset) => {
  const { tags, setTags } = useTags();
  console.log(userCloset);
  return (
    <div><Tags /></div>
  );
 
};
export default TagSearch;