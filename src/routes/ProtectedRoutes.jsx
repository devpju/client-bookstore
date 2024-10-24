import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isLoggedIn, isAllowed }) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  if (!isAllowed) {
    return <Navigate to='/forbidden' />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
