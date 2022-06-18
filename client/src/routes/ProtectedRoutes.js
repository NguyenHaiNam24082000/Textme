import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
