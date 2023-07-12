import { useSelector } from 'react-redux';
import {  getToken } from '../../redux/auth/authSelectors';
import { Outlet, Navigate } from 'react-router-dom';

export const PublicRoute = ({ restricted = false, redirectTo = '/' }) => {
  const accessToken = useSelector(getToken);

  const shouldRedirect = accessToken && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />;
};