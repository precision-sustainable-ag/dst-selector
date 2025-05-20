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
  getRating,
  addCropToBasket,
  hasGoalRatingTwoOrLess,
} from '../../../shared/constants';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import '../../../styles/cropCalendarViewComponent.scss';
import { updateSelectedCropIds } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';
import { setSaveHistory } from '../../../reduxStore/userSlice';
import useIsMobile from '../../../hooks/useIsMobile';

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
  const soilDrainageFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.soilDrainageFilter);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const irrigationFilter = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);

  const isMobile = useIsMobile('md');

  return cropDataRedux
    .sort((a, b) => (a.inactive || false) - (b.inactive || false))
    .filter((crop) => {
      if (irrigationFilter) {
        const filteredWord = irrigationFilter === 'Irrigated' ? 'rainfed' : 'irrigated';
        const res = !crop.cropGrowthWindow.some((element) => element.info.length > 0 && element.info[0].includes(filteredWord));
        return res;
      }
      return true;
    })
    .map((crop, index) => {
      const hasExcessiveDrainage = crop.soilDrainage?.includes('Excessively drained');
      const shouldHighlightRed = hasExcessiveDrainage && soilDrainageFilterRedux;
      const isSelected = selectedCropIdsRedux.includes(crop.id);

      const buttonStyle = { outlineOffset: '-8px', marginTop: '4px' };

      if (shouldHighlightRed) {
        buttonStyle.outline = '4px solid red';
        if (isSelected) {
          buttonStyle.boxShadow = 'inset 0 0 0 4px #5992E6';
        }
      } else if (isSelected) {
        buttonStyle.outline = '4px solid #5992E6';
      }

      return (
        <TableRow
          key={`cropRow${index}`}
          style={{
            opacity: hasGoalRatingTwoOrLess(selectedGoalsRedux, crop) && '0.55',
            backgroundColor: isSelected ? '#EAEAEA' : 'white',
          }}
          data-test={`crop-list-tr-${index}`}
        >
          <TableCell
            sx={{
              padding: 0,
              position: isMobile ? 'sticky' : 'static',
              left: isMobile ? 0 : 'auto',
              zIndex: isMobile ? 1 : 'auto',
              backgroundColor: isMobile ? 'white' : 'transparent',
            }}
          >
            <Grid container direction="row" alignItems="center" flexWrap="nowrap">
              <Grid item md={4} xs={4}>
                {crop ? (
                  <PSAButton
                    className={`crop${index}`}
                    buttonType=""
                    size="small"
                    onClick={() => {
                      setModalData(crop);
                      setModalOpen(!modalOpen);
                    }}
                    style={buttonStyle}
                    title={(
                      <>
                        {isSelected && (
                        <CheckBoxIcon
                          style={{
                            position: 'absolute',
                            right: '4px',
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
                          src={crop.thumbnailSmall ? crop.thumbnailSmall : 'https://placehold.co/50x50'}
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
                <Grid item>
                  <PSAButton
                    buttonType=""
                    size="small"
                    variant="text"
                    sx={{
                      justifyContent: 'center',
                      textDecoration: 'underline',
                      color: 'black',
                      textAlign: 'left',
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

          <TableCell sx={{ padding: 0 }}>
            {' '}
            <PSAButton
              buttonType=""
              id={`cartBtn${index}`}
              style={{
                backgroundColor: isSelected ? '#EAEAEA' : 'white',
                color: isSelected ? '#d32f2f' : '#2d7b7b',
              }}
              className={`cropToBasket${index}`}
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
              aria-label={isSelected ? 'Delete' : 'Add to List'}
              data-test={`cart-btn-${index}`}
              title={isSelected
                ? <DeleteForever data-test={`delete-forever-icon-${index}`} />
                : <AddCircleOutline data-test={`add-circle-outline-icon-${index}`} />}
            />
          </TableCell>
        </TableRow>
      );
    });
};

export default RenderCrops;
