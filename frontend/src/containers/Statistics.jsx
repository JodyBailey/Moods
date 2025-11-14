import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

import axiosClient from '../helpers/axiosClient';
import AuthWrapper from '../components/shared/AuthWrapper';
import MainContributors from '../components/statistics/MainContributors';
import AverageMood from '../components/statistics/AverageMood';
import StatisticsPieChart from '../components/statistics/StatisticsPieChart';
import GenericLoadingPlaceholder from '../components/shared/GenericLoadingPlaceholder';
import MoodChart from '../components/statistics/MoodChart';
import Error from '../components/shared/Error';
import StatisticsBarChart from '../components/statistics/StatisticsBarChart';
import NoStatistics from '../components/statistics/NoStatistics';
import { getBackendUrl } from '../helpers/general';
import { sentimentColorVariables } from '../constants/sentimentMap';

const Statistics = () => {
  const { isSuccess, data, isError, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => {
      return axiosClient.get(getBackendUrl('statistics'));
    },
  });

  const [statistics, setStatistics] = useState({});
  const [isStatsAvailable, setIsStatsAvailable] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      console.log('data: ', data.data);

      setStatistics(data.data);
      setIsStatsAvailable(true);
    } else if (isError) {
      console.log('error: ', error);
    }
  }, [isSuccess, data, isError, error]);

  return (
    <AuthWrapper>
      {!isStatsAvailable && <GenericLoadingPlaceholder />}
      {isSuccess && isStatsAvailable && !statistics.error && (
        <Box>
          <AverageMood averageMoodScore={statistics.averageMoodScore} />
          <MoodChart
            moodTimeline={statistics.averageMoodTimeline}
            averageMoodScore={Math.round(statistics.averageMoodScore)}
          />
          <div className='main-contributors-container d-flex justify-content-center mt-5'>
            <MainContributors
              title='Negative Mood Contributor(s)'
              contributors={statistics.mainContributors.bottom}
              borderColor={sentimentColorVariables[1]}
            />
            <MainContributors
              title='Positive Mood Contributor(s)'
              contributors={statistics.mainContributors.top}
              borderColor={sentimentColorVariables[9]}
            />
          </div>
          <StatisticsBarChart
            itemCount={statistics.contributorsCount}
            title='Contributors'
            xLabel='Frequency'
            yLabel='Contributors'
            color='forestgreen'
          />
          <div className='emotions-and-activities-container my-5'>
            <div className='pie-chart-container d-flex justify-content-center align-items-center'>
              <StatisticsPieChart itemCount={statistics.emotionsCount} title='Emotions' />
              <StatisticsPieChart itemCount={statistics.activitiesCount} title='Activites' />
            </div>
          </div>
        </Box>
      )}
      {isError && <Error />}
      {statistics.error && <NoStatistics />}
    </AuthWrapper>
  );
};

export default Statistics;
