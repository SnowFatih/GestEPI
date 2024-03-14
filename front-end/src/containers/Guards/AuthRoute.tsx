import React from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthContext } from "@/contexts/auth";

// A wrapper for <Route> that redirects to homepage if already logged

type AuthRouteProps = {
  children?: React.ReactElement;
};

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isLogged, isReady } = useAuthContext();

  if (isLogged) {
    return <Navigate to="/" />;
  }

  if (!isReady) {
    return null;
  }

  return children ?? <Outlet />;
};
