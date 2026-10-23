import { Box, Typography } from '@mui/material';
import GenericIcon from '../shared/GenericIcon';
import { Link } from 'react-router';

const NoStatistics = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <GenericIcon name={'search'} additionalClasses={['no-entries-icon', 'icon-medium']} />
      <Typography variant='h4'>You currently have no statistics</Typography>
      <Typography variant='body1'>
        Go create your first entry on the <Link to='/entries'>entries page</Link>!
      </Typography>
    </Box>
  );
};

export default NoStatistics;
