import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../redux/auth/authSelectors";

export const PrivateRoute = () => {
  const accessToken = useSelector(getAccessToken);
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};
