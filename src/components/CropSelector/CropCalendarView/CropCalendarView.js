/*
  This file contains the CropCalendarViewComponent  
  The CropCalendarViewComponent shows the crops in calendar format
  Styles are created using makeStyles
*/

import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { AcUnit, AddCircle, LocalFlorist, WbSunny } from '@mui/icons-material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  allMonths,
  CustomStyles,
  flipCoverCropName,
  sudoButtonStyle,
  sudoButtonStyleWithPadding,
} from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';
import CropDetailsModalComponent from '../CropDetailsModal';
import CropLegendModal from '../CropLegendModal';
import RenderCrops from './RenderCrops';

const growthIcon = {
  color: 'white',
};

const CropCalendarViewComponent = (props) => {
  const { activeCropData } = props;
  const { state, dispatch } = useContext(Context);
  const [legendModal, setLegendModal] = useState(false);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const dispatchValue = (value, type = 'UPDATE_ACTIVE_CROP_DATA') => {
    dispatch({
      type: type,
      data: {
        value: value,
      },
    });
  };

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };
  const [activeGrowthPeriodState, setActiveGrowthPeriodState] = useState(state.activeGrowthPeriod);

  useEffect(() => {
    setActiveGrowthPeriodState(state.activeGrowthPeriod);
  }, [state]);

  const checkIfGrowthMonth = (month) => {
    if (activeGrowthPeriodState.length !== 0) {
      if (activeGrowthPeriodState.includes(month)) return true;
      else return false;
    } else {
      return false;
    }
  };

  const sortReset = (from = 'cropName') => {
    const { selectedGoals } = state;
    let activeCropDataShadow = props.activeCropData;
    selectedGoals
      .slice()
      .reverse()
      .forEach((goal) => {
        activeCropDataShadow.sort((a, b) => {
          if (a.fields[goal] && b.fields[goal]) {
            if (a.fields[goal] > b.fields[goal]) {
              return -1;
            } else {
              return 1;
            }
          }
          return 0;
        });
      });

    dispatchValue(activeCropDataShadow);
  };
  const sortCropsByName = () => {
    let activeCropDataShadow = props.activeCropData;
    sortReset('cropName');

    if (nameSortFlag) {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          let firstCropName = flipCoverCropName(a.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          let secondCropName = flipCoverCropName(b.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          return firstCropName.localeCompare(secondCropName);
        });

        dispatchValue(activeCropDataShadow);
      }
    } else {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          let firstCropName = flipCoverCropName(a.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          let secondCropName = flipCoverCropName(b.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          if (firstCropName < secondCropName) {
            return 1;
          }
          if (firstCropName > secondCropName) {
            return -1;
          }
          return 0;
        });

        dispatchValue(activeCropDataShadow);
      }
    }

    setNameSortFlag(!nameSortFlag);
  };

  const sortBySelectedCrops = () => {
    sortReset('selectedCrops');
    let selectedCropsShadow = state.selectedCrops;
    let activeCropDataShadow = props.activeCropData;
    if (selectedCropsSortFlag) {
      if (selectedCropsShadow.length > 0) {
        let selectedCropIds = [];
        selectedCropsShadow.forEach((crop) => {
          selectedCropIds.push(crop.id);
        });
        let newActiveShadow = activeCropDataShadow.map((crop) => {
          crop.inCart = selectedCropIds.includes(crop.fields.id);
          return crop;
        });

        if (newActiveShadow.length > 0) {
          newActiveShadow.sort((a) => {
            if (a.inCart) {
              return -1;
            } else {
              return 1;
            }
          });

          dispatchValue(newActiveShadow);
        }
      }
    } else {
      sortReset('selectedCrops');
    }
    setSelectedCropsSortFlag(!selectedCropsSortFlag);
  };

  return (
    <Fragment>
      {state.ajaxInProgress ? (
        <div className="circularCentered">
          <CircularProgress size={'6em'} />
        </div>
      ) : (
        <TableContainer
          component="div"
          className="table-responsive calendarTableViewWrapper"
          style={{ lineHeight: '0.5' }}
        >
          <Table
            stickyHeader
            className="table calendarViewTable table-sm table-borderless"
            style={{}}
          >
            <TableHead className="tableHeadWrapper">
              <TableRow className="calFirstHeadRow">
                <TableCell
                  colSpan={state.activeGrowthPeriod.length === 0 ? 2 : 1}
                  style={{ backgroundColor: 'white' }}
                ></TableCell>
                {state.activeGrowthPeriod.length === 0 ? (
                  <TableCell
                    colSpan="12"
                    style={{
                      borderBottom: '5px solid white',
                    }}
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-6">
                          <Typography variant="body1">
                            <div style={sudoButtonStyleWithPadding}>COVER CROP GROWTH WINDOW</div>
                          </Typography>
                        </div>
                        <div className="col-6">
                          <Typography variant="body1">
                            <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                              Legend
                            </Button>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                ) : (
                  <Fragment>
                    <TableCell
                      colSpan="1"
                      style={{
                        borderBottom: '5px solid white',
                        borderRight: '5px solid white',
                      }}
                    >
                      <div style={sudoButtonStyleWithPadding}>ACTIVE GROWTH PERIOD</div>
                    </TableCell>
                    {state.activeGrowthPeriod.includes('Jan') ? (
                      <Tooltip placement="top" title="Winter">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="2"
                        >
                          <Typography variant="body1">
                            <AcUnit style={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: '5px solid white' }}
                        colSpan="2"
                      ></TableCell>
                    )}
                    {state.activeGrowthPeriod.includes('Mar') ? (
                      <Tooltip placement="top" title="Spring">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            <LocalFlorist style={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: '5px solid white' }}
                        colSpan="3"
                      ></TableCell>
                    )}
                    {state.activeGrowthPeriod.includes('Jun') ? (
                      <Tooltip placement="top" title="Summer">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            <WbSunny style={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: '5px solid white' }}
                        colSpan="3"
                      ></TableCell>
                    )}
                    {state.activeGrowthPeriod.includes('Sep') ? (
                      <Tooltip placement="top" title="Fall">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            {/* <Eco style={growthIcon} /> */}
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: '5px solid white' }}
                        colSpan="3"
                      ></TableCell>
                    )}
                    {state.activeGrowthPeriod.includes('Dec') ? (
                      <Tooltip placement="top" title="Winter">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="1"
                        >
                          <Typography variant="body1">
                            <AcUnit style={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: '5px solid white' }}
                        colSpan="1"
                      ></TableCell>
                    )}
                  </Fragment>
                )}
                {state.activeGrowthPeriod.length > 0 ? (
                  <TableCell
                    style={{
                      borderLeft: '5px solid white',
                      borderBottom: '5px solid white',
                    }}
                  >
                    <div className="col-12">
                      <Typography variant="body1">
                        <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                          Legend
                        </Button>
                      </Typography>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell style={{ backgroundColor: 'white' }}></TableCell>
                )}
              </TableRow>
              <TableRow className="calSecondHeadRow">
                <TableCell style={{ width: '17%', borderRight: '5px solid white' }}>
                  <Button onClick={sortCropsByName}>COVER CROPS</Button>
                </TableCell>
                {state.selectedGoals.length > 0 && (
                  <TableCell style={{ width: '13%', borderRight: '5px solid white' }}>
                    <Button onClick={sortReset}>AVERAGE GOAL RATING</Button>
                  </TableCell>
                )}

                {allMonths.map((month, index) => {
                  const growthMonth = checkIfGrowthMonth(month);
                  const growthMonthSeparator = growthMonth
                    ? month === 'Feb' || month === 'May' || month === 'Aug' || month === 'Nov'
                      ? true
                      : false
                    : false;

                  return (
                    <TableCell
                      key={`monthskey${index}`}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? `activeGrowthMonth` : ``
                      } ${growthMonthSeparator ? `growthMonthSeparator` : ``}`}
                    >
                      <div style={sudoButtonStyle}>{month}</div>
                    </TableCell>
                  );
                })}

                <TableCell style={{ width: '10%', borderLeft: '5px solid white' }}>
                  <Button onClick={sortBySelectedCrops}>
                    MY LIST <br />
                    {`[${state.selectedCrops.length} CROPS]`}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="calendarTableBodyWrapper">
              {activeCropData.length > 0 && (
                <>
                  <RenderCrops
                    active={true}
                    cropData={activeCropData}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    setModalData={setModalData}
                  />
                  <RenderCrops active={false} cropData={activeCropData} />
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CropLegendModal
        legendModal={legendModal}
        handleLegendModal={handleLegendModal}
        disableBackdropClick={false}
      />
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </Fragment>
  );
};

export default CropCalendarViewComponent;
