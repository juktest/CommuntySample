import React, { createContext, useState } from "react";

export const GlobalUnivContext = createContext();

const Context = ({ children }) => {
  const [GlobalUniv, setGlobalUniv] = useState("");
  const [PageError, setPageError] = useState(false);
  const [LastList, setLastList] = useState("");

  return (
    <GlobalUnivContext.Provider
      value={{
        univ: GlobalUniv,
        setUniv: setGlobalUniv,
        error: PageError,
        setError: setPageError
      }}
    >
      {children}
    </GlobalUnivContext.Provider>
  );
};

export default Context;
