import jwtDecode from "jwt-decode";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { configureAxios } from "@/configs/axios";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";

export type UserType = {
  email: string;
  firstname: string;
  lastname: string;
};

type AuthContextType = {
  user: UserType | null;
  isLogged: boolean;
  isReady: boolean;
  saveUser: (token: string, user: UserType) => void;
  clearUser: () => void;
};

type JWTDecoded = {
  sub: string;
  iat: number;
  exp: number;
  email: string;
  firstname: string;
  lastname: string;
};

export const initialContext: AuthContextType = {
  user: null,
  isLogged: false,
  isReady: false,
  saveUser: () => {},
  clearUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);

const initializeUser = (): UserType | null => {
  const token = getCookie("token");
  const user = token ? jwtDecode(token) : null;

  if (token && user && "sub" in (user as Record<string, string>)) {
    const { firstname, lastname, email } = user as JWTDecoded;

    return {
      firstname,
      lastname,
      email,
    };
  }

  return null;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(initializeUser());
  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const saveUser = (token: string, user: UserType) => {
    setCookie("token", token);

    setUser({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  };

  const clearUser = () => {
    removeCookie("token");
    setUser(null);
    queryClient.removeQueries();
  };

  useEffect(() => {
    configureAxios({
      onTokenError: () => {
        clearUser();
        navigate("/login");
      },
      onPaymentError: () => {},
    });
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: AuthContextType = {
    user,
    saveUser,
    clearUser,
    isLogged: !!user,
    isReady,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be within AuthProvider");
  }

  return context;
};
