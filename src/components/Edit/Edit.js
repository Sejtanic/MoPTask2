import { useRef } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/posts";
import Button from "../Button/Button";
import "./Edit.css";
const Edit = (props) => {
  const dispatch = useDispatch();
  const editPostRef = useRef();
  const cancelEditHandler = () => {
    props.toggleEdit();
  };
  const editPostHandler = () => {
    const editedContent = editPostRef.current.value;
    editPost(dispatch, { id: props.id, content: editedContent });
  };
  return (
    <div className="edit-style">
      <textarea ref={editPostRef} defaultValue={props.content}></textarea>
      <div className="edit-button-style">
        <Button onClick={editPostHandler} name={"Save"} />
        <Button onClick={cancelEditHandler} name={"Cancel"} />
      </div>
    </div>
  );
};
export default Edit;
