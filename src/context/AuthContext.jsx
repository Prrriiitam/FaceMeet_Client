import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // null ⇔ not logged in

  // Read existing JWT once on page load
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) setUser({ token });
  }, []);

  const login  = (jwt, userObj) => {
    sessionStorage.setItem("authToken", jwt);
    setUser({ ...userObj, token: jwt });
  };
  const logout = () => {
    sessionStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, isAuth: !!user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};
