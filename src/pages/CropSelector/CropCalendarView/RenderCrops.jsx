import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableCell, TableRow, Grid,
  Box,
} from '@mui/material';
import {
  AcUnit, AddCircleOutline, CheckRounded, DeleteForever,
} from '@mui/icons-material';
import { PSAButton, PSATooltip } from 'shared-react-components/src';
import {
  CropImage,
  flipCoverCropName,
  // trimString,
  getRating,
  addCropToBasket,
  hasGoalRatingTwoOrLess,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import '../../../styles/cropCalendarViewComponent.scss';
import { updateSelectedCropIds } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';
import { setSaveHistory } from '../../../reduxStore/userSlice';

const CheckBoxIcon = ({ style }) => (
  <Box sx={style}>
    <CheckRounded style={{
      color: '#FFFFFF',
      width: '15',
      height: '15',
    }}
    />

  </Box>
);

const RenderCrops = ({ setModalOpen, modalOpen, setModalData }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedBtns = selectedCropIdsRedux;
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  return cropDataRedux
    .sort((a, b) => (a.inactive || false) - (b.inactive || false))
    .map((crop, index) => (
      <TableRow
        key={`cropRow${index}`}
        style={{
          opacity: hasGoalRatingTwoOrLess(selectedGoalsRedux, crop) && '0.55',
          backgroundColor: selectedCropIdsRedux.includes(crop.id) && '#EAEAEA',
        }}
        data-test={`crop-list-tr-${index}`}
      >
        <TableCell
          sx={{
            padding: 0,
            position: 'sticky',
            left: 0,
            zIndex: 1,
            backgroundColor: 'white',
          }}
        >
          <Grid container direction="row" alignItems="center" flexWrap="nowrap">
            <Grid item md={4} xs={4}>
              {crop ? (
                <PSAButton
                  buttonType=""
                  size="small"
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                  style={{
                    outlineOffset: '-7px',
                    ...selectedCropIdsRedux.includes(crop.id) && {
                      outline: '4px solid #5992E6',

                    },
                  }}
                  title={(
                    <>
                      { selectedCropIdsRedux.includes(crop.id) && (
                        <CheckBoxIcon
                          style={{
                            position: 'absolute',
                            right: '7px',
                            top: '4px',
                            height: '15px',
                            zIndex: 1,
                            backgroundColor: '#5992E6',

                          }}
                        />

                      )}
                      <CropImage
                        view="calendar"
                        present
                        src={crop.thumbnail ? crop.thumbnail : 'https://placehold.it/100x100'}
                        alt={crop.label}
                      />

                    </>
                  )}
                />
              ) : (
                <PSAButton
                  buttonType=""
                  size="small"
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                  title={
                    <CropImage view="calendar" present={false} />
                  }
                />
              )}
            </Grid>
            <Grid container item md={8} xs={8} alignItems="center">
              <Grid
                item
                sx={{
                  maxWidth: '100%', // Prevent overflow
                  overflow: 'hidden',
                  textOverflow: 'ellipsis', // Handle long words
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PSAButton
                  buttonType=""
                  size="small"
                  variant="text"
                  sx={{
                    justifyContent: 'center',
                    textDecoration: 'underline',
                    color: 'black',
                    textAlign: 'left', // Ensure readability
                  }}
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                  data-test="crop-calendar-crop-name"
                  title={flipCoverCropName(crop.label)}
                />
              </Grid>
              {crop.attributes.filter((a) => a.label === 'Frost Seed')[0]?.values[0].label === 'Yes' && (
                <Grid item>
                  <PSATooltip
                    placement="top-end"
                    enterTouchDelay={0}
                    title={`${flipCoverCropName(crop.label)} is suitable for frost seeding.`}
                    arrow
                    tooltipContent={(
                      <span role="button" aria-label={`${flipCoverCropName(crop.label)} is suitable for frost seeding.`}>
                        <AcUnit
                          sx={{ color: 'white', backgroundColor: '#80D0FF', borderRadius: '5px' }}
                          tabIndex="0"
                        />
                      </span>
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </TableCell>
        {selectedGoalsRedux.length > 0
          && selectedGoalsRedux.map((goal, i) => (
            <TableCell
              size="small"
              style={{
                textAlign: 'center',
              }}
              key={i}
              className="goalCells"
            >
              <div>
                <PSATooltip
                  arrow
                  placement="bottom"
                  enterTouchDelay={0}
                  title={(
                    <p>
                      {`Goal ${i + 1}`}
                      {': '}
                      {goal}
                    </p>
                  )}
                  tooltipContent={(
                    getRating(crop.goals.filter((a) => a.label === goal)[0].values[0].value, councilShorthandRedux)
                  )}
                />
              </div>
            </TableCell>
          ))}
        <TableCell sx={{ padding: 0 }} colSpan="12">
          <CropSelectorCalendarView from="calendar" data={crop} />
        </TableCell>

        <TableCell
          sx={{
            padding: 0,
          }}
        >
          {' '}
          <PSAButton
            buttonType=""
            id={`cartBtn${index}`}
            style={{
              backgroundColor: selectedCropIdsRedux.includes(crop.id) ? '#EAEAEA' : 'white',
              color: selectedBtns.includes(crop.id) ? '#d32f2f' : '#2d7b7b',
            }}
            onClick={() => {
              addCropToBasket(
                crop.id,
                crop.label,
                dispatchRedux,
                snackHandler,
                updateSelectedCropIds,
                selectedCropIdsRedux,
                myCropListLocation,
                historyStateRedux,
                'selector',
                setSaveHistory,
              );
            }}
            aria-label={selectedBtns.includes(crop.id) ? 'Delete' : 'Add to List'}
            data-test={`cart-btn-${index}`}
            title={selectedBtns.includes(crop.id)
              ? <DeleteForever data-test={`delete-forever-icon-${index}`} />
              : <AddCircleOutline data-test={`add-circle-outline-icon-${index}`} />}
          />
        </TableCell>
      </TableRow>
    ));
};

export default RenderCrops;
