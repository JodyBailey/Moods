import { PieChart } from '@mui/x-charts';
import { Typography } from '@mui/material';

import { tooltipSlotProp } from '../../constants/tooltip';

const StatisticsPieChart = ({ itemCount, title }) => {
  return (
    <div className='chart-container'>
      <div className='pie-chart' style={{ border: '1px solid white' }}>
        <Typography className='pie-chart-title' width={'100%'} variant='h2' textAlign={'center'}>
          {title}
        </Typography>
        <PieChart
          series={[
            {
              arcLabel: 'value',
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
