/* eslint-disable max-len */
/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
*/

import {
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
import ListIcon from '@mui/icons-material/List';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  AcUnit, AddCircle, CalendarToday, LocalFlorist, WbSunny,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StraightIcon from '@mui/icons-material/Straight';
import {
  allMonths,
  CustomStyles,
  sortCrops,
} from '../../../shared/constants';

import '../../../styles/cropCalendarViewComponent.scss';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import PSAButton from '../../../components/PSAComponents/PSAButton';
import { setTableWidth } from '../../../reduxStore/pageSlice';

const growthIcon = {
  color: 'white',
};

const CropCalendarView = ({
  listView,
  setListView,
}) => {
  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const activeGrowthPeriodRedux = useSelector((stateRedux) => stateRedux.cropData.activeGrowthPeriod);

  // useState vars
  const [legendModal, setLegendModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const [columnSort, setColumnSort] = useState('');

  // sorting flags
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [plantingSortFlag, setPlantingSortFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);
  const [myListSortFlag, setMyListSortFlag] = useState(true);
  const [currentGoalSortFlag, setCurrentGoalSortFlag] = useState(true);

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
    setColumnSort('');
    sortCrops('Crop Name', cropDataRedux, nameSortFlag);
    setNameSortFlag(!nameSortFlag);

    setColumnSort('name');
  };

  const sortByAverageGoals = () => {
    sortCrops('Average Goals', cropDataRedux, nameSortFlag, selectedGoalsRedux);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByPlantingWindow = () => {
    setColumnSort('');
    sortCrops('Planting Window', cropDataRedux, plantingSortFlag);
    setPlantingSortFlag(!plantingSortFlag);
    setColumnSort('plantingWindow');
  };

  const sortBySelectedCrops = () => {
    setColumnSort('');
    sortCrops('Selected Crops', cropDataRedux, true, selectedCropIdsRedux);
    setMyListSortFlag(!myListSortFlag);
    setColumnSort('myList');
  };

  const sortByGoal = (goal, index, column) => {
    setColumnSort('');
    let flag = '';

    if (index === 0) {
      flag = goal1SortFlag;
      setGoal1SortFlag(!goal1SortFlag);
      setCurrentGoalSortFlag(!goal1SortFlag);
    } else if (index === 1) {
      flag = goal2SortFlag;
      setGoal2SortFlag(!goal2SortFlag);
      setCurrentGoalSortFlag(!goal2SortFlag);
    } else {
      flag = goal3SortFlag;
      setGoal3SortFlag(!goal3SortFlag);
      setCurrentGoalSortFlag(!goal3SortFlag);
    }

    sortCrops('Goal', cropDataRedux, flag, selectedGoalsRedux, goal);
    if (column.length > 0) {
      setColumnSort(column);
    }
  };

  useEffect(() => {
    if (cropDataRedux.length !== 0) sortByAverageGoals();
  }, [cropDataRedux]);

  const tableRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.scrollWidth;
      dispatchRedux(setTableWidth(tableWidth));
    }
  }, [dispatchRedux, tableRef]);

  return (
    <>
      {ajaxInProgressRedux ? (
        <Box>
          <CircularProgress size="6em" />
        </Box>
      ) : (
        <TableContainer component="div" sx={{ lineHeight: '0.5', overflowX: 'initial' }}>
          <Table
            stickyHeader
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
            ref={tableRef}
          >
            <TableHead sx={{ zIndex: -1 }}>
              <TableRow style={{ paddingBottom: '5px', whiteSpace: 'nowrap' }}>
                <PSAButton
                  onClick={() => setListView(false)}
                  selected={!listView}
                  style={{ marginBottom: '7px' }}
                  startIcon={<ListIcon style={{ fontSize: 'larger' }} />}
                  data="CROP LIST"
                  buttonStyle="PillButton"
                />
                <PSAButton
                  onClick={() => setListView(true)}
                  selected={listView}
                  style={{ marginBottom: '7px' }}
                  startIcon={<CalendarToday style={{ fontSize: 'larger' }} />}
                  data="CROP CALENDAR"
                  buttonStyle="PillButton"
                />
                {activeGrowthPeriodRedux.length === 0 && (
                  <>
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
                      <PSAButton
                        startIcon={<AddCircle />}
                        onClick={handleLegendModal}
                        data={
                          <Typography variant="body2"> Legend</Typography>
                      }
                      />
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell sx={{ backgroundColor: 'white', padding: 0 }} />
                )}
              </TableRow>
              <TableRow style={{ marginTop: '5px' }}>
                <TableCell sx={{
                  borderRight: '5px solid white', backgroundColor: columnSort === 'name' ? '#49a8ab' : '#abd08f', padding: 0, width: '250px', textAlign: 'center',
                }}
                >
                  <PSAButton
                    sx={{
                      textAlign: 'center', color: 'black', textTransform: 'none',
                    }}
                    onClick={() => sortByName()}
                    data={(
                      <>
                        {' '}
                        Crop Name
                        {columnSort === 'name' && <StraightIcon className={nameSortFlag ? '' : 'rotate180'} />}
                      </>
                    )}
                  />
                </TableCell>
                {selectedGoalsRedux.length > 0
                && selectedGoalsRedux.map((goal, index) => (
                  <TableCell
                    key={index}
                    style={{
                      wordBreak: 'break-word',
                      backgroundColor: columnSort === `goal${index}` ? '#49a8ab' : '#abd08f',
                      textAlign: 'center',
                      borderRight: '5px solid white',
                      padding: 0,
                      width: '75px',
                    }}
                  >
                    <Tooltip
                      placement="bottom"
                      arrow
                      enterTouchDelay={0}
                      title={(
                        <p>{goal}</p>
                          )}
                    >
                      <PSAButton
                        onClick={() => sortByGoal(goal, index, `goal${index}`)}
                        variant="body1"
                        sx={{
                          textTransform: 'none',
                          padding: '0px',
                        }}
                        data={(
                          <>
                            {`Goal ${index + 1}`}
                            {columnSort === `goal${index}` && <StraightIcon style={{ margin: '0px' }} className={currentGoalSortFlag ? '' : 'rotate180'} />}
                          </>
                        )}
                      />

                    </Tooltip>
                  </TableCell>
                ))}
                {allMonths.map((month, index) => {
                  const growthMonth = checkIfGrowthMonth(month);
                  const growthMonthSeparator = growthMonth
                    ? !!(month === 'Feb' || month === 'May' || month === 'Aug' || month === 'Nov')
                    : false;
                  return (
                    <TableCell
                      sx={{ padding: 1, backgroundColor: '#abd08f', cursor: 'pointer' }}
                      key={`monthskey${index}`}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? 'activeGrowthMonth' : ''
                      } ${growthMonthSeparator ? 'growthMonthSeparator' : ''}`}
                      onClick={() => sortByPlantingWindow()}
                    >
                      <Box>{month}</Box>
                    </TableCell>
                  );
                })}
                <TableCell sx={{
                  borderLeft: '5px solid white', backgroundColor: columnSort === 'myList' ? '#49a8ab' : '#abd08f', padding: 0, width: '75px', textAlign: 'center',
                }}
                >
                  <PSAButton
                    sx={{
                      textAlign: 'center', color: 'black', textTransform: 'none', padding: '0px',
                    }}
                    onClick={() => sortBySelectedCrops()}
                    data={(
                      <>
                        My List
                        {columnSort === 'myList' && <StraightIcon style={{ margin: '0px' }} className={myListSortFlag ? '' : 'rotate180'} />}
                      </>
                      )}
                  />

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
