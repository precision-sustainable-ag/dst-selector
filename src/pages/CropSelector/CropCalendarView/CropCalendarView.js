/* eslint-disable max-len */
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
  Box,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  AcUnit, AddCircle, LocalFlorist, WbSunny,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  allMonths,
  CustomStyles,
  sortCrops,
  sudoButtonStyleWithPadding,
  getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';

const growthIcon = {
  color: 'white',
};

const CropCalendarView = () => {
  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const activeGrowthPeriodRedux = useSelector((stateRedux) => stateRedux.cropData.activeGrowthPeriod);

  // useState vars
  const [legendModal, setLegendModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  // sorting flags
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [plantingSortFlag, setPlantingSortFlag] = useState(true);

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };

  const checkIfGrowthMonth = (month) => {
    if (activeGrowthPeriodRedux.length !== 0) {
      if (activeGrowthPeriodRedux.includes(month)) return true;
      return false;
    }
    return false;
  };

  const sortByName = () => {
    sortCrops('Crop Name', cropDataRedux, nameSortFlag);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByAverageGoals = () => {
    sortCrops('Average Goals', cropDataRedux, nameSortFlag, selectedGoalsRedux);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByPlantingWindow = () => {
    sortCrops('Planting Window', cropDataRedux, plantingSortFlag);
    setPlantingSortFlag(!plantingSortFlag);
  };

  const sortBySelectedCrops = () => {
    sortCrops('Selected Crops', cropDataRedux, true, selectedCropIdsRedux);
    setNameSortFlag(!nameSortFlag);
  };

  useEffect(() => {
    if (cropDataRedux.length !== 0) sortByAverageGoals();
  }, [cropDataRedux]);

  return (
    <>
      {ajaxInProgressRedux ? (
        <Box>
          <CircularProgress size="6em" />
        </Box>
      ) : (
        <TableContainer component="div" sx={{ lineHeight: '0.5' }}>
          <Table
            stickyHeader
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
          >
            <TableHead sx={{ zIndex: -1 }}>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: 'white', padding: 0 }}
                  colSpan={activeGrowthPeriodRedux.length === 0 ? 2 : 1}
                >
                  <Legend legendData={legendData} modal />
                </TableCell>
                {activeGrowthPeriodRedux.length === 0 ? (
                  <TableCell
                    colSpan="12"
                    style={{
                      borderBottom: '5px solid white',
                      backgroundColor: '#abd08f',
                      padding: 0,
                      textAlign: 'center',

                    }}
                  >

                    <Button sx={{ color: 'black', textTransform: 'none' }} onClick={() => sortByPlantingWindow()}>
                      Cover Crop Growing Window
                    </Button>

                  </TableCell>
                ) : (
                  <>
                    <TableCell
                      colSpan="1"
                      sx={{
                        borderBottom: '5px solid white',
                        borderRight: '5px solid white',
                        backgroundColor: '#abd08f',
                        padding: 0,

                      }}
                    >
                      <Box sx={sudoButtonStyleWithPadding}>ACTIVE GROWTH PERIOD</Box>
                    </TableCell>
                    {activeGrowthPeriodRedux.includes('Jan') ? (
                      <Tooltip placement="top" title="Winter" enterTouchDelay={0}>
                        <TableCell
                          sx={{
                            backgroundColor: CustomStyles().darkGreen,
                            padding: 0,
                          }}
                          colSpan="2"
                        >
                          <Typography variant="body1">
                            <AcUnit sx={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell sx={{ borderBottom: '5px solid white', padding: 0 }} colSpan="2" />
                    )}
                    {activeGrowthPeriodRedux.includes('Mar') ? (
                      <Tooltip placement="top" title="Spring" enterTouchDelay={0}>
                        <TableCell
                          sx={{
                            backgroundColor: CustomStyles().darkGreen,
                            padding: 0,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            <LocalFlorist sx={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell sx={{ borderBottom: '5px solid white', padding: 0 }} colSpan="3" />
                    )}
                    {activeGrowthPeriodRedux.includes('Jun') ? (
                      <Tooltip placement="top" title="Summer" enterTouchDelay={0}>
                        <TableCell
                          sx={{
                            backgroundColor: CustomStyles().darkGreen,
                            padding: 0,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            <WbSunny sx={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell sx={{ borderBottom: '5px solid white', padding: 0 }} colSpan="3" />
                    )}
                    {activeGrowthPeriodRedux.includes('Sep') ? (
                      <Tooltip placement="top" title="Fall" enterTouchDelay={0}>
                        <TableCell
                          sx={{
                            backgroundColor: CustomStyles().darkGreen,
                            padding: 0,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            {/* <Eco style={growthIcon} /> */}
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell sx={{ borderBottom: '5px solid white', padding: 0 }} colSpan="3" />
                    )}
                    {activeGrowthPeriodRedux.includes('Dec') ? (
                      <Tooltip placement="top" title="Winter" enterTouchDelay={0}>
                        <TableCell
                          sx={{
                            backgroundColor: CustomStyles().darkGreen,
                            padding: 0,
                          }}
                          colSpan="1"
                        >
                          <Typography variant="body1">
                            <AcUnit sx={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell sx={{ borderBottom: '5px solid white', padding: 0 }} colSpan="1" />
                    )}
                  </>
                )}
                <TableCell
                  style={{
                    borderBottom: '5px solid white',
                    padding: 0,
                    textAlign: 'center',

                  }}
                />
                {activeGrowthPeriodRedux.length > 0 ? (
                  <TableCell
                    sx={{
                      padding: 0,
                    }}
                  >
                    <Box>
                      <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                        <Typography variant="body2"> Legend</Typography>
                      </Button>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell sx={{ backgroundColor: 'white', padding: 0 }} />
                )}
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  borderRight: '5px solid white', backgroundColor: '#abd08f', padding: 0, width: '250px', textAlign: 'center',
                }}
                >
                  <Button
                    sx={{
                      textAlign: 'center', color: 'black', textTransform: 'none',
                    }}
                    onClick={() => sortByName()}
                  >
                    {' '}
                    Crop Name
                  </Button>
                </TableCell>
                {selectedGoalsRedux.length > 0 && (
                  <TableCell sx={{
                    borderRight: '5px solid white', backgroundColor: '#abd08f', padding: 0, width: '75px', textAlign: 'center',
                  }}
                  >
                    <Button sx={{ color: 'black', textTransform: 'none' }} onClick={() => sortByAverageGoals()}>
                      Average Rating
                    </Button>
                  </TableCell>
                )}
                {allMonths.map((month, index) => {
                  const growthMonth = checkIfGrowthMonth(month);
                  const growthMonthSeparator = growthMonth
                    ? !!(month === 'Feb' || month === 'May' || month === 'Aug' || month === 'Nov')
                    : false;
                  return (
                    <TableCell
                      sx={{ padding: 1, backgroundColor: '#abd08f', zIndex: -1 }}
                      key={`monthskey${index}`}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? 'activeGrowthMonth' : ''
                      } ${growthMonthSeparator ? 'growthMonthSeparator' : ''}`}
                      onClick={sortByPlantingWindow}
                    >
                      <Box>{month}</Box>
                    </TableCell>
                  );
                })}
                <TableCell sx={{
                  borderLeft: '5px solid white', backgroundColor: '#abd08f', padding: 0, width: '75px', textAlign: 'center',
                }}
                >
                  <Button sx={{ textAlign: 'center', color: 'black', textTransform: 'none' }} onClick={() => sortBySelectedCrops()}> My List </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cropDataRedux.length > 0 && (
                <RenderCrops
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                  setModalData={setModalData}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CropDetailsModal modalOpen={modalOpen} setModalOpen={setModalOpen} crop={modalData} />
    </>
  );
};

export default CropCalendarView;
