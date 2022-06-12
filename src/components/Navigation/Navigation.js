import "./Navigation.css";
import { NavLink } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import { useUserInformation } from "../../hooks";
import { postsAction } from "../../store/posts";
import { usersAction } from "../../store/users";
import Search from "../Search/Search";

const Navigation = (props) => {
  const { currentUser, dispatch } = useUserInformation();
  const sortPostsByTimeHandler = () => {
    dispatch(postsAction.sortByTime());
  };
  const sortByComments = () => {
    dispatch(postsAction.sortByComments());
  };
  const sortByUserActivity = () => {
    dispatch(usersAction.sortByUserActivity());
  };
  return (
    <div className="siteFrame">
      <div className="site-navigation-style">
        <div className="site-logo-search-style">
          Logo
          <Search />
        </div>
        <div className="site-navigation-links">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink onClick={sortPostsByTimeHandler} to={"/"}>
            Latest
          </NavLink>
          <NavLink onClick={sortByUserActivity} to={"/bestusers"}>
            Top Users
          </NavLink>
          <NavLink onClick={sortByComments} to={"/"}>
            Hot Questions
          </NavLink>

          {!currentUser && <NavLink to={"/login"}>Log In</NavLink>}
          {!currentUser && <NavLink to={"/signup"}>Sign Up</NavLink>}
        </div>
        {currentUser && <Dropdown />}
      </div>
      {props.children}
    </div>
  );
};
export default Navigation;
