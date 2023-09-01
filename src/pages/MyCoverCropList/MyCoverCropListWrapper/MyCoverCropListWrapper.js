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
    <Grid container spacing={5}>

      {/* <Grid container spacing={5}> */}
      <Grid item xl={3} lg={3} md={3}>
        <CropSidebar
          comparisonView={comparisonView}
          toggleComparisonView={toggleComparisonView}
          from="myCoverCropListStatic"
        />
      </Grid>
      <Grid item xl={9} lg={9} md={9}>
        <MyCoverCropList from="myCoverCropListStatic" comparisonView={comparisonView} />
      </Grid>
      {/* </Grid> */}

      {/* <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12  col-md-2">
            <div className="row">
              <div className="col-12">
                <CropSidebar
                  comparisonView={comparisonView}
                  toggleComparisonView={toggleComparisonView}
                  from="myCoverCropListStatic"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-10">
            <MyCoverCropList from="myCoverCropListStatic" comparisonView={comparisonView} />
          </div>
        </div>
      </div> */}
    </Grid>
  );
};

export default MyCoverCropListWrapper;
