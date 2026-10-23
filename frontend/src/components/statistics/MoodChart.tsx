import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

import { tooltipSlotProp } from "../../constants/tooltip";
import { sentimentColorVariables, type SentimentScore } from "../../constants/sentimentMap";

type MoodChartProps = {
  moodTimeline: { date: string; average: number }[];
  averageMoodScore: SentimentScore;
};

const MoodChart = ({ moodTimeline, averageMoodScore }: MoodChartProps) => {
  return (
    <div className="average-mood-timeline-container">
      <Typography className="mood-chart-title" variant="h4" textAlign={"center"}>
        Mood Chart
      </Typography>
      <LineChart
        xAxis={[
          {
            data: moodTimeline.map((entry) => dayjs(entry.date).format("D MMM YYYY")),
            scaleType: "band",
            label: "Date",
            tickPlacement: "middle",
          },
        ]}
        series={[
          {
            data: moodTimeline.map((entry) => entry.average),
            area: true,
            color: sentimentColorVariables[averageMoodScore],
          },
        ]}
        yAxis={[{ label: "Average Mood Score" }]}
        height={300}
        slotProps={{
          tooltip: tooltipSlotProp,
        }}
      />
    </div>
  );
};

export default MoodChart;
