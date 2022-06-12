import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/posts";
import "./Postdropdown.css";
const Postdropdown = (props) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const dropdownHandler = () => {
    setIsActive(!isActive);
  };
  const deletePostHandler = (e) => {
    deletePost(dispatch, { id: props.id });
    setIsActive(!isActive);
  };
  const editPostHandler = () => {
    props.toggleEdit();
    setIsActive(!isActive);
  };
  return (
    <div className={isActive ? "post-dropdown active" : "post-dropdown"}>
      <p onClick={dropdownHandler} className="post-link">
        &#8282;
      </p>
      <div className="post-dropdown-menu">
        <p onClick={editPostHandler}>Edit</p>
        <p onClick={deletePostHandler}>Delite</p>
      </div>
    </div>
  );
};
export default Postdropdown;
