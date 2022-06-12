import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { useUserInformation } from "../../hooks";
import { changePassword } from "../../store/users";
const ChangePassword = () => {
  const { user, dispatch } = useUserInformation();
  const [errorMessage, setErrorMessage] = useState();
  const password1 = useRef();
  const password2 = useRef();
  const changePasswordHandler = (e) => {
    e.preventDefault();
    const password1value = password1.current.value;
    const password2Value = password2.current.value;
    if (password1value.trim("").length === 0) {
      setErrorMessage("Please enter new password");
      return;
    }
    if (password1value.trim("").length < 5) {
      setErrorMessage("Password is to short");
      return;
    }
    if (password1value !== password2Value) {
      setErrorMessage("Password dont match");
      return;
    }
    changePassword(dispatch, { id: user.id, password: password2Value });
    setErrorMessage("Password has been changed");
  };
  return (
    <div className="sign-up-container">
      <h2>Change Password</h2>
      <form className="form-style">
        <div>
          <label>Enter New Password</label>
          <input
            ref={password1}
            type="password"
            placeholder="Enter Password"
          ></input>
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            ref={password2}
            type="password"
            placeholder="Enter Password"
          ></input>
        </div>

        <p>{errorMessage}</p>
        <Button onClick={changePasswordHandler} name={"Submit"} />
      </form>
    </div>
  );
};
export default ChangePassword;
