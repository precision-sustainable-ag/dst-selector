/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
*/

import {
  Box,
  Button,
  CircularProgress,
  Modal,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allMonths,
  CustomStyles,
  sortCrops,
  sudoButtonStyle,
  sudoButtonStyleWithPadding,
  getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
// import CropLegendModal from '../../../components/CropLegendModal/CropLegendModal';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';
import { updateActiveCropData } from '../../../reduxStore/cropSlice';

const growthIcon = {
  color: 'white',
};

const CropCalendarView = ({ activeCropData }) => {
  const dispatchRedux = useDispatch();
  const cropDataStateRedux = useSelector((stateRedux) => stateRedux.cropData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const activeGrowthPeriodRedux = useSelector((stateRedux) => stateRedux.cropData.activeGrowthPeriod);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const [legendModal, setLegendModal] = useState(false);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [goalsSortFlag, setGoalsSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsFlag] = useState(true);
  const [plantingWindowSortFlag, setPlantingWindowSortFlag] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  // const { selectedGoals } = state;
  const activeCropDataShadow = activeCropData;
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  // const dispatchValue = (value, type = 'UPDATE_ACTIVE_CROP_DATA') => {
  //   dispatch({
  //     type,
  //     data: {
  //       value,
  //     },
  //   });
  // };
  const dispatchValue = (value) => dispatchRedux(updateActiveCropData(value));
  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };
  const [activeGrowthPeriodState, setActiveGrowthPeriodState] = useState(activeGrowthPeriodRedux);

  useEffect(() => {
    setActiveGrowthPeriodState(activeGrowthPeriodRedux);
  }, [cropDataStateRedux]);

  const checkIfGrowthMonth = (month) => {
    if (activeGrowthPeriodState.length !== 0) {
      if (activeGrowthPeriodState.includes(month)) return true;
      return false;
    }
    return false;
  };

  const sortReset = () => {
    sortCrops('Average Goals', activeCropDataShadow, goalsSortFlag, selectedGoalsRedux);
    setGoalsSortFlag(!goalsSortFlag);
    dispatchValue(activeCropDataShadow);
  };

  const sortCropsByName = () => {
    sortCrops('Crop Name', activeCropDataShadow, nameSortFlag);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByPlantingWindow = () => {
    sortCrops('Planting Window', activeCropDataShadow, plantingWindowSortFlag);
    setPlantingWindowSortFlag(!plantingWindowSortFlag);
  };

  const sortBySelectedCrops = () => {
    const selectedCropsShadow = selectedCropsRedux;
    sortCrops('Selected Crops', activeCropDataShadow, selectedCropsSortFlag, selectedCropsShadow, dispatchValue);
    setSelectedCropsFlag(!selectedCropsSortFlag);
  };

  useEffect(() => {
    sortReset();
  }, []);

  return (
    <>
      {ajaxInProgressRedux ? (
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
                  colSpan={activeGrowthPeriodRedux.length === 0 ? 2 : 1}
                  style={{ backgroundColor: 'white' }}
                />
                {activeGrowthPeriodRedux.length === 0 ? (
                  <TableCell
                    colSpan="12"
                    style={{
                      borderBottom: '5px solid white',
                    }}
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-4">
                          <Typography variant="body1" component="span">
                            <div style={sudoButtonStyleWithPadding}>COVER CROP GROWTH WINDOW</div>
                          </Typography>
                        </div>
                        <div className="col-4">
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
                        <div className="col-4">
                          <Button
                            onClick={sortByPlantingWindow}
                            style={{ color: '#000' }}
                          >
                            <Typography variant="body1" component="span">
                              <div style={sudoButtonStyleWithPadding}>SORT BY PLANTING WINDOW</div>
                            </Typography>
                          </Button>
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
                    {activeGrowthPeriodRedux.includes('Jan') ? (
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
                    {activeGrowthPeriodRedux.includes('Mar') ? (
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
                    {activeGrowthPeriodRedux.includes('Jun') ? (
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
                    {activeGrowthPeriodRedux.includes('Sep') ? (
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
                    {activeGrowthPeriodRedux.includes('Dec') ? (
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
                {activeGrowthPeriodRedux.length > 0 ? (
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
                {selectedGoalsRedux.length > 0 && (
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
                      style={{ cursor: 'pointer' }}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? 'activeGrowthMonth' : ''
                      } ${growthMonthSeparator ? 'growthMonthSeparator' : ''}`}
                      onClick={sortByPlantingWindow}
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
      <Modal
        open={legendModal}
        onClose={handleLegendModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          className="modalLegendPaper"
          sx={{
            backgroundColor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 5,
            padding: '1em',
            width: '30%',
          }}
        >
          <Legend
            handleLegendModal={handleLegendModal}
            legendData={legendData}
            modal
          />
        </Box>

      </Modal>
      {/* <CropLegendModal
        legendModal={legendModal}
        handleLegendModal={handleLegendModal}
        disableBackdropClick={false}
      /> */}
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default CropCalendarView;
