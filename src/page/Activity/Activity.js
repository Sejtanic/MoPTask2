import { useUserInformation } from "../../hooks";
import { useState } from "react";
import Button from "../../components/Button/Button";
import "./Activity.css";

const Activity = () => {
  const [loadNumberValue, setLoadNumberValue] = useState(20);

  const { user } = useUserInformation();

  const loadMoreHandler = () => {
    setLoadNumberValue((prevValue) => prevValue + 20);
  };
  return (
    <div className="activity-style">
      <h2>Activity</h2>
      {user?.activity.slice(0, loadNumberValue).map((ele) => (
        <div className="activity-post-style" key={Math.random()}>
          <div className="activity-information">
            <p>{ele.type}</p>
            <p>{ele.date}</p>
          </div>
          <p className="activity-content">{ele.content}</p>
        </div>
      ))}
      {user?.activity.length > loadNumberValue && (
        <Button onClick={loadMoreHandler} name={"Load more"} />
      )}
    </div>
  );
};
export default Activity;
