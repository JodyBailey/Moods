import { Modal, Typography, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import axiosClient from '../../helpers/axiosClient';
import { getBackendUrl } from '../../helpers/general';
import { toast } from 'react-toastify';

const DeleteModal = ({ isModalOpen, setIsModalOpen, entry, setEntries }) => {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axiosClient.delete(getBackendUrl('delete', entry.id));
    },
  });

  const queryClient = useQueryClient();

  const formattedDate = dayjs(entry.date).format('D MMMM YYYY');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnClickDelete = () => {
    deleteMutation.mutate(
      {},
      {
        onSuccess: () => {
          setEntries((prev) => {
            const entryIndex = prev.findIndex((item) => item.id === entry.id);
            const entriesCopy = cloneDeep(prev);
            entriesCopy.splice(entryIndex, 1);

            // Remove entry from cache by updating it
            queryClient.setQueryData(['entries'], (prev) => {
              const cacheCopy = cloneDeep(prev);

              cacheCopy.data = entriesCopy;

              return cacheCopy;
            });
            
            // Reset the query cache for statistics
            queryClient.removeQueries({ queryKey: ['statistics'] });

            return entriesCopy;
          });


          toast('Enrtry Deleted!', {
            type: 'success',
          });
        },
        onError: (err) => {
          console.log('Could not delete item: ', err);

          toast('Could not delete entry', { type: 'error' });
        },
        onSettled: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleOnClickCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div class='delete-entry-modal'>
        <Typography variant='body1' className='delete-entry-text'>
          Are you sure you want to delete this entry created on {formattedDate}?
        </Typography>
        <div display={'flex'}>
          <Button className='cancel-delete-btn p-1 me-2' variant='outlined' onClick={handleOnClickCancel}>
            Cancel
          </Button>
          <Button
            className='delete-entry-btn p-1'
            variant='outlined'
            color='error'
            onClick={handleOnClickDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
