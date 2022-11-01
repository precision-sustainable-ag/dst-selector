import React from 'react';
import {
  Typography,
} from '@mui/material';
import '../../../../styles/cropComparisonView.scss';
import '../../../../styles/MyCoverCropComparisonComponent.scss';

const RenderSeedingData = ({ filterKey, data }) => {
  if (data[filterKey]) {
    return <Typography variant="body2">Yes</Typography>;
  }
  return <Typography variant="body2">N/A</Typography>;
};

export default RenderSeedingData;
