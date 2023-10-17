import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, TableRow } from '@mui/material';
import {
  CropImage,
  flipCoverCropName,
  LightButton,
  trimString,
  getRating,
  addCropToBasket,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import '../../../styles/cropCalendarViewComponent.scss';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';

const RenderCrops = ({
  cropData, active, setModalOpen, modalOpen, setModalData,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  // const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  // const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
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

  // return cropDataRedux.filter((crop) => activeCropDataRedux.includes(crop.id))
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
                  dispatchRedux,
                  snackHandler,
                  selectedCropsModifier,
                  selectedCropsRedux,
                  myCropListLocation,
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
