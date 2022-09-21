import React from 'react';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropTableListItem from './CropTableListItem';

const CropDataRender = ({ activeCropData, showGrowthWindow, handleModalOpen }) => (
  <>
    <CropTableListItem
      matchGoals
      activeCropData={activeCropData}
      showGrowthWindow={showGrowthWindow}
      handleModalOpen={handleModalOpen}
    />
    <CropTableListItem
      matchGoals={false}
      activeCropData={activeCropData}
      showGrowthWindow={showGrowthWindow}
      handleModalOpen={handleModalOpen}
    />
  </>
);

export default CropDataRender;
