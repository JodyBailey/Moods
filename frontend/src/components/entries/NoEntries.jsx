import { Box, Typography, Button } from '@mui/material';
import GenericIcon from '../shared/GenericIcon';

const NoEntries = ({ onClick }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <GenericIcon name={'search'} additionalClasses={['no-entries-icon', 'icon-medium']} />
      <Typography variant='h4'>You currently have no entries</Typography>
      <Button id='no-entries-create-btn' onClick={onClick}>
        Create your first entry!
      </Button>
    </Box>
  );
};

export default NoEntries;
