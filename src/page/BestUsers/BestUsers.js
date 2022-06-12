import "./BestUser.css";
import { useUserInformation } from "../../hooks";

const BestUsers = () => {
  const { users } = useUserInformation();
  console.log(users);
  return (
    <div className="best-user-style">
      {users?.map((element) => (
        <p key={Math.random()}>
          {element.name} with {element.activity.length} interaction
        </p>
      ))}
    </div>
  );
};
export default BestUsers;
