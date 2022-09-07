/*
  This file contains the CropTable component
  The CropTable is the 
  addCropToBasket manages adding crops to cart
  Styles are created using makeStyles
*/
import React, { useContext, useEffect, useState } from 'react';
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
} from '@mui/material';
import { AddCircle, Sort } from '@mui/icons-material';
import { CustomStyles, flipCoverCropName, sudoButtonStyle } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropCalendarViewComponent.scss';
import '../../styles/cropTable.scss';
import CropDetailsModalComponent from './CropDetailsModal';
import CropLegendModal from './CropLegendModal';
import CropDataRender from './CropDataRender';

const CropTableComponent = (props) => {
  const cropData = props.cropData || [];
  let activeCropData = props.activeCropData || [];

  const { state, dispatch } = useContext(Context);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showGrowthWindow, setShowGrowthWindow] = useState(true);
  const [legendModal, setLegendModal] = useState(false);
  const [tbodyHeight, setTbodyHeight] = useState(0);
  const [theadHeight, setTheadHeight] = useState(0);
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);

  useEffect(() => {
    if (document.querySelector('thead.MuiTableHead-root.tableHeadWrapper')) {
      const theadComputedHeight = document
        .querySelector('thead.MuiTableHead-root.tableHeadWrapper')
        .getBoundingClientRect().height;

      setTbodyHeight(850 - theadComputedHeight);
      setTheadHeight(theadComputedHeight);
    }
  }, []);

  useEffect(() => {
    props.showGrowthWindow ? setShowGrowthWindow(true) : setShowGrowthWindow(false);
  }, [props.showGrowthWindow]);

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

  const sortBySelectedCrops = () => {
    sortReset('selectedCrops');
    let selectedCropsShadow = state.selectedCrops;
    let activeCropDataShadow = props.activeCropData;

    if (selectedCropsSortFlag) {
      if (selectedCropsShadow.length > 0) {
        let selectedCropIds = [];
        selectedCropsShadow.forEach((crop) => {
          selectedCropIds.push(crop.id);
        });
        let newActiveShadow = activeCropDataShadow.map((crop) => {
          crop['inCart'] = selectedCropIds.includes(crop.fields.id);
          return crop;
        });

        if (newActiveShadow.length > 0) {
          newActiveShadow.sort((a) => {
            if (a.inCart) {
              return -1;
            } else {
              return 1;
            }
          });
          updateActiveCropDataAction(newActiveShadow);
        }
      }
    } else {
      // sort back to original values
      sortReset('selectedCrops');
    }
    setSelectedCropsSortFlag(!selectedCropsSortFlag);
  };

  const sortReset = (from = 'cropName') => {
    const { selectedGoals } = state;
    let activeCropDataShadow = props.activeCropData;
    selectedGoals
      .slice()
      .reverse()
      .forEach((goal) => {
        activeCropDataShadow.sort((a, b) => {
          if (a.fields[goal] && b.fields[goal]) {
            if (a.fields[goal] > b.fields[goal]) {
              return -1;
            } else {
              return 1;
            }
          }
          return 0;
        });
      });

    updateActiveCropDataAction(activeCropDataShadow);
  };

  const sortCropsByName = () => {
    let activeCropDataShadow = props.activeCropData;
    sortReset('cropName');

    if (nameSortFlag) {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          let firstCropName = flipCoverCropName(a.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          let secondCropName = flipCoverCropName(b.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          return firstCropName.localeCompare(secondCropName);
        });

        updateActiveCropDataAction(activeCropDataShadow);
      }
    } else {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          let firstCropName = flipCoverCropName(a.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          let secondCropName = flipCoverCropName(b.fields['Cover Crop Name'].toLowerCase()).replace(
            /\s+/g,
            '',
          );
          if (firstCropName < secondCropName) {
            return 1;
          }
          if (firstCropName > secondCropName) {
            return -1;
          }
          return 0;
        });

        // dispatch({
        //   type: 'UPDATE_ACTIVE_CROP_DATA',
        //   data: {
        //     value: activeCropDataShadow,
        //   },
        // });
        updateActiveCropDataAction(activeCropDataShadow);
      }
    }

    setNameSortFlag(!nameSortFlag);
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
                    title={
                      <div className="filterTooltip">
                        <p>See filter bar for cover cropping goals.</p>
                      </div>
                    }
                  >
                    <Button
                      onClick={() => {
                        props.sortAllCrops(props.sortPreference === 'desc' ? 'asc' : 'desc');
                      }}
                    >
                      <Sort
                        style={{
                          color:
                            props.sortPreference === 'asc'
                              ? CustomStyles().secondaryProgressBtnColor
                              : CustomStyles().progressColor,
                          transform: props.sortPreference === 'asc' && 'rotate(180deg)',
                        }}
                      />
                      &nbsp;{' '}
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

                <CropLegendModal
                  legendModal={legendModal}
                  handleLegendModal={handleLegendModal}
                  disableBackdropClick={false}
                />
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
                <Button onClick={sortCropsByName}>
                  <Sort
                    style={{
                      color: nameSortFlag
                        ? CustomStyles().secondaryProgressBtnColor
                        : CustomStyles().progressColor,
                      transform: nameSortFlag && 'rotate(180deg)',
                    }}
                  />
                  &nbsp;{' '}
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
              {state.selectedGoals.length > 0 &&
                state.selectedGoals.map((goal, index) => {
                  let lastIndex = state.selectedGoals.length - 1;
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
                          title={
                            <div className="filterTooltip text-capitalize">
                              <p>{goal}</p>
                            </div>
                          }
                        >
                          <div style={sudoButtonStyle}>{`Goal ${index + 1}`}</div>
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
                <Button onClick={sortBySelectedCrops}>
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

      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  ) : (
    <div className="table-responsive calendarViewTableWrapper">
      <div className="circularCentered">
        <CircularProgress size={'6em'} />
      </div>
    </div>
  );
};

export default CropTableComponent;
