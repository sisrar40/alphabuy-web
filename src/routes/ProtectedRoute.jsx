import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role = 'admin' }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // Also check localStorage directly to handle cases where Redux state might be lost on refresh before re-hydration
  const hasToken = token || localStorage.getItem('adminToken');

  if (!isAuthenticated && !hasToken) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Future role checks can be implemented here
  // if (role && user?.role !== role) ...

  return children;
};

export default ProtectedRoute;
