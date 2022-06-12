import { useState } from "react";
import { useUserInformation } from "../../hooks";
import AddComment from "../AddComment/AddComment";
import CommentPost from "../CommentPost/CommentPost";
import Edit from "../Edit/Edit";
import Interaction from "../InteractionSection/Interaction";
import Postdropdown from "../PostDropdown/Postdropdown";
import "./Post.css";
const Post = (props) => {
  const { currentUser } = useUserInformation();
  const [showComments, setShowComments] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const showCommentsHandler = () => {
    setShowComments(!showComments);
  };
  const openEditHandler = () => {
    setOpenEdit(!openEdit);
  };
  return (
    <div id={props.id} className="post-style">
      <div className="post-main-area">
        <div className="post-information-style">
          <p>{props.user}</p>
        </div>
        <div className="post-content-main-area">
          {!openEdit && (
            <div className="post-content-style">
              <pre>{props.content}</pre>
            </div>
          )}
          {openEdit && (
            <Edit
              id={props.id}
              toggleEdit={openEditHandler}
              content={props.content}
            />
          )}
        </div>
        {props.user === currentUser && (
          <Postdropdown toggleEdit={openEditHandler} id={props.id} />
        )}
      </div>
      <Interaction
        show={showCommentsHandler}
        cNumber={props.comments?.length}
        // showComments={showComments}
        // setShowComments={setShowComments}
        name={props.user}
        id={props.id}
      />
      {showComments && (
        <div>
          <AddComment user={props.user} />
          {props.comments.map((ele) => (
            <CommentPost
              key={ele.id}
              id={ele.id}
              user={ele.user}
              content={ele.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Post;
