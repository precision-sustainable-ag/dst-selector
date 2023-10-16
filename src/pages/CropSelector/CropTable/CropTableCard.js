import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, Tooltip } from '@mui/material';
import {
  addCropToBasket, CustomStyles, getRating, LightButton,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';

const CropTableCard = ({
  crop, indexKey, showGrowthWindow, handleModalOpen,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  const selectedBtns = selectedCropsRedux;

  // TODO: Update SelectedCropsRedux

  return (
    <>
      {selectedGoalsRedux.length > 0
        && selectedGoalsRedux.map((goal, index) => (
          <TableCell style={{ textAlign: 'center' }} key={index} className="goalCells">
            <div>
              <Tooltip
                arrow
                placement="bottom"
                enterTouchDelay={0}
                title={(
                  <p>
                    {`Goal ${index + 1}`}
                    {': '}
                    {goal}
                  </p>
                )}
              >
                {getRating(crop.data.Goals[goal]?.values[0])}
              </Tooltip>
            </div>
          </TableCell>
        ))}

      {showGrowthWindow && (
        <TableCell style={{ width: selectedGoalsRedux.length === 0 && '50%' }}>
          <CropSelectorCalendarView data={crop} from="listView" />
        </TableCell>
      )}

      <TableCell style={{ maxWidth: '150px', textAlign: 'center' }}>
        <div className="d-flex w-100 justify-content-center align-items-center flex-column">
          <LightButton
            id={`cartBtn${indexKey}`}
            style={{
              borderRadius: CustomStyles().nonRoundedRadius,
              width: '150px',
            }}
            className={selectedBtns.includes(crop.id) ? 'activeCartBtn' : 'inactiveCartBtn'}
            onClick={() => {
              addCropToBasket(
                crop.id,
                crop.label,
                dispatchRedux,
                snackHandler,
                selectedCropsModifier,
                selectedCropsRedux,
                myCropListLocation,
              );
            }}
          >
            {selectedBtns.includes(crop.id) ? 'REMOVE' : 'ADD TO LIST'}
          </LightButton>
          {' '}
          <Button size="small" onClick={() => handleModalOpen(crop)}>
            View Details
          </Button>
        </div>
      </TableCell>
    </>
  );
};

export default CropTableCard;
