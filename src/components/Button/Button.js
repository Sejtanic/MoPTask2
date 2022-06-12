import "./Button.css";
const Button = (props) => {
  return (
    <button onClick={props.onClick} className="button-style">
      {props.name}
    </button>
  );
};
export default Button;
