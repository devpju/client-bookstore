import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const userInfo = useSelector((state) => state.auth?.userInfo);

  if (!accessToken) {
    return <Navigate to='/login' />;
  }

  const roles = userInfo?.roles || [];

  const isAuthorized = roles.some((role) => allowedRoles.includes(role));

  if (!isAuthorized) {
    return <Navigate to='/forbidden' />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
