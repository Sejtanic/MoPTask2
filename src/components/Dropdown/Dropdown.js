import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeNotification, usersAction } from "../../store/users";
import "./Dropdown.css";
const Dropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const user = useSelector((state) => state.users.users).find(
    (element) => element.name === currentUser
  );
  const [isActive, setIsActive] = useState(false);
  const dropdownHandler = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(usersAction.addCurrentUser());
  };

  const removeNotificationHandler = () => {
    removeNotification(dispatch, { id: user.id, notificationCounter: 0 });
    navigate("/notifications");
  };
  const dropHandler = (e) => {
    setIsActive(!isActive);
  };
  return (
    <div className={isActive ? "dropdown active" : "dropdown"}>
      <button onClick={dropdownHandler} className="link">
        <p onClick={removeNotificationHandler}>
          {user?.notificationCounter ? user?.notificationCounter : ""}
        </p>
        {currentUser}
        <i className="far fa-user-circle"></i>
      </button>
      <div onClick={dropHandler} className="dropdown-menu">
        <NavLink onClick={removeNotificationHandler} to={"/notifications"}>
          Notificatons
        </NavLink>
        <NavLink to={"/activity"}>Activity</NavLink>
        <NavLink to={"/changeemail"}>Change Email</NavLink>
        <NavLink to={"/changepassword"}>Change Password</NavLink>
        <NavLink onClick={logoutHandler} to={"/"}>
          Log Out
        </NavLink>
      </div>
    </div>
  );
};
export default Dropdown;
