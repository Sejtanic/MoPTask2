import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPosts, postsAction } from "../../store/posts";
import "./Search.css";
const Search = () => {
  const [prevState, setPrevState] = useState();
  const dispatch = useDispatch();
  const searchPostHandler = (e) => {
    dispatch(postsAction.searchPost(e.target.value));
    // setPrevState(e.target.value);
  };
  return (
    <div className="search-style">
      <input
        onChange={searchPostHandler}
        className="search-input-style"
        placeholder="search posts.."
      ></input>
    </div>
  );
};
export default Search;
