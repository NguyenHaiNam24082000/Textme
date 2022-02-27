import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const ProtectedRoutes = () => {
  const history = useNavigate();
  const isAuth = useAuth();
  useEffect(() => {
    !isAuth && history("/login");
  }, [isAuth]);
  return <Outlet />;
};

export default ProtectedRoutes;