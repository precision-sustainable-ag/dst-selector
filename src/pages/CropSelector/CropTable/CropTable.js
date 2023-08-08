/*
  This file contains the CropTable component
  The CropTable is the
  addCropToBasket manages adding crops to cart
*/
import React, { useContext, useEffect, useState } from 'react';
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
import { AddCircle, Sort } from '@mui/icons-material';
import {
  CustomStyles, sortCrops, sudoButtonStyle, getLegendDataBasedOnCouncil,
} from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropDataRender from './CropDataRender';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import Legend from '../../../components/Legend/Legend';

const CropTableComponent = ({
  cropData, activeCropData, showGrowthWindow,
}) => {
  const { state, dispatch } = useContext(Context);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [legendModal, setLegendModal] = useState(false);
  const [tbodyHeight, setTbodyHeight] = useState(0);
  const [theadHeight, setTheadHeight] = useState(0);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const [averageGoalsFlag, setAverageGoalsFlag] = useState(true);
  const [goal1SortFlag, setGoal1SortFlag] = useState(true);
  const [goal2SortFlag, setGoal2SortFlag] = useState(true);
  const [goal3SortFlag, setGoal3SortFlag] = useState(true);
  const activeCropDataShadow = activeCropData;

  const legendData = getLegendDataBasedOnCouncil(state.councilShorthand);

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
    dispatch({
      type: 'UPDATE_ACTIVE_CROP_DATA',
      data: {
        value: activeShadowValue,
      },
    });
  };

  const sortByName = () => {
    sortCrops('Crop Name', activeCropDataShadow, nameSortFlag);
    setNameSortFlag(!nameSortFlag);
  };

  const sortByAverageGoals = () => {
    sortCrops('Average Goals', activeCropDataShadow, averageGoalsFlag, state.selectedGoals);
    setAverageGoalsFlag(!averageGoalsFlag);
    updateActiveCropDataAction(activeCropDataShadow);
  };

  const sortBySelectedCrops = () => {
    const selectedCropsShadow = state.selectedCrops;
    sortCrops('Selected Crops', activeCropDataShadow, selectedCropsSortFlag, selectedCropsShadow, updateActiveCropDataAction);
    setSelectedCropsSortFlag(!selectedCropsSortFlag);
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

    sortCrops('Goal', activeCropDataShadow, flag, state.selectedGoals, updateActiveCropDataAction, goal);
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

              {state.selectedGoals.length > 0 && (
                <TableCell
                  colSpan={state.selectedGoals.length}
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
                    <Button
                      onClick={() => sortByAverageGoals()}
                    >
                      <Sort
                        style={{
                          color:
                            averageGoalsFlag
                              ? CustomStyles().secondaryProgressBtnColor
                              : CustomStyles().progressColor,
                          transform: averageGoalsFlag && 'rotate(180deg)',
                        }}
                      />
                      &nbsp;
                      {' '}
                      <Typography variant="body2" style={{ color: '#000' }}>
                        COVER CROPPING GOALS
                      </Typography>
                    </Button>
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
              <TableCell
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  visibility: 'hidden',
                }}
              >
                blank
              </TableCell>
            </TableRow>
            <TableRow className="theadSecond">
              <TableCell
                style={{
                  minWidth: '320px',
                  backgroundColor: '#abd08f',
                  borderRight: '5px solid white',
                }}
              >
                {/* <Button onClick={sortCropsByName}> */}
                <Button onClick={() => sortByName()}>
                  <Sort
                    style={{
                      color: nameSortFlag
                        ? CustomStyles().secondaryProgressBtnColor
                        : CustomStyles().progressColor,
                      transform: nameSortFlag && 'rotate(180deg)',
                    }}
                  />
                  &nbsp;
                  {' '}
                  <Typography variant="body1" style={{ color: '#000' }}>
                    COVER CROPS
                  </Typography>
                </Button>
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
              {state.selectedGoals.length > 0
                && state.selectedGoals.map((goal, index) => {
                  const lastIndex = state.selectedGoals.length - 1;
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
                    {' '}
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
                <Button onClick={() => sortBySelectedCrops()}>
                  <Sort
                    style={{
                      color: selectedCropsSortFlag
                        ? CustomStyles().secondaryProgressBtnColor
                        : CustomStyles().progressColor,
                      transform: selectedCropsSortFlag && 'rotate(180deg)',
                    }}
                  />
                  &nbsp;
                  <Typography variant="body1" style={{ color: '#000' }}>
                    MY LIST
                  </Typography>
                </Button>
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
