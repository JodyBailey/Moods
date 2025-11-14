import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Box, Typography, FormControl, Input, Button } from '@mui/material';

import axiosClient from '../helpers/axiosClient';
import { getBackendUrl, snakifyObject } from '../helpers/general';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/tokens';
import AuthorisedContext from '../contexts/AuthorisedContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setIsAuthorised } = useContext(AuthorisedContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => await axiosClient.post(getBackendUrl('login'), data),
  });

  const handleOnChange = (e) => {
    setFormData((prev) => {
      const inputName = e.target.name;

      return {
        ...prev,
        [inputName]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();

    mutation.mutate(snakifyObject(formData), {
      onSuccess: (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.data.access);
        localStorage.setItem(REFRESH_TOKEN, data.data.refresh);

        setIsAuthorised(true);
        navigate('/');

        toast('Logged in!', {
          type: 'success',
        });
      },
      onError: () => {
        toast('Invalid username or password', { type: 'error', position: 'top-center' });
      },
    });
  };

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <Typography variant='h2' className='authenticate-title text-center m-4'>
        Login
      </Typography>
      <form className='authenticate-form  d-flex flex-column' onSubmit={handleSubmit}>
        <FormControl className='mb-3'>
          <Input
            required
            autoFocus
            autoComplete='off'
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl className='mb-3'>
          <Input
            required
            autoFocus
            autoComplete='off'
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleOnChange}
          />
        </FormControl>
        <Button sx={{ textTransform: 'none' }} className='submit-btn' variant='contained' type='submit'>
          Login
        </Button>
      </form>
      <Typography variant='body1' textAlign={'center'}>
        Register for an account <Link to='/register'>here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
