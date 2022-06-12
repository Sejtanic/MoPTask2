import "./Comment.css";
const Comment = (props) => {
  const handleComments = () => {
    props.show();
  };
  return (
    <div onClick={handleComments} className="comment-style">
      <p>Comments</p>
      <p>{props.cNumber ? props.cNumber : ""}</p>
    </div>
  );
};
export default Comment;
