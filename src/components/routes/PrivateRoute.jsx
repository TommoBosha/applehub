import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getToken } from '../../redux/auth/authSelectors';
import AuthModal from '../Modal/Modal';

export const PrivateRoute = () => {
  const accessToken = useSelector(getToken);
  return accessToken ? <Outlet /> : <AuthModal/>;
};