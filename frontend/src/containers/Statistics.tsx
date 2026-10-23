import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";

import axiosClient from "../helpers/axiosClient";
import AuthWrapper from "../components/shared/AuthWrapper";
import MainContributors from "../components/statistics/MainContributors";
import AverageMood from "../components/statistics/AverageMood";
import StatisticsPieChart from "../components/statistics/StatisticsPieChart";
import GenericLoadingPlaceholder from "../components/shared/GenericLoadingPlaceholder";
import MoodChart from "../components/statistics/MoodChart";
import Error from "../components/shared/Error";
import StatisticsBarChart from "../components/statistics/StatisticsBarChart";
import NoStatistics from "../components/statistics/NoStatistics";

import type { StatisticsType } from "../helpers/general";
import { getBackendUrl } from "../helpers/general";
import { sentimentColorVariables, type SentimentScore } from "../constants/sentimentMap";

const Statistics = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => {
      return axiosClient.get<StatisticsType>(getBackendUrl("statistics"));
    },
  });

  if (isPending) {
    return (
      <AuthWrapper>
        <GenericLoadingPlaceholder />
      </AuthWrapper>
    );
  }

  if (isError) {
    console.error("Error fetching statistics:", error);

    return (
      <AuthWrapper>
        <Error />
      </AuthWrapper>
    );
  }

  const statistics = data.data;

  if ("error" in statistics) {
    return (
      <AuthWrapper>
        <NoStatistics />
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <Box>
        <AverageMood averageMoodScore={statistics.averageMoodScore} />
        <MoodChart
          moodTimeline={statistics.averageMoodTimeline}
          averageMoodScore={Math.round(statistics.averageMoodScore) as SentimentScore}
        />
        <div className="main-contributors-container d-flex justify-content-center mt-5">
          <MainContributors
            title="Negative Mood Contributor(s)"
            contributors={statistics.mainContributors.bottom}
            borderColor={sentimentColorVariables[1]}
          />
          <MainContributors
            title="Positive Mood Contributor(s)"
            contributors={statistics.mainContributors.top}
            borderColor={sentimentColorVariables[9]}
          />
        </div>
        <StatisticsBarChart
          itemCount={statistics.contributorsCount}
          title="Contributors"
          xLabel="Frequency"
          yLabel="Contributors"
          color="forestgreen"
        />
        <div className="emotions-and-activities-container my-5">
          <div className="pie-chart-container d-flex justify-content-center align-items-center">
            <StatisticsPieChart itemCount={statistics.emotionsCount} title="Emotions" />
            <StatisticsPieChart itemCount={statistics.activitiesCount} title="Activites" />
          </div>
        </div>
      </Box>
    </AuthWrapper>
  );
};

export default Statistics;
