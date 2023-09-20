import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, Tooltip } from '@mui/material';
import { CustomStyles, getRating, LightButton } from '../../../shared/constants';
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

  const selectedBtns = selectedCropsRedux.map((cropId) => cropId.id);

  const cropModifierAction = (selectedCrops, message) => {
    dispatchRedux(selectedCropsModifier(selectedCrops));
    dispatchRedux(snackHandler({ snackOpen: true, snackMessage: message }));
  };

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    const selectedCrops = {};
    let cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.btnId = btnId;
    selectedCrops.data = cropData;
    cropArray = selectedCrops;

    // check if crop id exists inside state, if yes then remove it
    if (selectedCropsRedux.length > 0) {
      let removeIndex = -1;
      selectedCropsRedux.forEach((item, i) => {
        if (item.id === cropId) {
          removeIndex = i;
        }
      });
      if (removeIndex === -1) {
        cropModifierAction([...selectedCropsRedux, selectedCrops], `${cropName} Added`);
      } else {
        // element exists, remove
        const selectedCropsCopy = selectedCropsRedux;
        selectedCropsCopy.splice(removeIndex, 1);
        cropModifierAction(selectedCropsCopy, `${cropName} Removed`);
      }
    } else {
      dispatchRedux(myCropListLocation({ from: 'selector' }));

      cropModifierAction([cropArray], `${cropName} Added`);
    }
  };

  return (
    <>
      {selectedGoalsRedux.length > 0
        && selectedGoalsRedux.map((goal, index) => (
          <TableCell style={{ textAlign: 'center' }} key={index} className="goalCells">
            <div>
              <Tooltip
                arrow
                placement="bottom"
                title={(
                  <div className="filterTooltip text-capitalize">
                    <p>
                      {`Goal ${index + 1}`}
                      {': '}
                      {goal}
                    </p>
                  </div>
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
                `cartBtn${indexKey}`,
                crop,
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
