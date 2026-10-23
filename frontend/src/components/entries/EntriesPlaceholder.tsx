import { Skeleton } from '@mui/material';

const EntriesPlaceholder = () => {
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} width='50%' variant='rounded' className='entries-loading-placeholder-container'>
            <div className='entries-loading-placeholder'></div>
          </Skeleton>
        ))}
    </div>
  );
};

export default EntriesPlaceholder;
