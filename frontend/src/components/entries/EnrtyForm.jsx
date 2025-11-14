import { useState, useEffect, useContext } from 'react';
import { Button, Modal, FormControl, FormLabel, RadioGroup, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { cloneDeep } from 'lodash';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import axiosClient from '../../helpers/axiosClient';
import AuthorisedContext from '../../contexts/AuthorisedContext';
import { sentimentMap } from '../../constants/sentimentMap';
import { SENTIMENTS, EMOTIONS, ACTIVITIES } from '../../constants/entryOptions';
import { createEntryDataStructured, getBackendUrl, sortDataByDatesDescending } from '../../helpers/general';
import RadioInput from './RadioInput';
import FormCheckboxSection from './FormCheckboxSection';
import SentimentContext from '../../contexts/SentimentContext';

const EntryForm = ({ entries, setEntries, isModalOpen, setIsModalOpen, dataObject = null }) => {
  const [sentiment, setSentiment] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState(null);
  const [entryDates, setEntryDates] = useState([]);
  const queryClient = useQueryClient();
  const { handleAuthorisation, setIsAuthorised } = useContext(AuthorisedContext);

  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    if (dataObject !== null && isModalOpen) {
      const getNames = (arr) => arr.map((element) => element.name);

      setText(dataObject.text);
      setDate(dayjs(dataObject.date));
      setSentiment(dataObject.sentiment);
      setEmotions(getNames(dataObject.emotions));
      setActivities(getNames(dataObject.activities));
      setContributors(getNames(dataObject.contributors));
    }
  }, [dataObject, isModalOpen]);

  useEffect(() => {
    if (entries) {
      setEntryDates(() => {
        return entries.map((entry) => dayjs(entry.date).format('YYYY-MM-DD'));
      });

      // Updates the query cache for the entries
      queryClient.setQueryData(['entries'], (prev) => {
        if (!prev || entries.length === 0) return;

        const copy = cloneDeep(prev);
        copy.data = entries;

        return copy;
      });

      // Reset the query cache for statistics
      queryClient.removeQueries({ queryKey: ['statistics'] });
    }
  }, [entries, queryClient]);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      return axiosClient.post(getBackendUrl('create'), data);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return axiosClient.put(getBackendUrl('update', data.id), data);
    },
  });

  const handleClose = () => {
    setIsModalOpen(false);

    // If the form is trying to create a new entry, reset form values
    if (dataObject === null) {
      setDate(null);
      setSentiment(null);
      setActivities([]);
      setContributors([]);
      setEmotions([]);
    }
  };

  const handleOnChangeSentiment = (e) => setSentiment(e.target.value);

  const updateEntry = () => {
    const mutationData = createEntryDataStructured(
      emotions,
      activities,
      contributors,
      sentiment,
      text,
      date.format('YYYY-MM-DD'),
      dataObject.id
    );

    handleAuthorisation()
      .then(() => {
        updateMutation.mutate(mutationData, {
          onSuccess: (data) => {
            handleClose();

            setEntries((prev) => {
              const entryIndex = prev.findIndex((item) => item.id === dataObject.id);
              const copy = cloneDeep(prev);
              copy.splice(entryIndex, 1, data.data);

              return copy;
            });

            toast('Entry Updated!', {
              type: 'success',
            });
          },
          onError: (err) => {
            toast('Could not update entry', {
              type: 'error',
            });

            console.log('Could not update entry: ', err);
          },
        });
      })
      .catch(() => {
        setIsAuthorised(false);
      });
  };

  const createEntry = () => {
    const mutationData = createEntryDataStructured(
      emotions,
      activities,
      contributors,
      sentiment,
      text,
      date.format('YYYY-MM-DD')
    );

    handleAuthorisation()
      .then(() => {
        createMutation.mutate(mutationData, {
          onSuccess: (data) => {
            handleClose();
            setEntries((prev) => sortDataByDatesDescending([data.data, ...prev]));

            toast('Entry Created!', {
              type: 'success',
            });
          },
          onError: (err) => {
            toast('Could not create entry', {
              type: 'error',
            });

            console.error('Could not create entry: ', err);
          },
        });
      })
      .catch(() => {
        setIsAuthorised(false);
      });
  };

  const handleSave = () => {
    // If working with an existing entry, update it, otherwise, create a new one
    if (dataObject) {
      updateEntry();
    } else {
      createEntry();
    }
  };

  const saveButtonDisabled = () => {
    return (
      sentiment === null ||
      emotions.length === 0 ||
      activities.length === 0 ||
      contributors.length === 0 ||
      date === null
    );
  };

  const removeEntryItem = (updateFunc, items, itemToRemove) => {
    const existingItemIndex = items.findIndex((item) => item === itemToRemove);
    const copy = [...items];
    copy.splice(existingItemIndex, 1);

    updateFunc(copy);
  };

  const syncContributors = (item) => {
    if (contributors.includes(item)) {
      removeEntryItem(setContributors, contributors, item);
    }
  };

  const handleOnChangeText = (e) => {
    setText(e.target.value);
  };

  const handleOnChangeEmotions = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setEmotions((prev) => [...prev, value]);
    } else {
      removeEntryItem(setEmotions, emotions, value);
      syncContributors(value);
    }
  };

  const handleOnChangeActivities = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setActivities((prev) => [...prev, value]);
    } else {
      removeEntryItem(setActivities, activities, value);
      syncContributors(value);
    }
  };

  const handleOnChangeContributors = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setContributors((prev) => [...prev, value]);
    } else {
      const existingContributorIndex = contributors.findIndex((contributor) => contributor === value);
      const copy = [...contributors];
      copy.splice(existingContributorIndex, 1);

      setContributors(copy);
    }
  };

  const getContributorText = () => {
    if (!sentiment) return 'What contributed the most to your day?';

    const dayText =
      date.format(dateFormat) === dayjs(new Date()).format(dateFormat)
        ? 'today'
        : `this ${date.format('dddd')}`;

    return `What contributed the most to making ${dayText} ${sentimentMap[
      parseInt(sentiment)
    ].toLowerCase()}?`;
  };

  const getSentimentText = () => {
    if (date === null) {
      return 'How was this day?';
    }
    // If the set date is the current date
    if (date.format(dateFormat) === dayjs(new Date()).format(dateFormat)) {
      return 'How was today?';
    }

    return `How was this ${date.format('dddd')}?`;
  };

  const handleDisableDate = (day) => {
    return entryDates.includes(day.format('YYYY-MM-DD'));
  };

  return (
    <SentimentContext.Provider value={sentiment}>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div className='entry-modal'>
          <DatePicker
            label='Select a Date'
            value={date}
            onChange={(value) => setDate(value)}
            shouldDisableDate={handleDisableDate}
            disableFuture
            sx={{ width: '100%' }}
            format='DD/MM/YYYY'
          />
          <div className='entry-form-section'>
            <FormControl component={'fieldset'}>
              <FormLabel className='form-section-title' component={'legend'}>
                {getSentimentText()}
              </FormLabel>
              <RadioGroup value={sentiment} onChange={handleOnChangeSentiment} aria-label='sentiment' row>
                {SENTIMENTS.map((sentimentValue, i) => (
                  <RadioInput key={i} activeValue={sentiment} value={sentimentValue} />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <hr />
          <div className='entry-form-section'>
            <FormCheckboxSection
              labelText='How did you feel?'
              items={emotions}
              onChange={handleOnChangeEmotions}
              options={EMOTIONS}
            />
          </div>
          <hr />
          <div className='entry-form-section'>
            <FormCheckboxSection
              labelText='What did you do?'
              items={activities}
              onChange={handleOnChangeActivities}
              options={ACTIVITIES}
            />
          </div>
          <hr />
          <div className='entry-form-section'>
            <FormCheckboxSection
              labelText={getContributorText()}
              items={contributors}
              onChange={handleOnChangeContributors}
              options={[...emotions, ...activities]}
            />
          </div>
          <div className='entry-form-note'>
            <TextField
              label='Add a note...'
              helperText='Optional'
              onChange={handleOnChangeText}
              fullWidth
              value={text}
            />
          </div>
          <div className='entry-form-btns-container d-flex'>
            <Button
              className='me-2'
              disabled={saveButtonDisabled()}
              onClick={handleSave}
              variant='outlined'
              color='success'
            >
              Save
            </Button>
            <Button onClick={handleClose} color='error' variant='outlined'>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </SentimentContext.Provider>
  );
};

export default EntryForm;
