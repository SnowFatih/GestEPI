import React from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

// A wrapper for <Route> that redirects to login if not logged

interface ProtectedRouteProps extends React.PropsWithChildren {
  children?: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogged, isReady, user } = useAuthContext();

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (!isReady) {
    return null;
  }

  return children ?? <Outlet />;
};
