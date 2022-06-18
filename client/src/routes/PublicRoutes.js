import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const PublicRoutes = () => {
  const isAuth = useAuth();
  if (isAuth) {
    return <Navigate to="/@channel/me" replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;
