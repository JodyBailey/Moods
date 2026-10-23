import { createContext, type SetStateAction, type Dispatch } from "react";

type AuthorisedContextValue = {
  isAuthorised: boolean | null;
  setIsAuthorised: Dispatch<SetStateAction<boolean | null>>;
  handleAuthorisation: () => Promise<void>;
};

const AuthorisedContext = createContext<AuthorisedContextValue | null>(null);

export default AuthorisedContext;
