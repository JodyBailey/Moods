import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

import { tooltipSlotProp } from '../../constants/tooltip';

const StatisticsBarChart = ({ itemCount, title, xLabel, yLabel, color }) => {
  return (
    <div className='statistics-line-chart-container'>
      <Typography className='bar-chart-title' variant='h4' textAlign={'center'}>
        {title}
      </Typography>
      <BarChart
        layout='horizontal'
        yAxis={[{ data: Object.keys(itemCount), label: yLabel, width: 120 }]}
        xAxis={[{ label: xLabel }]}
        series={[{ data: Object.values(itemCount), color }]}
        barLabel='value'
        height={600}
        slotProps={{
          tooltip: tooltipSlotProp,
        }}
      />
    </div>
  );
};

export default StatisticsBarChart;
