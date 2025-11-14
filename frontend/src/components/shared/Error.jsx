import { Box, Typography } from '@mui/material';
import GenericIcon from './GenericIcon';

const Error = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <GenericIcon name={'error'} additionalClasses={['error-icon', 'icon-medium']} />
      <Typography className='error-title' variant='h4' textAlign={'center'}>We encountered an unexpected error</Typography>
      <Typography className='error-text' variant='body1' textAlign={'center'}>You can try refreshing the page or re-logging in</Typography>
    </Box>
  );
};

export default Error;
