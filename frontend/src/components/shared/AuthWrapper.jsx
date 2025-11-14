import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router';

import AuthorisedContext from '../../contexts/AuthorisedContext';
import GenericLoadingPlaceholder from './GenericLoadingPlaceholder';

const AuthWrapper = ({ children }) => {
  const { isAuthorised, setIsAuthorised, handleAuthorisation } = useContext(AuthorisedContext);

  useEffect(() => {
    handleAuthorisation().catch(() => setIsAuthorised(false));
  }, [handleAuthorisation, setIsAuthorised])

  if (isAuthorised === null) {
    return <GenericLoadingPlaceholder />;
  }

  return isAuthorised ? children : <Navigate to='/login' />;
};

export default AuthWrapper;
