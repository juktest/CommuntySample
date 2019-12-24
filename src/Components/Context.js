import React, { createContext, useState } from "react";

export const GlobalUnivContext = createContext();

const Context = ({ children }) => {
  const [GlobalUniv, setGlobalUniv] = useState("");
  return (
    <GlobalUnivContext.Provider
      value={{ univ: GlobalUniv, setUniv: setGlobalUniv }}
    >
      {children}
    </GlobalUnivContext.Provider>
  );
};

export default Context;
