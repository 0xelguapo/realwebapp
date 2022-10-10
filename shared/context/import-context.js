import { useState } from 'react'
import { createContext } from "react";

const ImportContext = createContext();

function ImportContextProvider({children}) {

  return (<ImportContext.Provider value={{}}>
    {children}
  </ImportContext.Provider>)
}

function useImport() {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error("useClients must be used within ImportContextProvider");
  }
  return context;
}

export { useImport, ImportContextProvider}