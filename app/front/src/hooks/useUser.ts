import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchUserInfo } from "../store/slices/userSlice";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const getUserInfo = () => {
    return dispatch(fetchUserInfo());
  };

  return {
    user: currentUser,
    loading,
    error,
    getUserInfo,
  };
};
