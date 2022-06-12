import { useSelector, useDispatch } from "react-redux";

export const useUserInformation = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);
  const user = useSelector((state) => state.users.users).find(
    (element) => element.name === currentUser
  );
  return {
    currentUser,
    user,
    dispatch,
    users,
  };
};
