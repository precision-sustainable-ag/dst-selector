import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  CropImage,
  flipCoverCropName,
  LightButton,
  trimString,
  getRating,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import '../../../styles/cropCalendarViewComponent.scss';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';

const RenderCrops = ({
  cropData, active, setModalOpen, modalOpen, setModalData,
}) => {
  const dispatchRedux = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);

  // const dispatchValue = ({ selectedCrops, snackOpen, snackMessage }) => {
  //   dispatchRedux(selectedCropsModifier(selectedCrops));
  //   dispatchRedux(snackHandler({ snackOpen, snackMessage }));
  // };

  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  const selectedBtns = selectedCropsRedux;

  const hasGoalRatingTwoOrLess = (crop = []) => crop.inactive || selectedGoalsRedux.every((rating) => crop[rating] <= 2);

  const getAverageGoalRating = (selectedGoals, crop) => {
    let goalRating = 0;
    selectedGoals.forEach((goal) => {
      if (crop.data.Goals[goal]) {
        goalRating = +crop.data.Goals[goal].values[0] + goalRating;
      }
    });
    return getRating(goalRating / selectedGoals.length);
  };

  // same function in ExplorerCardView move to constants
  // const addCropToBasket = (cropId, cropName, btnId) => {
  //   const selectedCrops = cropId;
  //   let cropArray = [];
  //   cropArray = selectedCrops;

  //   if (selectedCropsRedux.length > 0) {
  //     const removeIndex = selectedCropsRedux.map((item) => item.btnId).indexOf(`${btnId}`);
  //     if (removeIndex === -1) {
  //       dispatchValue({
  //         selectedCrops: [...selectedCropsRedux, selectedCrops],
  //         snackOpen: true,
  //         snackMessage: `${cropName} Added`,
  //       });
  //     } else {
  //       const selectedCropsCopy = selectedCropsRedux;
  //       selectedCropsCopy.splice(removeIndex, 1);
  //       dispatchValue({
  //         selectedCrops: selectedCropsCopy,
  //         snackOpen: true,
  //         snackMessage: `${cropName} Removed`,
  //       });
  //     }
  //   } else {
  //     dispatchRedux(myCropListLocation({ from: 'selector' }));

  //     dispatchValue({
  //       selectedCrops: [cropArray],
  //       snackOpen: true,
  //       snackMessage: `${cropName} Added`,
  //     });
  //   }
  // };

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

  return cropData
    .filter((crop) => (active ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)))
    .map(
      (crop, index) => (
        <TableRow
          key={`cropRow${index}`}
          style={hasGoalRatingTwoOrLess(crop) ? { opacity: '0.2' } : {}}
        >
          <TableCell
            className="calendarTableCell"
            style={{
              paddingBottom: '0px',
            }}
          >
            <div className="tdContainer d-flex justify-content-between flex-nowrap">
              {crop ? (
                <Button
                  size="small"
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                >
                  <CropImage
                    view="calendar"
                    present
                    src={
                          crop.thumbnail
                            ? crop.thumbnail
                            : 'https://placehold.it/100x100'
                        }
                    alt={crop.label}
                  />
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                >
                  <CropImage view="calendar" present={false} />
                </Button>
              )}

              <Button
                size="small"
                onClick={() => {
                  setModalData(crop);
                  setModalOpen(!modalOpen);
                }}
              >
                {crop.label !== 'Sorghum-sudangrass'
                  ? flipCoverCropName(crop.label)
                  : trimString(flipCoverCropName(crop.label), 15)}
              </Button>
            </div>
          </TableCell>
          {selectedGoalsRedux.length > 0 && (
          <TableCell
            style={{
              paddingBottom: '0px',
              textAlign: 'center',
            }}
          >
            {getAverageGoalRating(selectedGoalsRedux, crop)}
          </TableCell>
          )}
          <TableCell colSpan="12">
            <CropSelectorCalendarView from="calendar" data={crop} />
          </TableCell>

          <TableCell
            style={{
              paddingBottom: '0px',
            }}
          >
            {' '}
            <LightButton
              id={`cartBtn${index}`}
              style={{
                borderRadius: '0px',
                width: '130px',
              }}
              className={
                    selectedBtns.includes(crop.id) ? 'activeCartBtn' : 'inactiveCartBtn'
                  }
              onClick={() => {
                addCropToBasket(
                  crop.id,
                  crop.label,
                  `cartBtn${index}`,
                  crop,
                );
              }}
            >
              {selectedBtns.includes(crop.id) ? 'ADDED' : 'ADD TO LIST'}
            </LightButton>
          </TableCell>
        </TableRow>
      ),
    );
};

export default RenderCrops;
