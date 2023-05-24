/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
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
import {
  AcUnit, AddCircle, LocalFlorist, WbSunny,
} from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import {
  allMonths,
  CustomStyles,
  flipCoverCropName,
  sudoButtonStyle,
  sudoButtonStyleWithPadding,
} from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';
import CropLegendModal from '../../../components/CropLegendModal/CropLegendModal';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const growthIcon = {
  color: 'white',
};

const CropCalendarView = ({ activeCropData }) => {
  const { state, dispatch } = useContext(Context);
  const [legendModal, setLegendModal] = useState(false);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const dispatchValue = (value, type = 'UPDATE_ACTIVE_CROP_DATA') => {
    dispatch({
      type,
      data: {
        value,
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
      return false;
    }
    return false;
  };

  const sortReset = () => {
    const { selectedGoals } = state;
    const activeCropDataShadow = activeCropData;
    selectedGoals
      .slice()
      .reverse()
      .forEach((goal) => {
        activeCropDataShadow.sort((a, b) => {
          if (a.data.Goals[goal] && b.data.Goals[goal]) {
            if (a.data.Goals[goal].values[0] > b.data.Goals[goal].values[0]) {
              return -1;
            }
            return 1;
          }
          return 0;
        });
      });

    dispatchValue(activeCropDataShadow);
  };
  const sortCropsByName = () => {
    const activeCropDataShadow = activeCropData;
    sortReset('cropName');

    if (nameSortFlag) {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          const firstCropName = flipCoverCropName(
            a.data.Weeds['Cover Crop Name'].values[0].toLowerCase(),
          ).replace(/\s+/g, '');
          const secondCropName = flipCoverCropName(
            b.data.Weeds['Cover Crop Name'].values[0].toLowerCase(),
          ).replace(/\s+/g, '');
          return firstCropName.localeCompare(secondCropName);
        });

        dispatchValue(activeCropDataShadow);
      }
    } else if (activeCropDataShadow.length > 0) {
      activeCropDataShadow.sort((a, b) => {
        const firstCropName = flipCoverCropName(a.data.Weeds['Cover Crop Name'].values[0].toLowerCase()).replace(
          /\s+/g,
          '',
        );
        const secondCropName = flipCoverCropName(b.data.Weeds['Cover Crop Name'].values[0].toLowerCase()).replace(
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

    setNameSortFlag(!nameSortFlag);
  };

  const sortBySelectedCrops = () => {
    sortReset('selectedCrops');
    const selectedCropsShadow = state.selectedCrops;
    const activeCropDataShadow = activeCropData;
    if (selectedCropsSortFlag) {
      if (selectedCropsShadow.length > 0) {
        const selectedCropIds = [];
        selectedCropsShadow.forEach((crop) => {
          selectedCropIds.push(crop.id);
        });
        const newActiveShadow = activeCropDataShadow.map((crop) => {
          crop.inCart = selectedCropIds.includes(crop.id);
          return crop;
        });

        if (newActiveShadow.length > 0) {
          newActiveShadow.sort((a) => {
            if (a.inCart) {
              return -1;
            }
            return 1;
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
    <>
      {state.ajaxInProgress ? (
        <div className="circularCentered">
          <CircularProgress size="6em" />
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
                />
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
                            <Button
                              startIcon={<AddCircle />}
                              onClick={handleLegendModal}
                              style={{ color: '#000' }}
                            >
                              {' '}
                              <Typography variant="body2">LEGEND</Typography>
                            </Button>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                ) : (
                  <>
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
                      <TableCell style={{ borderBottom: '5px solid white' }} colSpan="2" />
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
                      <TableCell style={{ borderBottom: '5px solid white' }} colSpan="3" />
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
                      <TableCell style={{ borderBottom: '5px solid white' }} colSpan="3" />
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
                      <TableCell style={{ borderBottom: '5px solid white' }} colSpan="3" />
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
                      <TableCell style={{ borderBottom: '5px solid white' }} colSpan="1" />
                    )}
                  </>
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
                          <Typography variant="body2"> Legend</Typography>
                        </Button>
                      </Typography>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell style={{ backgroundColor: 'white' }} />
                )}
              </TableRow>
              <TableRow className="calSecondHeadRow">
                <TableCell style={{ width: '17%', borderRight: '5px solid white' }}>
                  <Button style={{ color: '#000' }} onClick={sortCropsByName}>
                    <Typography variant="body2"> COVER CROPS </Typography>
                  </Button>
                </TableCell>
                {state.selectedGoals.length > 0 && (
                  <TableCell style={{ width: '13%', borderRight: '5px solid white' }}>
                    <div className="col-12">
                      <Typography variant="body1">
                        <Button style={{ color: '#000' }} onClick={sortReset}>

                          <Typography variant="body2"> AVERAGE GOAL RATING</Typography>
                        </Button>
                      </Typography>
                    </div>

                  </TableCell>
                )}

                {allMonths.map((month, index) => {
                  const growthMonth = checkIfGrowthMonth(month);
                  const growthMonthSeparator = growthMonth
                    ? !!(month === 'Feb' || month === 'May' || month === 'Aug' || month === 'Nov')
                    : false;

                  return (
                    <TableCell
                      key={`monthskey${index}`}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? 'activeGrowthMonth' : ''
                      } ${growthMonthSeparator ? 'growthMonthSeparator' : ''}`}
                    >
                      <div style={sudoButtonStyle}>{month}</div>
                    </TableCell>
                  );
                })}

                <TableCell style={{ width: '10%', borderLeft: '5px solid white' }}>
                  <Button style={{ color: '#000' }} onClick={sortBySelectedCrops}>
                    <Typography variant="body2"> MY LIST </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="calendarTableBodyWrapper">
              {activeCropData.length > 0 && (
                <>
                  <RenderCrops
                    active
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
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default CropCalendarView;
