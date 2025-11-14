import { NavLink, Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/tokens';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import AuthorisedContext from '../../contexts/AuthorisedContext';
import axiosClient from '../../helpers/axiosClient';
import { getBackendUrl } from '../../helpers/general';

const Navbar = () => {
  const { isAuthorised, setIsAuthorised } = useContext(AuthorisedContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosClient.post(getBackendUrl('logout'), {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      });
    },
    onSuccess: () => {
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN);

      setIsAuthorised(false);
      navigate('/');
      toast('Logged Out!', { type: 'success' });

      // Clears cache
      queryClient.clear();
    },
    onError: (err) => {
      toast('Error logging out', { type: 'error' });
      console.log('Could not log out: ', err);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <nav className='navbar navbar-expand-lg position-sticky top-0'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Moods
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            {!isAuthorised ? (
              <>
                <li className='nav-item'>
                  <NavLink
                    to='/login'
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/register'
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink
                    to='/entries'
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Entries
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/statistics'
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Statistics
                  </NavLink>
                </li>
                <li>
                  <button className='nav-link' onClick={handleClick}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
