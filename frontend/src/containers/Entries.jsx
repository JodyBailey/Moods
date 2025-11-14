import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBackendUrl } from '../helpers/general';
import axiosClient from '../helpers/axiosClient';
import AuthWrapper from '../components/shared/AuthWrapper';
import EntryForm from '../components/entries/EnrtyForm';
import Entry from '../components/entries/Entry';
import EntriesPlaceholder from '../components/entries/EntriesPlaceholder';
import CreateEntryButton from '../components/entries/CreateEntryButton';
import NoEntries from '../components/entries/NoEntries';
import Error from '../components/shared/Error';

const Entries = () => {
  const { isError, data, isSuccess } = useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      return axiosClient.get(getBackendUrl('entries'));
    },
  });

  const [isEntriesAvailable, setIsEntriesAvailable] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setEntries(() => [...data.data]);
      setIsEntriesAvailable(true);
    }
  }, [isSuccess, data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AuthWrapper>
      {!isEntriesAvailable && <EntriesPlaceholder />}
      {isEntriesAvailable &&
        entries.length > 0 &&
        entries.map((entry, i) => <Entry entry={entry} setEntries={setEntries} key={i} />)}
      {isEntriesAvailable && entries.length === 0 && <NoEntries onClick={openModal} />}
      {isError && <Error />}
      <CreateEntryButton onClick={openModal} />
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </AuthWrapper>
  );
};

export default Entries;
