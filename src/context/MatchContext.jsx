import React, { createContext, useContext, useState } from "react";

const MatchCtx = createContext(null);
export const useMatch = () => useContext(MatchCtx);

export const MatchProvider = ({ children }) => {
  const [info, setInfo] = useState(null);   // { age, gender, pref }

  return (
    <MatchCtx.Provider value={{ info, setInfo }}>
      {children}
    </MatchCtx.Provider>
  );
};
