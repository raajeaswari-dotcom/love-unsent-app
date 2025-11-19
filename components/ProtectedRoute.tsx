import React, { useEffect } from 'react';
import { checkAdminAuth } from '../utils/adminAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  navigate: (page: string) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, navigate }) => {
  const isAuthenticated = checkAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('admin-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
