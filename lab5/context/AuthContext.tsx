import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../types";

interface User {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const login = (email: string, password: string): boolean => {
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (found) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      return false;
    }
    setUsers((prev) => [...prev, { name, email, password }]);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
