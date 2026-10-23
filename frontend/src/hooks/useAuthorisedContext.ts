import { useContext } from "react";

import AuthorisedContext from "../contexts/AuthorisedContext";

export function useAuthorisedContext() {
  const context = useContext(AuthorisedContext);

  if (context === null) {
    throw new Error("useAuthorisedContext must be used within AuthorisedContext.Provider");
  }

  return context;
}
