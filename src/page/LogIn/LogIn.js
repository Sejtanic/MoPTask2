import "./LogIn.css";
import Button from "../../components/Button/Button";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../store/users";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();
  const users = useSelector((state) => state.users.users);
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    if (
      users.find(
        (element) =>
          element.email === emailValue && element.password !== passwordValue
      )
    ) {
      setErrorMessage("Password is not correct");
      return;
    }
    const user = users.find(
      (element) =>
        element.email === emailValue && element.password === passwordValue
    );
    if (!user) {
      setErrorMessage("Username or password wrong");
      return;
    }
    localStorage.setItem("user", user.name);
    dispatch(usersAction.addCurrentUser());
    navigate("/");
  };
  return (
    <div className="sign-up-container">
      <h2>Log In</h2>
      <form className="form-style">
        <div>
          <label>Email</label>
          <input ref={emailRef} type="email" placeholder="Enter Email"></input>
        </div>
        <div>
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
          ></input>
        </div>
        <p>{errorMessage}</p>
        <Button onClick={loginHandler} name={"Log In"} />
      </form>
    </div>
  );
};
export default LogIn;
