import { Outlet, useNavigate } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const PublicRoutes = () => {
  const history = useNavigate();
  const isAuth = useAuth();
  if (isAuth) {
    history("/channel/@me");
  }
  return <Outlet />;
};

export default PublicRoutes;
