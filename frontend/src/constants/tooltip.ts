import { chartsTooltipClasses } from '@mui/x-charts';

export const tooltipSlotProp = {
  sx: {
    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.paper}`]: {
      backgroundColor: 'white',
    },
    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]: {
      color: 'black',
    },
    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]: {
      color: 'black',
    },
  },
};