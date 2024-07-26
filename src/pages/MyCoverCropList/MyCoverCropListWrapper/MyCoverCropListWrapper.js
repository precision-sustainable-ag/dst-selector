/*
  Top level wrapper for the cover crop list
  Contains the CoverCropList component and the CropSidebar component
*/

import { Grid } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CropSidebar from '../../CropSidebar/CropSidebar';
import MyCoverCropList from '../MyCoverCropList';
import { setSidebarWidth } from '../../../reduxStore/pageSlice';
import pirschAnalytics from '../../../shared/analytics';

const MyCoverCropListWrapper = () => {
  const [comparisonView, setComparisonView] = useState(false);

  useEffect(() => {
    pirschAnalytics(comparisonView ? 'Selected Crops: Comparison View' : 'Selected Crops: Crop List');
  }, [comparisonView]);

  const sidebarRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (sidebarRef.current) {
      dispatchRedux(setSidebarWidth(sidebarRef.current.offsetWidth));
    }
  }, [dispatchRedux, sidebarRef]);
  return (
    <Grid container spacing={5}>
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12} ref={sidebarRef}>
        <CropSidebar
          comparisonView={comparisonView}
          setComparisonView={setComparisonView}
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
