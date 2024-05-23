// PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const userToken = localStorage.getItem('user-token');

  if (!userToken) {
    // Redirect to login if no token is found
    toast.error("You must be logged in to access this page. Please log in to continue.");
    return <Navigate to="/genvision/login" replace />;
  }

  // Render children if the token exists
  return children;
};

export default PrivateRoute;
