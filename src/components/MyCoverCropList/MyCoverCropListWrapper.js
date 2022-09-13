/*
  Top level wrapper for the cover crop list
  Contains the CoverCropList component and the CropSidebar component
*/

import { Box } from '@mui/material';
import React, { useState } from 'react';
import CropSidebarComponent from '../CropSelector/CropSidebar';
import Header from '../Header/Header';
import MyCoverCropList from './MyCoverCropList';

function MyCoverCropListWrapper() {
  const [comparisonView, setComparisonView] = useState(false);
  const toggleComparisonView = () => {
    setComparisonView(!comparisonView);
  };
  return (
    <Box>
      <Header />

      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12  col-md-2">
            <div className="row">
              <div className="col-12">
                <CropSidebarComponent
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
      </div>
    </Box>
  );
}

export default MyCoverCropListWrapper;
