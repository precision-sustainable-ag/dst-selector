import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, TableCell, TableRow, Grid, Tooltip,
} from '@mui/material';
import { AcUnit, AddCircleOutline, DeleteForever } from '@mui/icons-material';
import {
  CropImage,
  flipCoverCropName,
  LightButton,
  // trimString,
  getRating,
  addCropToBasket,
  hasGoalRatingTwoOrLess,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import '../../../styles/cropCalendarViewComponent.scss';
import { updateSelectedCropIds } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';

const RenderCrops = ({ setModalOpen, modalOpen, setModalData }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedBtns = selectedCropIdsRedux;

  return cropDataRedux
    .sort((a, b) => (a.inactive || false) - (b.inactive || false))
    .map((crop, index) => (
      <TableRow
        key={`cropRow${index}`}
        style={hasGoalRatingTwoOrLess(selectedGoalsRedux, crop) ? { opacity: '0.3' } : {}}
      >
        <TableCell sx={{ padding: 0 }}>
          <Grid container>
            <Grid item md={4} xs={12}>
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
                    src={crop.thumbnail ? crop.thumbnail : 'https://placehold.it/100x100'}
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
            <Grid container item md={8} xs={12} alignItems="center">
              <Grid item>
                <Button
                  size="small"
                  sx={{ color: 'black', justifyContent: 'left' }}
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                >
                  {flipCoverCropName(crop.label)}
                </Button>
              </Grid>
              {crop.attributes.filter((a) => a.label === 'Frost Seeding')[0]?.values[0] === 'Yes' && (
                <Grid item>
                  <Tooltip
                    placement="top-end"
                    enterTouchDelay={0}
                    title={`${flipCoverCropName(crop.label)} is suitable for frost seeding.`}
                    arrow
                  >
                    <AcUnit
                      sx={{ color: 'white', backgroundColor: '#80D0FF', borderRadius: '5px' }}
                    />
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Grid>
        </TableCell>
        {selectedGoalsRedux.length > 0
          && selectedGoalsRedux.map((goal, i) => (
            <TableCell size="small" style={{ textAlign: 'center' }} key={i} className="goalCells">
              <div>
                <Tooltip
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
                >
                  {getRating(crop.goals.filter((a) => a.label === goal)[0].values[0], councilShorthandRedux)}
                </Tooltip>
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
                updateSelectedCropIds,
                selectedCropIdsRedux,
                myCropListLocation,
              );
            }}
          >
            {selectedBtns.includes(crop.id) ? <DeleteForever /> : <AddCircleOutline />}
          </LightButton>
        </TableCell>
      </TableRow>
    ));
};

export default RenderCrops;
