import React from 'react';
import '../../styles/cropCalendarViewComponent.scss';
import '../../styles/cropTable.scss';
import CropTableListItem from './CropTableListItem';

function CropDataRender({ activeCropData, showGrowthWindow, handleModalOpen }) {
  return (
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
}

export default CropDataRender;
