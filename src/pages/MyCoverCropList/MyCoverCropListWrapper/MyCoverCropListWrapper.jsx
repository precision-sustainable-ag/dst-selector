/*
  Top level wrapper for the cover crop list
  Contains the CoverCropList component and the CropSidebar component
*/

import { Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSidebarWidth } from '../../../reduxStore/pageSlice';
import CropSidebar from '../../CropSidebar/CropSidebar';
import MyCoverCropList from '../MyCoverCropList';

const MyCoverCropListWrapper = () => {
  const [comparisonView, setComparisonView] = useState(true);

  const sidebarRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (sidebarRef.current) {
      dispatchRedux(setSidebarWidth(sidebarRef.current.offsetWidth));
    }
  }, [dispatchRedux]);
  return (
    <Grid container spacing={5}>
      <Grid
        ref={sidebarRef}
        size={{
          xl: 3,
          lg: 3,
          md: 3,
          sm: 12,
          xs: 12,
        }}
      >
        <CropSidebar
          comparisonView={comparisonView}
          setComparisonView={setComparisonView}
          from="myCoverCropListStatic"
        />
      </Grid>
      <Grid
        size={{
          xl: 9,
          lg: 9,
          md: 9,
          sm: 12,
          xs: 12,
        }}
      >
        <MyCoverCropList from="myCoverCropListStatic" comparisonView={comparisonView} />
      </Grid>
    </Grid>
  );
};

export default MyCoverCropListWrapper;
