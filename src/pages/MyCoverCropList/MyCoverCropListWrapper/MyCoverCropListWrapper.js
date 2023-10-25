/*
  Top level wrapper for the cover crop list
  Contains the CoverCropList component and the CropSidebar component
*/

import { Grid } from '@mui/material';
import React, { useState } from 'react';
import CropSidebar from '../../CropSidebar/CropSidebar';
import MyCoverCropList from '../MyCoverCropList';

const MyCoverCropListWrapper = () => {
  const [comparisonView, setComparisonView] = useState(false);
  const toggleComparisonView = () => {
    setComparisonView(!comparisonView);
  };
  return (
    <Grid container spacing={3} mt={1} mr={1} ml={1} mb={1}>
      {/* <Grid container spacing={5}> */}
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <CropSidebar
          comparisonView={comparisonView}
          toggleComparisonView={toggleComparisonView}
          from="myCoverCropListStatic"
        />
      </Grid>
      <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
        <MyCoverCropList from="myCoverCropListStatic" comparisonView={comparisonView} />
      </Grid>
    </Grid>
  );
};

export default MyCoverCropListWrapper;
