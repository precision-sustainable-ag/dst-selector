/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
*/

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

  // redux vars
  const cropDataStateRedux = useSelector((stateRedux) => stateRedux.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const [legendModal, setLegendModal] = useState(false);
  // const [nameSortFlag, setNameSortFlag] = useState(true);
  // const [goalsSortFlag, setGoalsSortFlag] = useState(true);
  // const [selectedCropsSortFlag, setSelectedCropsFlag] = useState(true);
  // const [plantingWindowSortFlag, setPlantingWindowSortFlag] = useState(true);
  // const [cropGroupSortFlag, setCropGroupSortFlag] = useState(true);
  // let cropGroupSortFlag = true;
  const [sortAlgo, setSortAlgo] = React.useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  // useState vars
  const { activeGrowthPeriod, selectedCrops } = cropDataStateRedux;
  const activeCropDataShadow = activeCropData;
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  const dispatchValue = (value) => dispatchRedux(updateActiveCropData(value));

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };

  const checkIfGrowthMonth = (month) => {
    if (activeGrowthPeriod.length !== 0) {
      if (activeGrowthPeriod.includes(month)) return true;
      return false;
    }
    return false;
  };

  const sortReset = (goalsSortFlag) => {
    sortCrops('Average Goals', activeCropDataShadow, goalsSortFlag, selectedCrops);
    // setGoalsSortFlag(!goalsSortFlag);
    dispatchValue(activeCropDataShadow);
  };

  const sortCropsByName = (nameSortFlag) => {
    sortCrops('Crop Name', activeCropDataShadow, nameSortFlag);
  };

  const sortByPlantingWindow = (plantingWindowSortFlag) => {
    sortCrops('Planting Window', activeCropDataShadow, plantingWindowSortFlag);
    // setPlantingWindowSortFlag(!plantingWindowSortFlag);
  };

  const sortByCropGroup = (cropGroupSortFlag) => {
    sortCrops('Crop Group', activeCropDataShadow, cropGroupSortFlag);
  };

  const sortBySelectedCrops = (selectedCropsSortFlag) => {
    const selectedCropsShadow = selectedCrops;
    sortCrops('Selected Crops', activeCropDataShadow, selectedCropsSortFlag, selectedCropsShadow, dispatchValue);
  };
  // sorting function drop down selection
  const selectSortingAlgo = (event: SelectChangeEvent) => {
    const sortingAlgo = event.target.value;
    setSortAlgo(sortingAlgo);
    if (sortingAlgo === 'goalsAsc') {
      sortReset(false);
    } else if (sortingAlgo === 'goalsDsc') {
      sortReset(true);
    } else if (sortingAlgo === 'cropNameA-Z') {
      sortCropsByName(true);
    } else if (sortingAlgo === 'cropNameZ-A') {
      sortCropsByName(false);
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
                  colSpan={activeGrowthPeriod.length === 0 ? 2 : 1}
                  style={{ backgroundColor: 'white' }}
                />
                {activeGrowthPeriod.length === 0 ? (
                  <TableCell
                    colSpan="12"
                    style={{
                      borderBottom: '5px solid white',
                    }}
                  >
                    <div className="container-fluid">
                      <div className="row">
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
                          <Typography variant="body1" component="span">
                            <div style={sudoButtonStyleWithPadding}>COVER CROP GROWTH WINDOW</div>
                          </Typography>
                        </div>
                        <div className="col-4">
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
                        </div>
                        {/* <div className="col-3">
                          <Button
                            onClick={sortByPlantingWindow}
                            style={{ color: '#000' }}
                          >
                            <Typography variant="body1" component="span">
                              <div style={sudoButtonStyleWithPadding}>SORT BY PLANTING WINDOW</div>
                            </Typography>
                          </Button>
                        </div>
                        <div className="col-3">
                          <Button
                            onClick={sortByCropGroup}
                            style={{ color: '#000' }}
                          >
                            <Typography variant="body1" component="span">
                              <div style={sudoButtonStyleWithPadding}>SORT BY CROP GROUP</div>
                            </Typography>
                          </Button>
                        </div> */}
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
                    {activeGrowthPeriod.includes('Jan') ? (
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
                    {activeGrowthPeriod.includes('Mar') ? (
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
                    {activeGrowthPeriod.includes('Jun') ? (
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
                    {activeGrowthPeriod.includes('Sep') ? (
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
                    {activeGrowthPeriod.includes('Dec') ? (
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
                {activeGrowthPeriod.length > 0 ? (
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
                  {/* <Button style={{ color: '#000' }} onClick={sortCropsByName}> */}
                  <Typography variant="body2"> COVER CROPS </Typography>
                  {/* </Button> */}
                </TableCell>
                {selectedGoalsRedux.length > 0 && (
                  <TableCell style={{ width: '13%', borderRight: '5px solid white' }}>
                    <div className="col-12">
                      <Typography variant="body1">
                        {/* <Button style={{ color: '#000' }} onClick={sortReset}> */}
                        <Typography variant="body2"> AVERAGE GOAL RATING</Typography>
                        {/* </Button> */}
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
                  {/* <Button style={{ color: '#000' }} onClick={sortBySelectedCrops}> */}
                  <Typography variant="body2"> MY LIST </Typography>
                  {/* </Button> */}
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
