import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  const selectedBtns = selectedCropsRedux;

  // TODO: Update SelectedCropsRedux

  const addCropToBasket = (cropId, cropName) => {
    const selectedCrops = cropId;

    const buildDispatch = (action, crops) => {
      dispatchRedux(selectedCropsModifier(crops));
      dispatchRedux(snackHandler({ snackOpen: false, snackMessage: `${cropName} ${action}` }));
      enqueueSnackbar(`${cropName} ${action}`);
    };

    if (selectedCropsRedux?.length > 0) {
      // DONE: Remove crop from basket
      let removeIndex = -1;
      selectedCropsRedux.forEach((item, i) => {
        if (item === cropId) {
          removeIndex = i;
        }
      });
      if (removeIndex === -1) {
        // element not in array
        buildDispatch('added', [...selectedCropsRedux, selectedCrops]);
      } else {
        const selectedCropsCopy = selectedCropsRedux;
        selectedCropsCopy.splice(removeIndex, 1);

        buildDispatch('Removed', selectedCropsCopy);
      }
    } else {
      dispatchRedux(myCropListLocation({ from: 'selector' }));
      buildDispatch('Added', [selectedCrops]);
    }
  };

  // const cropModifierAction = (selectedCrops, message) => {
  //   dispatchRedux(selectedCropsModifier(selectedCrops));
  //   dispatchRedux(snackHandler({ snackOpen: false, snackMessage: message }));
  //   enqueueSnackbar(message);
  // };

  // // same function in ExplorerCardView move to constants
  // const addCropToBasket = (cropId, cropName) => {
  //   const selectedCrops = cropId;
  //   let cropArray = [];
  //   cropArray = selectedCrops;
  //   // check if crop id exists inside state, if yes then remove it
  //   if (selectedCropsRedux.length > 0) {
  //     let removeIndex = -1;
  //     selectedCropsRedux.forEach((item, i) => {
  //       if (item === cropId) {
  //         removeIndex = i;
  //       }
  //     });
  //     if (removeIndex === -1) {
  //       cropModifierAction([...selectedCropsRedux, selectedCrops], `${cropName} Added`);
  //     } else {
  //       // element exists, remove
  //       const selectedCropsCopy = selectedCropsRedux;
  //       selectedCropsCopy.splice(removeIndex, 1);
  //       cropModifierAction(selectedCropsCopy, `${cropName} Removed`);
  //     }
  //   } else {
  //     dispatchRedux(myCropListLocation({ from: 'selector' }));
  //     cropModifierAction([cropArray], `${cropName} Added`);
  //   }
  // };

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
