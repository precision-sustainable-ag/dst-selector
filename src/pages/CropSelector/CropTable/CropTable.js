/*
  This file contains the CropTable component
  The CropTable is the
  addCropToBasket manages adding crops to cart
*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { AddCircle, Sort } from '@mui/icons-material';
import {
  CustomStyles, sortCrops, sudoButtonStyle, getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropDataRender from './CropDataRender';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';
import { updateActiveCropData } from '../../../reduxStore/cropSlice';

const CropTableComponent = ({
  cropData, activeCropData, showGrowthWindow,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [legendModal, setLegendModal] = useState(false);
  const [tbodyHeight, setTbodyHeight] = useState(0);
  const [theadHeight, setTheadHeight] = useState(0);
  const [sortAlgo, setSortAlgo] = React.useState('');
  // const [nameSortFlag, setNameSortFlag] = useState(true);
  // const [averageGoalsFlag, setAverageGoalsFlag] = useState(true);
  // const [plantingWindowSortFlag, setPlantingWindowSortFlag] = useState(true);
  // const [cropGroupSortFlag, setCropGroupSortFlag] = useState(true);
  // const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);
  const activeCropDataShadow = activeCropData;
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  useEffect(() => {
    if (document.querySelector('thead.MuiTableHead-root.tableHeadWrapper')) {
      const theadComputedHeight = document
        .querySelector('thead.MuiTableHead-root.tableHeadWrapper')
        .getBoundingClientRect().height;

      setTbodyHeight(850 - theadComputedHeight);
      setTheadHeight(theadComputedHeight);
    }
  }, []);

  const handleModalOpen = (crop) => {
    setModalData(crop);
    setModalOpen(true);
  };

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };

  const updateActiveCropDataAction = (activeShadowValue) => {
    dispatchRedux(updateActiveCropData(activeShadowValue));
  };

  const sortByName = (nameSortFlag) => {
    sortCrops('Crop Name', activeCropDataShadow, nameSortFlag);
    // setNameSortFlag(!nameSortFlag);
  };

  const sortByAverageGoals = (averageGoalsFlag) => {
    sortCrops('Average Goals', activeCropDataShadow, averageGoalsFlag, selectedGoalsRedux);
    // setAverageGoalsFlag(!averageGoalsFlag);
    updateActiveCropDataAction(activeCropDataShadow);
  };
  const sortByPlantingWindow = (plantingWindowSortFlag) => {
    sortCrops('Planting Window', activeCropDataShadow, plantingWindowSortFlag);
    // setPlantingWindowSortFlag(!plantingWindowSortFlag);
  };

  const sortByCropGroup = (cropGroupSortFlag) => {
    sortCrops('Crop Group', activeCropDataShadow, cropGroupSortFlag);
    // setCropGroupSortFlag(!cropGroupSortFlag);
  };

  const sortBySelectedCrops = (selectedCropsSortFlag) => {
    const selectedCropsShadow = selectedCropsRedux;
    sortCrops('Selected Crops', activeCropDataShadow, selectedCropsSortFlag, selectedCropsShadow, updateActiveCropDataAction);
    // setSelectedCropsSortFlag(!selectedCropsSortFlag);
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

    sortCrops('Goal', activeCropDataShadow, flag, selectedGoalsRedux, updateActiveCropDataAction, goal);
  };

  const selectSortingAlgo = (event: SelectChangeEvent) => {
    const sortingAlgo = event.target.value;
    setSortAlgo(sortingAlgo);
    if (sortingAlgo === 'goalsAsc') {
      sortByAverageGoals(false);
    } else if (sortingAlgo === 'goalsDsc') {
      sortByAverageGoals(true);
    } else if (sortingAlgo === 'cropNameA-Z') {
      sortByName(true);
    } else if (sortingAlgo === 'cropNameZ-A') {
      sortByName(false);
    } else if (sortingAlgo === 'cropGroupA-Z') {
      sortByCropGroup(true);
    } else if (sortingAlgo === 'cropGroupZ-A') {
      sortByCropGroup(false);
    } else if (sortingAlgo === 'plantingWindowAsc') {
      sortByPlantingWindow(true);
    } else if (sortingAlgo === 'plantingWindowDsc') {
      sortByPlantingWindow(false);
    } else if (sortingAlgo === 'myListA-Z') {
      sortBySelectedCrops(true);
    } else if (sortingAlgo === 'myListZ-A') {
      sortBySelectedCrops(false);
    }
  };

  return cropData.length !== 0 ? (
    <>
      <TableContainer className="table-responsive calendarViewTableWrapper" component="div">
        <Table stickyHeader className="table table-borderless table-sm" id="primaryCropTable">
          <TableHead className="tableHeadWrapper">
            <TableRow className="theadFirst">
              <TableCell
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  visibility: 'hidden',
                }}
                colSpan="2"
              >
                blank
              </TableCell>

              {selectedGoalsRedux.length > 0 && (
                <TableCell
                  colSpan={selectedGoalsRedux.length}
                  style={{
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                  }}
                >
                  <Tooltip
                    arrow
                    placement="top"
                    title={(
                      <div className="filterTooltip">
                        <p>See filter bar for cover cropping goals.</p>
                      </div>
                    )}
                  >
                    <Typography variant="body1" style={sudoButtonStyle}>
                      COVER CROPPING GOALS
                    </Typography>
                  </Tooltip>
                </TableCell>
              )}

              <TableCell
                style={{
                  backgroundColor: '#abd08f',
                  textAlign: 'center',
                  borderRight: '5px solid white',
                }}
              >
                <Button
                  startIcon={<AddCircle />}
                  onClick={handleLegendModal}
                  style={{ color: '#000' }}
                >
                  {' '}
                  <Typography variant="body2">LEGEND</Typography>
                </Button>
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
              </TableCell>
              {selectedGoalsRedux.length > 0 && (
                <TableCell
                  colSpan={selectedGoalsRedux.length}
                  style={{
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="select-sorting">Sort by</InputLabel>
                    <Select
                      labelId="sorting-selector-label"
                      id="sorting-selector"
                      value={sortAlgo}
                      label="Select"
                      onChange={selectSortingAlgo}
                    >
                      <MenuItem value="goalsDsc">Average Goal Rating Highest-Least</MenuItem>
                      <MenuItem value="goalsAsc">Average Goal Rating Least-Highest</MenuItem>
                      <MenuItem value="cropNameA-Z">Crop Name A-Z</MenuItem>
                      <MenuItem value="cropNameZ-A">Crop Name Z-A</MenuItem>
                      <MenuItem value="cropGroupA-Z">Crop Group A-Z</MenuItem>
                      <MenuItem value="cropGroupZ-A">Crop Group Z-A</MenuItem>
                      <MenuItem value="plantingWindowAsc">Planting Window Ascending</MenuItem>
                      <MenuItem value="plantingWindowDsc">Planting Window Desceding</MenuItem>
                      <MenuItem value="myListA-Z">Selected Cover Crops A-Z</MenuItem>
                      <MenuItem value="myListZ-A">Selected Cover Crops Z-A</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              )}
              {/* <TableCell
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  visibility: 'hidden',
                }}
              >
                blank
              </TableCell> */}
            </TableRow>
            <TableRow className="theadSecond">
              <TableCell
                style={{
                  minWidth: '320px',
                  backgroundColor: '#abd08f',
                  borderRight: '5px solid white',
                }}
              >
                <Typography variant="body1" style={sudoButtonStyle}>
                  COVER CROPS
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  minWidth: '240px',
                  backgroundColor: '#abd08f',
                  borderRight: '5px solid white',
                }}
              >
                <Typography variant="body1" style={sudoButtonStyle}>
                  Growth Traits
                </Typography>
              </TableCell>
              {selectedGoalsRedux.length > 0
                && selectedGoalsRedux.map((goal, index) => {
                  const lastIndex = selectedGoalsRedux.length - 1;
                  return (
                    <TableCell
                      key={index}
                      style={{
                        wordBreak: 'break-word',
                        maxWidth: '185px',
                        backgroundColor: '#abd08f',
                        textAlign: 'center',
                        borderRight: index === lastIndex && '5px solid white',
                      }}
                    >
                      <Typography variant="body1">
                        {/* <Button>{goal.toUpperCase()}</Button> */}
                        <Tooltip
                          placement="bottom"
                          arrow
                          title={(
                            <div className="filterTooltip text-capitalize">
                              <p>{goal}</p>
                            </div>
                          )}
                        >
                          <Button
                            onClick={() => sortByGoal(goal, index)}
                          >
                            {index === 0
                              && (
                                <Sort
                                  style={{
                                    color:
                                    goal1SortFlag
                                      ? CustomStyles().secondaryProgressBtnColor
                                      : CustomStyles().progressColor,
                                    transform: goal1SortFlag && 'rotate(180deg)',
                                  }}
                                />
                              )}
                            {index === 1
                              && (
                                <Sort
                                  style={{
                                    color:
                                    goal2SortFlag
                                      ? CustomStyles().secondaryProgressBtnColor
                                      : CustomStyles().progressColor,
                                    transform: goal2SortFlag && 'rotate(180deg)',
                                  }}
                                />
                              )}
                            {index === 2
                              && (
                                <Sort
                                  style={{
                                    color:
                                    goal3SortFlag
                                      ? CustomStyles().secondaryProgressBtnColor
                                      : CustomStyles().progressColor,
                                    transform: goal3SortFlag && 'rotate(180deg)',
                                  }}
                                />
                              )}

                            <Typography variant="body2" style={{ color: '#000' }}>
                              {`Goal ${index + 1}`}
                            </Typography>
                          </Button>

                        </Tooltip>
                      </Typography>
                    </TableCell>
                  );
                })}

              {showGrowthWindow && (
                <TableCell
                  style={{
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                    borderRight: '5px solid white',
                    width: '180px',
                  }}
                >
                  <Typography variant="body1" style={sudoButtonStyle}>
                    PLANTING WINDOW
                  </Typography>
                </TableCell>
              )}

              <TableCell
                style={{
                  backgroundColor: '#abd08f',
                  textAlign: 'center',
                  minWidth: '165px',
                }}
              >
                <Typography variant="body1" style={sudoButtonStyle}>
                  MY LIST
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="tableBodyWrapper">
            {activeCropData.length > 0 ? (
              <>
                {activeCropData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={42}>
                      <div
                        style={{
                          width: '100%',
                          height: tbodyHeight,
                          position: 'absolute',
                          top: theadHeight,
                          backgroundColor: 'rgba(255,255,255, 0.1)',
                          zIndex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(171, 208, 143, 1)',
                            minHeight: '100px',
                            zIndex: 2,
                          }}
                          className="px-5 py-5 d-flex justify-content-center align-items-center text-center"
                        >
                          <div>
                            <Typography variant="body1" gutterBottom className="pb-2">
                              No cover crops match your selected Cover Crop Property filters.
                            </Typography>
                            <Typography variant="body1" gutterBottom className="pb-2">
                              Consider expanding your Cover Crop Property filter criteria.
                            </Typography>
                            <Typography variant="body1" gutterBottom className="">
                              Alternatively, clear all Cover Crop Property filters.
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                <CropDataRender
                  activeCropData={activeCropData}
                  showGrowthWindow={showGrowthWindow}
                  handleModalOpen={handleModalOpen}
                />
              </>
            ) : (
              <TableRow>
                <TableCell>
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
    <div className="table-responsive calendarViewTableWrapper">
      <div className="circularCentered">
        <CircularProgress size="6em" />
      </div>
    </div>
  );
};

export default CropTableComponent;
