import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { useUserInformation } from "../../hooks";
import { changeEmail } from "../../store/users";
const ChangeEmail = () => {
  const emailRef = useRef();
  const { user, users, dispatch } = useUserInformation();
  const [errorMessage, setErrorMessage] = useState();

  const changeEmailHandler = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    if (emailValue.trim().length === 0) {
      setErrorMessage("Please enter new email");
      return;
    }
    if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (users.find((element) => element.email === emailValue)) {
      setErrorMessage("Email alredy exist");
      return;
    }

    changeEmail(dispatch, { id: user.id, email: emailValue });
    setErrorMessage("Email has been changed");
  };
  return (
    <div className="sign-up-container">
      <h2>Change Email</h2>
      <form className="form-style">
        <div>
          <label>Enter New Email</label>
          <input ref={emailRef} type="email" placeholder="Enter Email"></input>
        </div>

        <p>{errorMessage}</p>
        <Button onClick={changeEmailHandler} name={"Submit"} />
      </form>
    </div>
  );
};
export default ChangeEmail;
