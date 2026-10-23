import { useEffect } from "react";
import { Navigate } from "react-router";

import { useAuthorisedContext } from "../../hooks/useAuthorisedContext";
import GenericLoadingPlaceholder from "./GenericLoadingPlaceholder";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthorised, setIsAuthorised, handleAuthorisation } = useAuthorisedContext();

  useEffect(() => {
    handleAuthorisation().catch(() => setIsAuthorised(false));
  }, [handleAuthorisation, setIsAuthorised]);

  if (isAuthorised === null) {
    return <GenericLoadingPlaceholder />;
  }

  return isAuthorised ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
