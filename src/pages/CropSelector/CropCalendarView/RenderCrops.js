import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, TableCell, TableRow, Grid,
} from '@mui/material';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import {
  CropImage,
  flipCoverCropName,
  LightButton,
  // trimString,
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
          <TableCell sx={{ padding: 0 }}>
            <Grid container>
              <Grid item>
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
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                >
                  {flipCoverCropName(crop.label)}
                </Button>
              </Grid>
            </Grid>

          </TableCell>
          {selectedGoalsRedux.length > 0 && (
          <TableCell
            sx={{
              padding: 0,
              textAlign: 'center',
            }}
          >
            {getAverageGoalRating(selectedGoalsRedux, crop)}
          </TableCell>
          )}
          <TableCell sx={{ padding: 0 }} colSpan="12">
            <CropSelectorCalendarView from="calendar" data={crop} />
          </TableCell>

          <TableCell
            sx={{
              padding: 0,
            }}
          >
            {' '}
            <LightButton
              id={`cartBtn${index}`}
              style={{
                backgroundColor: 'white',
                color: selectedBtns.includes(crop.id) ? '#d32f2f' : '#2d7b7b',
              }}
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
              {selectedBtns.includes(crop.id) ? <DeleteForever /> : <AddCircleOutline />}
            </LightButton>
          </TableCell>
        </TableRow>
      ),
    );
};

export default RenderCrops;
