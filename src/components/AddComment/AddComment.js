import "./AddComment.css";
import Button from "../Button/Button";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { postComment } from "../../store/posts";
import { useUserInformation } from "../../hooks";
import { addActivity } from "../../store/users";
import { addNotification } from "../../store/users";

const AddComment = (props) => {
  const commentRef = useRef();
  const { currentUser, user, dispatch } = useUserInformation();
  const posts = useSelector((state) => state.posts.posts);
  const dataUser = useSelector((state) => state.users.users).find(
    (element) => element.name === props.user
  );

  const addCommentHandler = (e) => {
    e.preventDefault();
    const commentValue = commentRef.current.value;
    if (commentValue.trim("").length === 0) return;

    const id = +e.target.parentElement.parentElement.parentElement.id;

    const post = posts.find((element) => element.id === id);

    postComment(dispatch, {
      id,
      comments: [
        ...post.comments,
        { user: currentUser, content: commentValue, id: Math.random() },
      ],
    });

    addActivity(dispatch, {
      id: user.id,
      activity: [
        {
          type: "Commented on post",
          date: new Date().toLocaleDateString("uk-Uk"),
          content: commentValue,
        },
        ...user.activity,
      ],
    });
    addNotification(dispatch, {
      id: dataUser.id,
      notifications: [
        {
          type: "commented on your post",
          user: currentUser,
          date: new Date().toLocaleDateString("uk-Uk"),
          content: commentValue,
        },
        ...dataUser.notifications,
      ],
      notificationCounter: user.notificationCounter + 1,
    });
  };
  return (
    <div className="post-comment-style">
      <textarea placeholder="Add comment.." ref={commentRef}></textarea>
      <Button onClick={addCommentHandler} name={"Comment"}></Button>
    </div>
  );
};
export default AddComment;
