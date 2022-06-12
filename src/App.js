import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "./store/users";
import { getPosts } from "./store/posts";
import Navigation from "./components/Navigation/Navigation";
import Home from "./page/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./page/SignUp/SignUp";
import LogIn from "./page/LogIn/LogIn";
import Activity from "./page/Activity/Activity";
import Notification from "./page/Notification/Notification";
import { useUserInformation } from "./hooks";
import BestUsers from "./page/BestUsers/BestUsers";
import ChangeEmail from "./page/ChangeEmail/ChangeEmail";
import ChangePassword from "./page/ChangePassword/ChangePassword";

function App() {
  const { dispatch, currentUser } = useUserInformation();
  useEffect(() => {
    getPosts(dispatch);
    const get = getUsers();
    get(dispatch);
  }, []);
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          {currentUser && <Route path="/activity" element={<Activity />} />}
          <Route path="/bestusers" element={<BestUsers />} />
          {currentUser && (
            <Route path="/notifications" element={<Notification />} />
          )}
          {currentUser && (
            <Route path="/changeemail" element={<ChangeEmail />} />
          )}
          {currentUser && (
            <Route path="/changepassword" element={<ChangePassword />} />
          )}
        </Routes>
        {/* <Home></Home> */}
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
