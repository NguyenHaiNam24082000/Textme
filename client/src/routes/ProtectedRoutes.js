import { Outlet, useNavigate } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const ProtectedRoutes = () => {
  const history = useNavigate();
  const isAuth = useAuth();
  if (!isAuth) {
    history("/login");
  }
  return <Outlet />;
};

export default ProtectedRoutes;
