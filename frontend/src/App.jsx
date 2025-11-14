import { Route, Routes } from 'react-router';
import { useState, useCallback, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { jwtDecode } from 'jwt-decode';

import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/tokens';
import axiosClient from './helpers/axiosClient';
import { getBackendUrl } from './helpers/general';
import Login from './containers/Login';
import Entries from './containers/Entries';
import Home from './containers/Home';
import Register from './containers/Register';
import AuthorisedContext from './contexts/AuthorisedContext';
import Statistics from './containers/Statistics';
import Navbar from './components/shared/Navbar';

function App() {
  const [isAuthorised, setIsAuthorised] = useState(null);
  const handleAuthorisation = useCallback(async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!accessToken || !refreshToken) {
        setIsAuthorised(false);
      }

      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp <= currentTime) {
        try {
          const response = await axiosClient.post(getBackendUrl('refresh'), {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorised(true);
          } else {
            setIsAuthorised(false);
            console.log(`Error getting refresh token: ${response}`);
          }
        } catch (err) {
          setIsAuthorised(false);
          console.log(`Error gettin refresh token: ${err}`);
        }
      } else {
        setIsAuthorised(true);
      }
  }, [setIsAuthorised])

  useEffect(() => {
    handleAuthorisation();
  }, [handleAuthorisation])

  return (
    <AuthorisedContext.Provider value={{ isAuthorised, setIsAuthorised, handleAuthorisation }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/entries' element={<Entries />}/>
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </LocalizationProvider>
    </AuthorisedContext.Provider>
  );
}

export default App;
