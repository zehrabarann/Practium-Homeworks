import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, admin, ...rest }) => {
  const { loggedIn, user } = useAuth();
  const authContext = useAuth();
  let auth = { token: true };
  console.log(auth);
  const { pathname } = useLocation();

  if (pathname === "/profile") {
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
  }

  if (pathname === "/admin") {
    admin && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
  }

  return (
    <></>
  );
};

export default PrivateRoute;