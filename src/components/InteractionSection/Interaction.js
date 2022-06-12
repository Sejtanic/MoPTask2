import Like from "./Like/Like";
import "./Interaciton.css";
import Comment from "./Comment/Comment";
const Interaction = (props) => {
  return (
    <div className="interaction-style">
      <Like id={props.id} name={props.name} />
      <Comment
        cNumber={props.cNumber}
        show={props.show}
        // setShowComments={props.setShowComments}
      />
    </div>
  );
};
export default Interaction;
