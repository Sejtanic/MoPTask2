import "./CommentPost.css";
const CommentPost = (props) => {
  return (
    <div className="comment-post-style" id={props.id}>
      <div className="comment-post-info-style">
        <p>{props.user}</p>
      </div>
      <div className="comment-post-content-style">
        <pre>{props.content}</pre>
      </div>
    </div>
  );
};
export default CommentPost;
