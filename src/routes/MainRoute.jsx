// import { useSelector } from 'react-redux';
import CustomerRoute from './CustomerRoute.jsx';
import AuthRoute from './AuthRoute.jsx';

const MainRoute = () => {
  // const { token } = useSelector((state) => state.auth);
  const token = '';
  return token ? <CustomerRoute /> : <AuthRoute />;
};
export default MainRoute;
