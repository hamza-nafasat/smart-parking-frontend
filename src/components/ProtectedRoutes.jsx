/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ requiresAuth = false, redirect = "/login", role }) => {
  // const { user } = useSelector((state) => state.auth);
  // if (requiresAuth && !user) return <Navigate to={redirect} replace />;
  // if (requiresAuth && user?.role != role) return <Navigate to={`/${user?.role}`} replace />;
  // if (!requiresAuth && user) return <Navigate to={`/${user?.role}`} replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
