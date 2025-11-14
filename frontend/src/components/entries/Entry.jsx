import { useState } from 'react';
import dayjs from 'dayjs';
import { Card, CardContent, Typography, Box } from '@mui/material';

import SentimentIcon from '../shared/SentimentIcon';
import { sentimentMap, sentimentClasses } from '../../constants/sentimentMap';
import EntryForm from './EnrtyForm';
import MenuSelect from './MenuSelect';
import DeleteModal from './DeleteModal';
import EntrySection from './EntrySection';

const Entry = ({ entry, setEntries }) => {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOnClick = () => {
    setIsEntryModalOpen(true);
  };

  const sentimentClass = sentimentClasses[entry.sentiment];

  return (
    <div className='entry-container d-flex justify-content-center'>
      <Card
        className={`entry-card d-flex flex-column justify-content-center align-items-center ${sentimentClass.border}`}
        sx={{
          backgroundColor: 'var(--primary-clr-grey)',
          color: 'white',
          borderRadius: '3rem'
        }}
        variant='outlined'
        key={entry.id}
        onClick={handleOnClick}
      >
        <CardContent className='w-100'>
          <Box className='d-flex w-100 align-items-center'>
            <Typography variant='body1' className='entry-display-date'>{dayjs(new Date(entry.date)).format('ddd, D MMMM YYYY')}</Typography>
            <MenuSelect
              setOpenEntry={setIsEntryModalOpen}
              setOpenDeleteModal={setIsDeleteModalOpen}
              additionalClasses={['ms-auto']}
            />
          </Box>
          <hr className='entry-card-separator' />
          <Box className='sentiment-entry d-flex w-100'>
            <SentimentIcon
              sentiment={entry.sentiment}
              additionalClasses={['icon-medium', 'entry-sentiment-icon', sentimentClass.text]}
            />
            <Typography className={`entry-sentiment-title ${sentimentClass.text}`} variant='h2' sx={{ fontWeight: 'bold' }}>
              {sentimentMap[entry.sentiment]}
            </Typography>
          </Box>
          <EntrySection title={'Contributors'} items={entry.contributors} />
          <EntrySection title={'Emotions'} items={entry.emotions} />
          <EntrySection title={'Activities'} items={entry.activities} />
          <Typography variant='body1'>{entry.text}</Typography>
        </CardContent>
      </Card>
      <EntryForm
        setEntries={setEntries}
        isModalOpen={isEntryModalOpen}
        setIsModalOpen={setIsEntryModalOpen}
        dataObject={entry}
      />
      <DeleteModal
        entry={entry}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setEntries={setEntries}
      />
    </div>
  );
};

export default Entry;
