/* eslint-disable max-len */
/*
  This file contains the CropCalendarViewComponent
  The CropCalendarViewComponent shows the crops in calendar format
*/

import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { useSelector } from 'react-redux';
import {
  allMonths,
  CustomStyles,
  sortCrops,
  sudoButtonStyle,
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

const CropCalendarView = ({ activeCropData }) => {
  // redux vars
  const cropDataStateRedux = useSelector((stateRedux) => stateRedux.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);

  // useState vars
  const [legendModal, setLegendModal] = useState(false);
  const [sortAlgo, setSortAlgo] = React.useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const { activeGrowthPeriod } = cropDataStateRedux;
  const activeCropDataShadow = activeCropData;
  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

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

  const sortByAverageGoals = (averageGoalsFlag) => {
    sortCrops('Average Goals', activeCropDataShadow, averageGoalsFlag, selectedGoalsRedux);
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
    const selectedCropsShadow = cropDataRedux.filter((crop) => activeCropDataRedux.includes(crop.id)).filter((crop) => selectedCropsRedux.includes(crop.id));
    sortCrops('Selected Crops', activeCropDataShadow, selectedCropsSortFlag, selectedCropsShadow);
  };
  // sorting function drop down selection
  const selectSortingAlgo = (event) => {
    const sortingAlgo = event.target.value;
    setSortAlgo(sortingAlgo);
    if (sortingAlgo === 'goalsAsc') {
      sortByAverageGoals(false);
    } else if (sortingAlgo === 'goalsDsc') {
      sortByAverageGoals(true);
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
    } else if (sortingAlgo === 'myList') {
      sortBySelectedCrops(true);
    }
  };

  useEffect(() => {
    sortByAverageGoals(true);
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
          style={{ lineHeight: '0.5' }}
        >
          <Table
            stickyHeader
            className="table calendarViewTable table-sm table-borderless"
            style={{}}
          >
            <TableHead className="tableHeadWrapper">
              <TableRow className="calFirstHeadRow">
                <TableCell style={{ backgroundColor: 'white' }} colSpan={activeGrowthPeriod.length === 0 ? 2 : 1}>
                  <Legend
                    legendData={legendData}
                    modal
                  />
                </TableCell>
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
                              <MenuItem value="myList">Selected Cover Crops</MenuItem>
                            </Select>
                          </FormControl>
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
                    {activeGrowthPeriod.includes('Jan') ? (
                      <Tooltip placement="top" title="Winter" enterTouchDelay={0}>
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
                      <Tooltip placement="top" title="Spring" enterTouchDelay={0}>
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
                      <Tooltip placement="top" title="Summer" enterTouchDelay={0}>
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
                      <Tooltip placement="top" title="Fall" enterTouchDelay={0}>
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
                      <Tooltip placement="top" title="Winter" enterTouchDelay={0}>
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
                      <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                        <Typography variant="body2"> Legend</Typography>
                      </Button>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell style={{ backgroundColor: 'white' }} />
                )}
              </TableRow>
              <TableRow className="calSecondHeadRow">
                <TableCell style={{ width: '17%', borderRight: '5px solid white' }}>
                  <Typography variant="body2"> COVER CROPS </Typography>
                </TableCell>
                {selectedGoalsRedux.length > 0 && (
                  <TableCell style={{ width: '13%', borderRight: '5px solid white' }}>
                    <div className="col-12">
                      <Typography variant="body2"> AVERAGE GOAL RATING</Typography>
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
                  <Typography variant="body2"> MY LIST </Typography>
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
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default CropCalendarView;
