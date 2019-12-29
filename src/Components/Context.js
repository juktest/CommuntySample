import React, { createContext, useState } from "react";

export const GlobalUnivContext = createContext();

const Context = ({ children }) => {
  const [GlobalUniv, setGlobalUniv] = useState("");
  const [PageError, setPageError] = useState(false);
  const [LastList, setLastList] = useState("");
  const [Message, setMessage] = useState(false);

  return (
    <GlobalUnivContext.Provider
      value={{
        univ: GlobalUniv,
        setUniv: setGlobalUniv,
        error: PageError,
        setError: setPageError,
        Message: Message,
        setMessage: setMessage
      }}
    >
      {children}
    </GlobalUnivContext.Provider>
  );
};

export default Context;
