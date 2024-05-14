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
  Box,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  allMonths,
  sortCrops,
  getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import RenderCrops from './RenderCrops';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';

const CropCalendarView = () => {
  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  // useState vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  // sorting flags
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [plantingSortFlag, setPlantingSortFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);

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

  const sortByGoal = (goal, index) => {
    let flag = '';

    if (index === 0) {
      flag = goal1SortFlag;
      setGoal1SortFlag(!goal1SortFlag);
    } else if (index === 1) {
      flag = goal2SortFlag;
      setGoal2SortFlag(!goal2SortFlag);
    } else {
      flag = goal3SortFlag;
      setGoal3SortFlag(!goal3SortFlag);
    }

    sortCrops('Goal', cropDataRedux, flag, selectedGoalsRedux, goal);
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
                  colSpan={1 + selectedGoalsRedux.length}
                >
                  <Legend legendData={legendData} modal />
                </TableCell>
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
                <TableCell
                  style={{
                    borderBottom: '5px solid white',
                    padding: 0,
                    textAlign: 'center',
                  }}
                />
                <TableCell sx={{ backgroundColor: 'white', padding: 0 }} />
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
                {selectedGoalsRedux.length > 0
                && selectedGoalsRedux.map((goal, index) => (
                  <TableCell
                    key={index}
                    style={{
                      wordBreak: 'break-word',
                      backgroundColor: '#abd08f',
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
                      <Button
                        onClick={() => sortByGoal(goal, index)}
                        variant="body1"
                        sx={{ textTransform: 'none' }}
                      >
                        {`Goal ${index + 1}`}
                      </Button>
                    </Tooltip>
                  </TableCell>
                ))}
                {allMonths.map((month, index) => (
                  <TableCell
                    sx={{ padding: 1, backgroundColor: '#abd08f', zIndex: -1 }}
                    key={`monthskey${index}`}
                    className="calendarSecondHeadMonth"
                    onClick={sortByPlantingWindow}
                  >
                    <Box>{month}</Box>
                  </TableCell>
                ))}
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
