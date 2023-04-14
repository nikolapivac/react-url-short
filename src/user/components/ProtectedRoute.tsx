import { Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

interface Children {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Children) => {
  const { isLoggedIn } = useUserContext();
  return isLoggedIn ? children : <Navigate to='/signin' replace />;
};
