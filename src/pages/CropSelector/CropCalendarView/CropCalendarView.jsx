/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
*/

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  AcUnit, AddCircle, CalendarToday, LocalFlorist, WbSunny,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PSAButton, PSATooltip, PSALoadingSpinner } from 'shared-react-components/src';
import StraightIcon from '@mui/icons-material/Straight';
import { allMonths, CustomStyles, sortCrops } from '../../../shared/constants';

import '../../../styles/cropCalendarViewComponent.scss';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import { setTableWidth } from '../../../reduxStore/pageSlice';

const growthIcon = {
  color: 'white',
};

const CropCalendarView = ({ listView, setListView }) => {
  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const activeGrowthPeriodRedux = useSelector(
    (stateRedux) => stateRedux.cropData.activeGrowthPeriod,
  );

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) || /Mobi|Android/i.test(navigator.userAgent);

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
        <Grid
          item
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
          }}
        >
          <PSALoadingSpinner />
        </Grid>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2, // Adjust spacing between buttons
              marginBottom: 2, // Space between buttons and table
            }}
          >
            <PSAButton
              onClick={() => setListView(false)}
              selected={!listView}
              startIcon={<ListIcon style={{ fontSize: 'larger' }} />}
              buttonType="PillButton"
              data-test="crop-list-btn"
              title="CROP LIST"
            />
            <PSAButton
              onClick={() => setListView(true)}
              selected={listView}
              startIcon={<CalendarToday style={{ fontSize: 'larger' }} />}
              buttonType="PillButton"
              title="CROP CALENDAR"
            />
          </Box>
          <TableContainer
            component="div"
            sx={{
              lineHeight: '0.5',
              overflowX: isMobile ? 'auto' : 'initial',
              overflowY: isMobile ? 'auto' : 'initial',
              maxHeight: isMobile ? '700px' : 'auto',
              maxWidth: isMobile ? '100vw' : 'auto',
              display: isMobile ? 'block' : 'block',
              width: '100%',
            }}
          >
            <Table
              stickyHeader
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
                minWidth: '600px', // Ensure the table doesn't shrink too much
                width: '100%', // Full width but allows scrolling
              }}
              ref={tableRef}
            >
              <TableHead
                sx={{
                  zIndex: isMobile ? 19 : -1,
                  position: isMobile ? 'sticky' : 'static',
                  top: isMobile ? 0 : 'auto',
                }}
              >
                <TableRow style={{ paddingBottom: '5px', whiteSpace: 'nowrap' }}>
                  {activeGrowthPeriodRedux.length === 0 && (
                    <>
                      {activeGrowthPeriodRedux.includes('Jan') ? (
                        <PSATooltip
                          placement="top"
                          title="Winter"
                          enterTouchDelay={0}
                          tooltipContent={(
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
                          )}
                        />
                      ) : (
                        <TableCell
                          sx={{ borderBottom: '5px solid white', padding: 0 }}
                          colSpan="2"
                        />
                      )}
                      {activeGrowthPeriodRedux.includes('Mar') ? (
                        <PSATooltip
                          placement="top"
                          title="Spring"
                          enterTouchDelay={0}
                          tooltipContent={(
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
                          )}
                        />
                      ) : (
                        <TableCell
                          sx={{ borderBottom: '5px solid white', padding: 0 }}
                          colSpan="3"
                        />
                      )}
                      {activeGrowthPeriodRedux.includes('Jun') ? (
                        <PSATooltip
                          placement="top"
                          title="Summer"
                          enterTouchDelay={0}
                          tooltipContent={(
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
                          )}
                        />
                      ) : (
                        <TableCell
                          sx={{ borderBottom: '5px solid white', padding: 0 }}
                          colSpan="3"
                        />
                      )}
                      {activeGrowthPeriodRedux.includes('Sep') ? (
                        <PSATooltip
                          placement="top"
                          title="Fall"
                          enterTouchDelay={0}
                          tooltipContent={(
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
                          )}
                        />
                      ) : (
                        <TableCell
                          sx={{ borderBottom: '5px solid white', padding: 0 }}
                          colSpan="3"
                        />
                      )}
                      {activeGrowthPeriodRedux.includes('Dec') ? (
                        <PSATooltip
                          placement="top"
                          title="Winter"
                          enterTouchDelay={0}
                          tooltipContent={(
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
                          )}
                        />
                      ) : (
                        <TableCell
                          sx={{ borderBottom: '5px solid white', padding: 0 }}
                          colSpan="1"
                        />
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
                          buttonType=""
                          startIcon={<AddCircle />}
                          onClick={handleLegendModal}
                          title={<Typography variant="body2"> Legend</Typography>}
                        />
                      </Box>
                    </TableCell>
                  ) : (
                    <TableCell sx={{ backgroundColor: 'white', padding: 0 }} />
                  )}
                </TableRow>
                <TableRow style={{ marginTop: '5px' }}>
                  {/* <TableCell sx={{
                    borderRight: '5px solid white', backgroundColor: columnSort === 'name' ? '#49a8ab' : '#abd08f', padding: 0, width: '250px', textAlign: 'center',
                  }}
                  > */}
                  <TableCell
                    sx={{
                      left: isMobile ? 0 : 'auto',
                      zIndex: isMobile ? 20 : 2,
                      borderRight: '5px solid white',
                      backgroundColor: columnSort === 'name' ? '#49a8ab' : '#abd08f',
                      padding: 0,
                      minWidth: isMobile ? '30px' : 'auto',
                      width: isMobile ? 'auto' : '250px',
                      textAlign: 'center',
                    }}
                  >
                    <PSAButton
                      buttonType=""
                      sx={{
                        textAlign: 'center',
                        color: 'black',
                        textTransform: 'none',
                      }}
                      onClick={() => sortByName()}
                      title={(
                        <>
                          {' '}
                          Crop Name
                          {columnSort === 'name' && (
                            <StraightIcon className={nameSortFlag ? '' : 'rotate180'} />
                          )}
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
                        <PSATooltip
                          placement="bottom"
                          arrow
                          enterTouchDelay={0}
                          title={goal}
                          tooltipContent={(
                            <Box tabIndex="0">
                              <PSAButton
                                onClick={() => sortByGoal(goal, index, `goal${index}`)}
                                variant="body1"
                                buttonType=""
                                sx={{
                                  textTransform: 'none',
                                  padding: '0px',
                                }}
                                title={(
                                  <>
                                    {`Goal ${index + 1}`}
                                    {columnSort === `goal${index}` && (
                                      <StraightIcon
                                        style={{ margin: '0px' }}
                                        className={currentGoalSortFlag ? '' : 'rotate180'}
                                      />
                                    )}
                                  </>
                                )}
                              />
                            </Box>
                          )}
                        />
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
                  <TableCell
                    sx={{
                      borderLeft: '5px solid white',
                      backgroundColor: columnSort === 'myList' ? '#49a8ab' : '#abd08f',
                      padding: 0,
                      width: '75px',
                      textAlign: 'center',
                    }}
                  >
                    <PSAButton
                      sx={{
                        textAlign: 'center',
                        color: 'black',
                        textTransform: 'none',
                        padding: '0px',
                      }}
                      onClick={() => sortBySelectedCrops()}
                      title={(
                        <>
                          My List
                          {columnSort === 'myList' && (
                            <StraightIcon
                              style={{ margin: '0px' }}
                              className={myListSortFlag ? '' : 'rotate180'}
                            />
                          )}
                        </>
                      )}
                      buttonType=""
                    />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody data-test="crop-list-tbody">
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
        </>
      )}
      <CropDetailsModal modalOpen={modalOpen} setModalOpen={setModalOpen} crop={modalData} />
    </>
  );
};

export default CropCalendarView;
