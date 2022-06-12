import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import "./CreatePost.css";
import { addPost } from "../../store/posts";
import { addActivity } from "../../store/users";
import { useUserInformation } from "../../hooks";
const CreatePost = () => {
  // const currentUser = useSelector((state) => state.users.currentUser);
  // const user = useSelector((state) => state.users.users).find(
  // (element) => element.name === currentUser
  // );
  const { currentUser, user } = useUserInformation();
  const contentRef = useRef();
  const dispatch = useDispatch();

  const addPostHandler = (e) => {
    const postValue = contentRef.current.value;
    if (!postValue) return;
    addPost(dispatch, {
      user: currentUser,
      content: postValue,
      date: new Date().toLocaleDateString("uk-Uk"),
      timestamp: new Date().getTime(),
      likes: [],
      comments: [],
    });
    addActivity(dispatch, {
      id: user.id,
      activity: [
        {
          type: "Created post",
          date: new Date().toLocaleDateString("uk-Uk"),
          content: postValue,
        },
        ...user.activity,
      ],
    });
  };
  return (
    <div className="create-post-style">
      <textarea
        ref={contentRef}
        className="textarea-style"
        placeholder="write something here..."
      ></textarea>
      <Button onClick={addPostHandler} name={"post"} />
    </div>
  );
};
export default CreatePost;
