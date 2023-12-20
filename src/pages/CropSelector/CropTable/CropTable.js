/* eslint-disable max-len */
/*
  This file contains the CropTable component
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import {
  sortCrops, sudoButtonStyle, getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';
import RenderTableItems from './RenderTableItems';

const CropTable = ({
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

  // sorting flags
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [plantingSortFlag, setPlantingSortFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  const handleModalOpen = (crop) => {
    setModalData(crop);
    setModalOpen(true);
  };

  const sortByName = () => {
    sortCrops('Crop Name', cropDataRedux, nameSortFlag);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByAverageGoals = () => {
    sortCrops('Average Goals', cropDataRedux, true, selectedGoalsRedux);
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
    sortByAverageGoals();
  }, []);

  return cropDataRedux.length !== 0 ? (
    <>
      <TableContainer component="div">
        <Table stickyHeader sx={{ borderSpacing: '7px', padding: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ padding: 0 }}
                colSpan={7}
              >
                <Legend
                  legendData={legendData}
                  modal
                />
              </TableCell>

            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  padding: 0,
                  backgroundColor: '#abd08f',
                  width: 300,
                  textAlign: 'center',
                }}
              >
                <Button onClick={() => sortByName()} sx={{ color: 'black', textTransform: 'none' }} variant="body1">
                  Cover Crops
                </Button>
              </TableCell>
              <TableCell
                sx={{ padding: 0 }}
                style={{
                  backgroundColor: '#abd08f',
                }}
              >
                <Typography variant="body1" style={sudoButtonStyle}>
                  Growth Traits
                </Typography>
              </TableCell>
              {selectedGoalsRedux.length > 0
                && selectedGoalsRedux.map((goal, index) => (
                  <TableCell
                    sx={{ padding: 0 }}
                    key={index}
                    style={{
                      wordBreak: 'break-word',
                      backgroundColor: '#abd08f',
                      textAlign: 'center',
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

              {showGrowthWindow && (
                <TableCell
                  sx={{ padding: 0 }}
                  style={{
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    variant="body1"
                    style={{
                      textTransform: 'none',
                    }}
                    onClick={() => sortByPlantingWindow()}
                  >
                    Planting Window
                  </Button>
                </TableCell>
              )}

              <TableCell
                sx={{ padding: 0 }}
                style={{
                  backgroundColor: '#abd08f',
                  textAlign: 'center',
                }}
              >
                <Button variant="body1" style={{ textTransform: 'none' }} onClick={() => sortBySelectedCrops()}>
                  My List
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {activeCropIdsRedux.length > 0 ? (
              <RenderTableItems
                showGrowthWindow={showGrowthWindow}
                handleModalOpen={handleModalOpen}
              />
            ) : (
              <TableRow>
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

      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  ) : (
    <Box>
      <CircularProgress size="6em" />
    </Box>
  );
};

export default CropTable;
