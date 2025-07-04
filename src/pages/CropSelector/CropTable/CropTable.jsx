/* eslint-disable max-len */
/*
  This file contains the CropTable component
*/
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { CalendarToday } from '@mui/icons-material';
import StraightIcon from '@mui/icons-material/Straight';
import { PSAButton, PSATooltip, PSALoadingSpinner } from 'shared-react-components/src';
import {
  sortCrops, sudotype,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import RenderTableItems from './RenderTableItems';
import { setTableWidth } from '../../../reduxStore/pageSlice';
import InformationSheet from '../../../components/InformationSheet/InformationSheet';
import useIsMobile from '../../../hooks/useIsMobile';

const CropTable = ({
  listView,
  setListView,
  showGrowthWindow,
}) => {
  // redux vars
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const activeCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropIds);
  // useState vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [columnSort, setColumnSort] = useState('');

  // sorting flags
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [plantingSortFlag, setPlantingSortFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);
  const [myListSortFlag, setMyListSortFlag] = useState(true);
  const [currentGoalSortFlag, setCurrentGoalSortFlag] = useState(true);

  const isMobile = useIsMobile('md');

  const handleModalOpen = (crop) => {
    setModalData(crop);
    setModalOpen(true);
  };

  const sortByName = () => {
    setColumnSort('');
    sortCrops('Crop Name', cropDataRedux, nameSortFlag);
    setNameSortFlag(!nameSortFlag);
    setColumnSort('name');
  };

  const sortByAverageGoals = () => {
    sortCrops('Average Goals', cropDataRedux, true, selectedGoalsRedux);
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
    if (cropDataRedux.length !== 0) {
      sortByAverageGoals();
    }
  }, []);

  const tableRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (tableRef.current) {
      // const tableWidth = tableRef.current.offsetWidth;
      const tableWidth = tableRef.current.scrollWidth;
      // tableWidth += 1000;
      dispatchRedux(setTableWidth(tableWidth));
    }
  }, [dispatchRedux, tableRef]);
  return cropDataRedux.length !== 0 ? (
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
          style={{ marginBottom: '7px' }}
          startIcon={<ListIcon style={{ fontSize: 'larger' }} />}
          buttonType="PillButton"
          title="CROP LIST"
        />
        <PSAButton
          onClick={() => setListView(true)}
          selected={listView}
          style={{ marginBottom: '7px' }}
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
          display: 'block',
          width: '100%',
        }}
      >
        <Table stickyHeader sx={{ borderSpacing: '7px', padding: 0 }} ref={tableRef}>
          <TableHead>
            <TableRow>
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
                  onClick={() => sortByName()}
                  buttonType=""
                  sx={{ color: 'black', textTransform: 'none' }}
                  variant="body1"
                  title={(
                    <>
                      Cover Crops
                      {columnSort === 'name' && <StraightIcon className={nameSortFlag ? '' : 'rotate180'} />}
                    </>
                  )}
                />
              </TableCell>
              {cropDataRedux[0].keyTraits.length > 0
                && (
                  <TableCell
                    sx={{ padding: 0 }}
                    style={{
                      backgroundColor: '#abd08f',
                    }}
                  >
                    <Typography variant="body1" style={sudotype}>
                      Key Traits
                    </Typography>
                  </TableCell>
                )}
              {selectedGoalsRedux.length > 0
                && selectedGoalsRedux.map((goal, index) => (
                  <TableCell
                    sx={{ padding: 0 }}
                    key={index}
                    style={{
                      wordBreak: 'break-word',
                      backgroundColor: columnSort === `goal${index}` ? '#49a8ab' : '#abd08f',
                      textAlign: 'center',
                    }}
                  >
                    <PSATooltip
                      placement="bottom"
                      arrow
                      enterTouchDelay={0}
                      title={goal}
                      tooltipContent={(
                        <Box>
                          <PSAButton
                            buttonType=""
                            onClick={() => sortByGoal(goal, index, `goal${index}`)}
                            variant="body1"
                            sx={{ textTransform: 'none' }}
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

              {showGrowthWindow && (
              <TableCell
                sx={{ padding: 0 }}
                style={{
                  backgroundColor: columnSort === 'plantingWindow' ? '#49a8ab' : '#abd08f',
                  textAlign: 'center',
                }}
              >
                <PSAButton
                  buttonType=""
                  variant="body1"
                  style={{
                    textTransform: 'none',
                  }}
                  onClick={() => sortByPlantingWindow()}
                  title={(
                    <>
                      Planting Window
                      {columnSort === 'plantingWindow' && <StraightIcon style={{ margin: '0px' }} className={plantingSortFlag ? '' : 'rotate180'} />}
                    </>
                    )}
                />
              </TableCell>
              )}

              <TableCell
                sx={{ padding: 0 }}
                style={{
                  backgroundColor: columnSort === 'myList' ? '#49a8ab' : '#abd08f',
                  textAlign: 'center',
                }}
              >
                <PSAButton
                  buttonType=""
                  variant="body1"
                  style={{ textTransform: 'none' }}
                  onClick={() => sortBySelectedCrops()}
                  title={(
                    <>
                      My Crops
                      {columnSort === 'myList' && <StraightIcon style={{ margin: '0px' }} className={myListSortFlag ? '' : 'rotate180'} />}
                    </>
                  )}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody data-test="crop-list-tbody">

            {activeCropIdsRedux.length > 0 ? (
              <RenderTableItems
                showGrowthWindow={showGrowthWindow}
                handleModalOpen={handleModalOpen}
              />
            ) : (
              <TableRow data-test="crop-list-tr">
                <TableCell
                  sx={{ padding: 0 }}
                >
                  No cover crops match your selected Cover Crop Property filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <InformationSheet
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  ) : (
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
  );
};

export default CropTable;
