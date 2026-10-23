import { Skeleton } from '@mui/material';

const GenericLoadingPlaceholder = () => {
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
        <Skeleton width='90%' variant='rounded' className='generic-loading-placeholder-container'>
          <div className='generic-loading-placeholder'></div>
        </Skeleton>
    </div>
  );
};

export default GenericLoadingPlaceholder;