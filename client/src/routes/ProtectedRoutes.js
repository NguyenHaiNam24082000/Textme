import {Outlet} from "react-router";
import Login from "../pages/Login";

const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn;
};

const ProtectedRoutes = () =>{
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;