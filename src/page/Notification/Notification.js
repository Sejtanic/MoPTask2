// import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { useUserInformation } from "../../hooks";
import "./Notification.css";
const Notification = () => {
  const [loadNumberValue, setLoadNumberValue] = useState(20);
  const { user } = useUserInformation();

  const loadMoreHandler = () => {
    setLoadNumberValue((previouseValue) => previouseValue + 20);
  };
  return (
    <div className="activity-style">
      <h2>Notifications</h2>
      {user?.notifications.slice(0, loadNumberValue).map((ele) => (
        <div key={Math.random()} className="notification-post-style">
          <p>{`${ele.user}   ${ele.type}`}</p>
          <p>{ele.content}</p>
        </div>
      ))}
      {user?.notifications.length > loadNumberValue && (
        <Button name={"Load More"} onClick={loadMoreHandler} />
      )}
    </div>
  );
};
export default Notification;
