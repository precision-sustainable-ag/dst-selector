import React, { useContext } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import {
  CropImage,
  flipCoverCropName,
  LightButton,
  trimString,
  getRating,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';

const RenderCrops = ({
  cropData, active, setModalOpen, modalOpen, setModalData,
}) => {
  const { state, dispatch } = useContext(Context);

  const dispatchValue = (value, type = 'SELECTED_CROPS_MODIFIER') => {
    dispatch({
      type,
      data: value,
    });
  };

  const selectedBtns = state.selectedCrops.map((crop) => crop.id);

  const hasGoalRatingTwoOrLess = (crop = []) => {
    const { selectedGoals } = state;

    return crop.inactive || selectedGoals.every((rating) => crop[rating] <= 2);
  };

  const getAverageGoalRating = (selectedGoals, crop) => {
    let goalRating = 0;
    selectedGoals.forEach((goal) => {
      if (crop[goal]) {
        goalRating += crop[goal];
      }
    });

    return getRating(goalRating / selectedGoals.length);
  };

  const addCropToBasket = (cropId, cropName, btnId, cData) => {
    const selectedCrops = {};
    let cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.btnId = btnId;
    selectedCrops.data = cData;
    cropArray = selectedCrops;

    if (state.selectedCrops.length > 0) {
      const removeIndex = state.selectedCrops.map((item) => item.btnId).indexOf(`${btnId}`);
      if (removeIndex === -1) {
        dispatchValue({
          selectedCrops: [...state.selectedCrops, selectedCrops],
          snackOpen: true,
          snackMessage: `${cropName} Added`,
        });
      } else {
        const selectedCropsCopy = state.selectedCrops;
        selectedCropsCopy.splice(removeIndex, 1);
        dispatchValue({
          selectedCrops: selectedCropsCopy,
          snackOpen: true,
          snackMessage: `${cropName} Removed`,
        });
      }
    } else {
      dispatch({
        type: 'MY_CROP_LIST_LOCATION',
        data: { from: 'selector' },
      });
      dispatchValue({
        selectedCrops: [cropArray],
        snackOpen: true,
        snackMessage: `${cropName} Added`,
      });
    }
  };

  return cropData
    .filter((crop) => (active ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)))
    .map(
      (crop, index) => crop['Zone Decision'] === 'Include' && (
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
            {crop['Image Data'] ? (
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
                        crop['Image Data']['Key Thumbnail']
                          ? crop['Image Data']['Key Thumbnail']
                          : 'https://placehold.it/100x100'
                      }
                  alt={crop['Cover Crop Name']}
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
              {crop['Cover Crop Name'] !== 'Sorghum-sudangrass'
                ? flipCoverCropName(crop['Cover Crop Name'])
                : trimString(flipCoverCropName(crop['Cover Crop Name']), 15)}
            </Button>
          </div>
        </TableCell>
        {state.selectedGoals.length > 0 && (
        <TableCell
          style={{
            paddingBottom: '0px',
            textAlign: 'center',
          }}
        >
          {getAverageGoalRating(state.selectedGoals, crop)}
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
                crop['Cover Crop Name'],
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
