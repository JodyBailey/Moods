import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

import { tooltipSlotProp } from "../../constants/tooltip";
import type { ActivityType, EmotionType } from "../../constants/entryOptions";

type StatisticsPieChartProps = {
  itemCount: Partial<Record<ActivityType, number>> | Partial<Record<EmotionType, number>>;
  title: string;
};

const StatisticsPieChart = ({ itemCount, title }: StatisticsPieChartProps) => {
  console.log(title, itemCount, Object.keys(itemCount).length);
  return (
    <div className="chart-container" data-chart-title={title}>
      <div className="pie-chart" style={{ border: "1px solid white" }}>
        <Typography className="pie-chart-title" width={"100%"} variant="h2" textAlign={"center"}>
          {title}
        </Typography>
        <PieChart
          series={[
            {
              arcLabel: "value",
              arcLabelMinAngle: 12,
              data: Object.entries(itemCount).map((entry, i) => {
                return { id: i, value: entry[1], label: entry[0] };
              }),
            },
          ]}
          height={350}
          slotProps={{
            tooltip: tooltipSlotProp,
          }}
        />
      </div>
    </div>
  );
};

export default StatisticsPieChart;
