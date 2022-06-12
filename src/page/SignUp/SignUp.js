import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import "./SignUp.css";
import { addUser } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { useUserInformation } from "../../hooks";

const SignUp = () => {
  const { users, dispatch } = useUserInformation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const signupHandler = (e) => {
    e.preventDefault();
    const usernameValue = userNameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    if (
      usernameValue.trim("").length === 0 ||
      emailValue.trim("").length === 0
    ) {
      setErrorMessage("Please enter infromations");
      return;
    }
    if (passwordValue.trim("").length < 4) {
      setErrorMessage("password must be at least 4 chars");
      return;
    }
    if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (users.find((element) => element.name === usernameValue)) {
      setErrorMessage("Username alredy in use");
      return;
    }
    if (users.find((element) => element.email === emailValue)) {
      setErrorMessage("Email alredy in use");
      return;
    }
    addUser(dispatch, {
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
      notifications: [],
      activity: [],
      notificationCounter: 0,
    });
    navigate("/login");
  };
  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form className="form-style">
        <div>
          <label>Username</label>
          <input
            ref={userNameRef}
            type="text"
            placeholder="Enter Username"
          ></input>
        </div>
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
        <Button onClick={signupHandler} name={"Sign Up"} />
      </form>
    </div>
  );
};
export default SignUp;
