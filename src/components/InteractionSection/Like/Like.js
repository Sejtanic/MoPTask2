import { useDispatch, useSelector } from "react-redux";
import { addLike } from "../../../store/posts";
import { addActivity, addNotification } from "../../../store/users";
import "./Like.css";
const Like = (props) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const user = useSelector((state) => state.users.users).find(
    (element) => element.name === currentUser
  );
  const dataUser = useSelector((state) => state.users.users).find(
    (element) => element.name === props.name
  );
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const isLiked = posts
    .find((element) => element.id === props.id)
    .likes?.includes(currentUser);
  let likesData = posts.find((element) => element.id === props.id).likes;
  const onLikeHandler = (e) => {
    e.preventDefault();
    if (isLiked) {
      likesData = likesData.filter((element) => element !== currentUser);
      addLike(dispatch, { id: props.id, likes: [...likesData] });

      return;
    }
    addLike(dispatch, { id: props.id, likes: [...likesData, currentUser] });

    addActivity(dispatch, {
      id: user.id,
      activity: [
        {
          type: "liked",
          date: new Date().toLocaleDateString("uk-Uk"),
          content: "",
        },
        ...user.activity,
      ],
    });
    addNotification(dispatch, {
      id: dataUser.id,
      notifications: [
        {
          type: "liked your post",
          user: currentUser,
          date: new Date().toLocaleDateString("uk-Uk"),
          content: "",
        },
        ...dataUser.notifications,
      ],
      notificationCounter: user.notificationCounter + 1,
    });
  };
  return (
    <div onClick={onLikeHandler} className="like-section-style">
      <p>Like</p>
      <p className={isLiked ? "like-style red" : "like-style"}>&#10084;</p>
      <p>{likesData?.length}</p>
    </div>
  );
};
export default Like;
