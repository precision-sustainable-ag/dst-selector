/*
  This file contains the CropTable component
  The CropTable is the 
  addCropToBasket manages adding crops to cart
  Styles are created using makeStyles
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
  Typography,
} from '@material-ui/core';

import {
  AddCircle,
  CloseRounded,
  FiberManualRecord,
  Sort,
} from '@material-ui/icons';

import { useSnackbar } from 'notistack';

import React, { Fragment, useContext, useEffect, useState } from 'react';

import {
  CropImage,
  CustomStyles,
  flipCoverCropName,
  getRating,
  LightButton,
  sudoButtonStyle,
  trimString,
} from '../../shared/constants';

import { Context } from '../../store/Store';
import '../../styles/cropCalendarViewComponent.scss';
import '../../styles/cropTable.scss';
import CropDetailsModalComponent from './CropDetailsModal';
import CropLegendModal from './CropLegendModal';
import CropSelectorCalendarView from './CropSelectorCalendarView';

const CropTableComponent = (props) => {
  const cropData = props.cropData || [];
  let inactiveCropData = props.inactiveCropData || [];
  let activeCropData = props.activeCropData || [];

  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.id;
  });

  const handleModalOpen = (crop) => {
    setModalData(crop);
    setModalOpen(true);
  };

  const [showGrowthWindow, setShowGrowthWindow] = useState(true);
  const [legendModal, setLegendModal] = useState(false);
  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };

  useEffect(() => {
    props.showGrowthWindow
      ? setShowGrowthWindow(true)
      : setShowGrowthWindow(false);
  }, [props.showGrowthWindow]);

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    let selectedCrops = {};
    var cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.btnId = btnId;
    selectedCrops.data = cropData;
    cropArray = selectedCrops;
    // // check if crop id exists inside state, if yes then remove it

    if (state.selectedCrops.length > 0) {
      var removeIndex = state.selectedCrops
        .map(function (item) {
          return item.id;
        })
        .indexOf(`${cropId}`);
      if (removeIndex === -1) {
        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: false,
            snackMessage: `${cropName} Added`,
          },
        });
        enqueueSnackbar(`${cropName} Added`);
      } else {
        // element exists, remove
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);

        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: false,
            snackMessage: `${cropName} Removed`,
          },
        });
        enqueueSnackbar(`${cropName} Removed`);
      }
    } else {
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: [cropArray],
          snackOpen: false,
          snackMessage: `${cropName} Added`,
        },
      });
      enqueueSnackbar(`${cropName} Added`);
    }
  };

  const getCardFlex = (crop, indexKey) => {
    let goalsLength = state.selectedGoals.length;

    return (
      <Fragment>
        {goalsLength > 0
          ? state.selectedGoals.map((goal, index) => (
              <TableCell
                style={{ textAlign: 'center' }}
                key={index}
                className="goalCells"
              >
                <div>
                  <Tooltip
                    arrow
                    placement="bottom"
                    title={
                      <div className="filterTooltip text-capitalize">
                        <p>
                          {`Goal ${index + 1}`}
                          {': '}
                          {goal}
                        </p>
                      </div>
                    }
                  >
                    {getRating(crop.fields[goal])}
                  </Tooltip>
                </div>
              </TableCell>
            ))
          : ''}
        {showGrowthWindow ? (
          <TableCell style={goalsLength === 0 ? { width: '50%' } : {}}>
            <CropSelectorCalendarView data={crop} from={"listView"} />
          </TableCell>
        ) : (
          <tr></tr>
        )}
        <TableCell style={{ maxWidth: '150px', textAlign: 'center' }}>
          <div className="d-flex w-100 justify-content-center align-items-center flex-column">
            <LightButton
              id={`cartBtn${indexKey}`}
              style={{
                borderRadius: CustomStyles().nonRoundedRadius,
                width: '150px',
              }}
              className={
                selectedBtns.includes(crop.fields.id)
                  ? 'activeCartBtn'
                  : 'inactiveCartBtn'
              }
              onClick={() => {
                addCropToBasket(
                  crop.fields['id'],
                  crop.fields['Cover Crop Name'],
                  `cartBtn${indexKey}`,
                  crop.fields
                );
              }}
            >
              {selectedBtns.includes(crop.fields.id) ? 'ADDED' : 'ADD TO LIST'}
            </LightButton>{' '}
            <Button size="small" onClick={() => handleModalOpen(crop)}>
              View Details
            </Button>
          </div>
        </TableCell>
      </Fragment>
    );
  };

  const activeCropPresent = () => {
    return activeCropData.length > 0;
  };

  const inactiveCropPresent = () => {
    return inactiveCropData.length > 0;
  };

  const hasGoalRatingTwoOrLess = (crop = []) => {
    const { selectedGoals } = state;

    return selectedGoals.every((rating) => crop.fields[rating] <= 2);
  };

  const RenderActiveInactiveCropData = () => {
    return (
      <Fragment>
        {activeCropPresent ? (
          activeCropData.map((crop, index) => {
            if (
              crop.fields['Zone Decision'] === 'Include' && !hasGoalRatingTwoOrLess(crop)
            )
              return (
                <Fragment key={index}>
                  <TableRow
                    className={
                      hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ''
                    }
                  >
                    <TableCell colSpan={42}></TableCell>
                  </TableRow>
                  <TableRow
                    className={
                      hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ''
                    }
                    key={`croprow${index}`}
                    id={crop.fields['id']}
                    style={
                      hasGoalRatingTwoOrLess(crop) ? { opacity: '0.2' } : {}
                    }
                  >
                    <TableCell
                      style={{height: 'auto'}}
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-auto pl-md-0">
                            {crop.fields['Image Data'] ? (
                              <CropImage
                                present={true}
                                src={
                                  crop.fields['Image Data']['Key Thumbnail']
                                    ? `/images/Cover Crop Photos/100x100/${crop.fields['Image Data']['Directory']}/${crop.fields['Image Data']['Key Thumbnail']}`
                                    : 'https://placehold.it/100x100'
                                }
                                alt={crop.fields['Cover Crop Name']}
                              />
                            ) : (
                              <CropImage present={false} />
                            )}
                          </div>
                          <div className="col-auto pl-md-0">
                            <div className="col-12 p-md-0">
                              <Typography variant="h6">
                                {flipCoverCropName(
                                  crop.fields['Cover Crop Name']
                                )}
                              </Typography>
                            </div>
                            <div className="col-12 p-md-0">
                              <Typography
                                variant="body1"
                                style={{
                                  color: 'gray',
                                  fontWeight: 'normal',
                                  fontStyle: 'italic',
                                  fontSize: 'small',
                                }}
                              >
                                {trimString(crop.fields['Scientific Name'], 25)}
                              </Typography>
                            </div>
                            <div className="col-12 p-md-0">
                              <Typography
                                variant="subtitle2"
                                className="text-uppercase"
                                style={{ color: 'gray' }}
                              >
                                {crop.fields['Cover Crop Group']}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: 'left', verticalAlign: 'middle' }}
                    >
                      <table>
                        <tbody>
                          {crop.fields['Cover Crop Group'].toLowerCase() === 'legume' ? (
                            <tr>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className=""
                                >
                                  TOTAL N:
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="subtitle2" component="b">
                                  {crop.fields['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}-
                                  {crop.fields['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}
                                  <span class="units">lbs/A/y</span>
                                </Typography>
                              </td>
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                          <tr>
                            <td>
                              {" "}
                              <Typography
                                variant="subtitle2"
                                component="b"
                                className=""
                              >
                                DRY MATTER:
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2" component="b">
                                {crop.fields['Dry Matter Min (lbs/A/y)']}-
                                {crop.fields['Dry Matter Max (lbs/A/y)']}
                                <span class="units">lbs/A/y</span>
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Typography
                                variant="subtitle2"
                                component="b"
                                className=""
                              >
                                DURATION:
                              </Typography>
                            </td>
                            <td>
                              <Typography
                                variant="subtitle2"
                                component="b"
                                className="text-uppercase"
                              >
                                {crop.fields['Duration']
                                  .toString()
                                  .toLowerCase() === 'short-lived perennial'
                                  ? 'Perennial'
                                  : crop.fields['Duration'].toString()}
                              </Typography>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TableCell>
                    {getCardFlex(crop, index)}
                  </TableRow>
                </Fragment>
              );
            else {
              return '';
            }
          })
        ) : (
          <tr></tr>
        )}

        {inactiveCropPresent
          ? inactiveCropData.map((crop, index) => {
              if (crop.fields['Zone Decision'] === 'Include')
                return (
                  <Fragment key={index}>
                    <TableRow className="inactiveCropRow">
                      <TableCell colSpan={42}></TableCell>
                    </TableRow>
                    <TableRow
                      className="inactiveCropRow"
                      key={`croprow${index}`}
                      id={crop.fields['id']}
                      style={{ opacity: '0.2' }}
                    >
                      <TableCell
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        {crop.fields['Image Data'] ? (
                          <CropImage
                            present={true}
                            src={
                              crop.fields['Image Data']['Key Thumbnail']
                                ? `/images/Cover Crop Photos/100x100/${crop.fields['Image Data']['Directory']}/${crop.fields['Image Data']['Key Thumbnail']}`
                                : 'https://placehold.it/100x100'
                            }
                            alt={crop.fields['Cover Crop Name']}
                          />
                        ) : (
                          <CropImage present={false} />
                        )}

                        <div className="cropDetailsText" style={{}}>
                          <div className="part1_ut">
                            <span className="cropName font-weight-lighter">
                              <Typography variant="h6">
                                {" "}
                                {flipCoverCropName(
                                  crop.fields['Cover Crop Name']
                                )}
                              </Typography>
                            </span>
                            <span
                              className="cropScientificName"
                              style={{ color: 'gray' }}
                            >
                              {trimString(crop.fields['Scientific Name'], 25)}
                            </span>
                            <span
                              className="cropCategory text-uppercase"
                              style={{ color: 'gray' }}
                            >
                              {crop.fields['Cover Crop Group']}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: 'left', verticalAlign: 'middle' }}
                      >
                        <table>
                          <tbody>
                            {crop.fields['Cover Crop Group'].toLowerCase() === 'legume' ? (
                              <tr>
                                <td>
                                  <Typography
                                    variant="subtitle2"
                                    component="b"
                                    className=""
                                  >
                                    TOTAL N:
                                  </Typography>
                                </td>
                                <td>
                                  <Typography variant="subtitle2" component="b">
                                    {crop.fields['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}-
                                    {crop.fields['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}
                                    <span class="units">lbs/A/y</span>
                                  </Typography>
                                </td>
                              </tr>
                            ) : (
                              ''
                            )}
                            <tr>
                              <td>
                                {" "}
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className=""
                                >
                                  DRY MATTER:
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="subtitle2" component="b">
                                  {crop.fields['Dry Matter Min (lbs/A/y)']}-
                                  {crop.fields['Dry Matter Max (lbs/A/y)']}
                                  <span class="units">lbs/A/y</span>
                                </Typography>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className=""
                                >
                                  DURATION:
                                </Typography>
                              </td>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className="text-uppercase"
                                >
                                  {crop.fields['Duration']
                                    .toString()
                                    .toLowerCase() === 'short-lived perennial'
                                    ? 'Perennial'
                                    : crop.fields['Duration'].toString()}
                                </Typography>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </TableCell>
                      {getCardFlex(crop, index)}
                    </TableRow>
                  </Fragment>
                );
              else return <Fragment />;
            })
          : ''}
        {activeCropPresent
          ? activeCropData.map((crop, index) => {
              if (
                crop.fields['Zone Decision'] === 'Include' &&
                hasGoalRatingTwoOrLess(crop)
              ) {
                return (
                  <Fragment key={index}>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? 'inactiveCropRow' : ''
                      }
                    >
                      <TableCell colSpan={42}></TableCell>
                    </TableRow>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? 'inactiveCropRow' : ''
                      }
                      key={`croprow${index}`}
                      id={crop.fields['id']}
                      style={
                        hasGoalRatingTwoOrLess(crop) ? { opacity: '0.2' } : {}
                      }
                    >
                      <TableCell
                        style={{height: 'auto'}}
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-auto pl-md-0">
                              {crop.fields['Image Data'] ? (
                                <CropImage
                                  present={true}
                                  src={
                                    crop.fields['Image Data']['Key Thumbnail']
                                      ? `/images/Cover Crop Photos/100x100/${crop.fields['Image Data']['Directory']}/${crop.fields['Image Data']['Key Thumbnail']}`
                                      : 'https://placehold.it/100x100'
                                  }
                                  alt={crop.fields['Cover Crop Name']}
                                />
                              ) : (
                                <CropImage present={false} />
                              )}
                            </div>
                            <div className="col-auto pl-md-0">
                              <div className="col-12 p-md-0">
                                <Typography variant="h6">
                                  {flipCoverCropName(
                                    crop.fields['Cover Crop Name']
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="body1"
                                  style={{
                                    color: 'gray',
                                    fontWeight: 'normal',
                                    fontStyle: 'italic',
                                    fontSize: 'small',
                                  }}
                                >
                                  {trimString(
                                    crop.fields['Scientific Name'],
                                    25
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="subtitle2"
                                  className="text-uppercase"
                                  style={{ color: 'gray' }}
                                >
                                  {crop.fields['Cover Crop Group']}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: 'left', verticalAlign: 'middle' }}
                      >
                        <table>
                          <tbody>
                            {crop.fields['Cover Crop Group'].toLowerCase() === 'legume' ? (
                              <tr>
                                <td>
                                  <Typography
                                    variant="subtitle2"
                                    component="b"
                                    className=""
                                  >
                                    TOTAL N:
                                  </Typography>
                                </td>
                                <td>
                                  <Typography variant="subtitle2" component="b">
                                    {crop.fields['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}-
                                    {crop.fields['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}
                                    <span class="units">lbs/A/y</span>
                                  </Typography>
                                </td>
                              </tr>
                            ) : (
                              <tr></tr>
                            )}
                            <tr>
                              <td>
                                {" "}
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className=""
                                >
                                  DRY MATTER:
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="subtitle2" component="b">
                                  {crop.fields['Dry Matter Min (lbs/A/y)']}-
                                  {crop.fields['Dry Matter Max (lbs/A/y)']}
                                  <span class="units">lbs/A/y</span>
                                </Typography>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className=""
                                >
                                  DURATION:
                                </Typography>
                              </td>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  component="b"
                                  className="text-uppercase"
                                >
                                  {crop.fields['Duration']
                                    .toString()
                                    .toLowerCase() === 'short-lived perennial'
                                    ? 'Perennial'
                                    : crop.fields['Duration'].toString()}
                                </Typography>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </TableCell>
                      {getCardFlex(crop, index)}
                    </TableRow>
                  </Fragment>
                );
              } else return <Fragment />;
            })
          : ''}
      </Fragment>
    );
  };

  const [tbodyHeight, setTbodyHeight] = useState(0);
  const [theadHeight, setTheadHeight] = useState(0);

  useEffect(() => {
    if (document.querySelector("thead.MuiTableHead-root.tableHeadWrapper")) {
      const theadComputedHeight = document
        .querySelector("thead.MuiTableHead-root.tableHeadWrapper")
        .getBoundingClientRect().height;

      setTbodyHeight(850 - theadComputedHeight);
      setTheadHeight(theadComputedHeight);
    }
  }, []);

  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const sortBySelectedCrops = () => {
    sortReset("selectedCrops");
    let selectedCropsShadow = state.selectedCrops;
    let activeCropDataShadow = props.activeCropData;
    let inactiveCropDataShadow = props.inactiveCropData;
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

        if (inactiveCropDataShadow.length > 0) {
          let newInactiveShadow = inactiveCropDataShadow.map((crop) => {
            crop['inCart'] = selectedCropIds.includes(crop.fields.id);
            return crop;
          });
          newInactiveShadow.sort((a) => {
            if (a.inCart) {
              return -1;
            } else {
              return 1;
            }
          });
          props.setInactiveCropData(newInactiveShadow);
        }

        if (newActiveShadow.length > 0) {
          newActiveShadow.sort((a) => {
            if (a.inCart) {
              return -1;
            } else {
              return 1;
            }
          });

          props.setActiveCropData(newActiveShadow);
        }
      }
    } else {
      // sort back to original values
      sortReset("selectedCrops");
    }
    setSelectedCropsSortFlag(!selectedCropsSortFlag);
  };

  const sortReset = (from = "cropName") => {
    const { selectedGoals } = state;
    let activeCropDataShadow = props.activeCropData;
    let inactiveCropDataShadow = props.inactiveCropData;
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
        if (inactiveCropDataShadow.length > 0) {
          inactiveCropDataShadow.sort((a, b) => {
            if (a.fields[goal] && b.fields[goal]) {
              if (a.fields[goal] > b.fields[goal]) {
                return -1;
              } else {
                return 1;
              }
            }
            return 0;
          });
        }
      });
    props.setActiveCropData(activeCropDataShadow);
    if (inactiveCropDataShadow.length > 0) {
      props.setInactiveCropData(inactiveCropDataShadow);
    }
  };

  const sortCropsByName = () => {
    let activeCropDataShadow = props.activeCropData;
    let inactiveCropDataShadow = props.inactiveCropData;
    sortReset("cropName");

    if (nameSortFlag) {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          var secondCropName = flipCoverCropName(
            b.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          return firstCropName.localeCompare(secondCropName);
        });

        props.setActiveCropData(activeCropDataShadow);
      }

      if (inactiveCropDataShadow.length > 0) {
        inactiveCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields['Cover Crop Name'].toLowerCase()
          );
          var secondCropName = flipCoverCropName(
            b.fields['Cover Crop Name'].toLowerCase()
          );
          if (firstCropName < secondCropName) {
            return -1;
          }
          if (firstCropName > secondCropName) {
            return 1;
          }
          return 0;
        });
        props.setInactiveCropData(inactiveCropDataShadow);
      }
    } else {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          var secondCropName = flipCoverCropName(
            b.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          if (firstCropName < secondCropName) {
            return 1;
          }
          if (firstCropName > secondCropName) {
            return -1;
          }
          return 0;
        });

        props.setActiveCropData(activeCropDataShadow);
      }

      if (inactiveCropDataShadow.length > 0) {
        inactiveCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          var secondCropName = flipCoverCropName(
            b.fields['Cover Crop Name'].toLowerCase()
          ).replace(/\s+/g, '');
          if (firstCropName < secondCropName) {
            return 1;
          }
          if (firstCropName > secondCropName) {
            return -1;
          }
          return 0;
        });
        props.setInactiveCropData(inactiveCropDataShadow);
      }
    }

    setNameSortFlag(!nameSortFlag);
  };

  return cropData.length !== 0 ? (
    <Fragment>
      <TableContainer
        className="table-responsive calendarViewTableWrapper"
        component="div"
      >
        <Table
          stickyHeader
          className="table table-borderless table-sm"
          id="primaryCropTable"
        >
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

              {state.selectedGoals.length > 0 ? (
                <TableCell
                  colSpan={state.selectedGoals.length}
                  style={{
                    borderBottom: '5px solid white',
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                  }}
                >
                  <Tooltip
                    arrow
                    placement="top"
                    interactive
                    title={
                      <div className="filterTooltip">
                        <p>See filter bar for cover cropping goals.</p>
                      </div>
                    }
                  >
                    <Typography variant="body2">
                      <Button
                        onClick={() => {
                          console.log(props.sortPreference);
                          props.sortAllCrops(
                            props.sortPreference === 'desc' ? 'asc' : 'desc'
                          );
                        }}
                      >
                        {props.sortPreference === 'asc' ? (
                          <Sort
                            style={{
                              color: CustomStyles().secondaryProgressBtnColor,
                            }}
                          />
                        ) : (
                          <Sort
                            style={{
                              color: CustomStyles().progressColor,
                              transform: 'rotate(180deg)',
                            }}
                          />
                        )}
                        &nbsp; COVER CROPPING GOALS
                      </Button>
                    </Typography>
                  </Tooltip>
                </TableCell>
              ) : (
                <tr></tr>
              )}

              <TableCell
                style={{
                  backgroundColor: '#abd08f',
                  textAlign: 'center',
                  borderRight: '5px solid white',
                  borderBottom: '5px solid white',
                }}
              >
                <Typography variant="body2">
                  <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                    {' '}
                    LEGEND
                  </Button>
                </Typography>

                <div
                  id="legendWrapper"
                  className="d-none"
                  style={{
                    position: 'fixed',
                    backgroundColor: 'rgba(171, 208, 143, 0.8)',
                    bottom: 0,
                    zIndex: 999,
                    textAlign: 'left',
                  }}
                >
                  <div className={`modalLegendPaper`}>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-6">
                          <Typography variant="h5">LEGEND</Typography>
                        </div>

                        <div className="col-6 text-right">
                          <Button
                            onClick={() => {
                              const ele = document.getElementById('legendWrapper');
                              ele.classList.add('d-none');
                            }}
                          >
                            <CloseRounded />
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="reliable" />
                            <span className="pl-3">Reliable Establishment</span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="temperatureRisk" />
                            <span className="pl-3">
                              Temperature Risk To Establishment
                            </span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="frostPossible" />
                            <span className="pl-3">Frost Seeding Possible</span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="cashCrop" />
                            <span className="pl-3">
                              Previous Cash Crop Growth Window
                            </span>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <Typography variant="body1">
                  <Button onClick={sortCropsByName}>
                    {nameSortFlag ? (
                      <Sort
                        style={{
                          color: CustomStyles().secondaryProgressBtnColor,
                        }}
                      />
                    ) : (
                      <Sort
                        style={{
                          color: CustomStyles().progressColor,
                          transform: 'rotate(180deg)',
                        }}
                      />
                    )}
                    &nbsp; COVER CROPS
                  </Button>
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
              {state.selectedGoals.length > 0 ? (
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
                        borderRight: index === lastIndex ? '5px solid white' : 'none',
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
                          <div style={sudoButtonStyle}>{`Goal ${
                            index + 1
                          }`}</div>
                        </Tooltip>
                      </Typography>
                    </TableCell>
                  );
                })
              ) : (
                <tr></tr>
              )}

              {showGrowthWindow ? (
                <TableCell
                  style={{
                    backgroundColor: '#abd08f',
                    textAlign: 'center',
                    borderRight: '5px solid white',
                    width: '180px',
                  }}
                >
                  <Typography variant="body1" style={sudoButtonStyle}>
                    {" "}
                    PLANTING WINDOW
                  </Typography>
                </TableCell>
              ) : (
                <tr></tr>
              )}

              <TableCell
                style={{
                  backgroundColor: '#abd08f',
                  textAlign: 'center',
                  minWidth: '165px',
                }}
              >
                <Typography variant="body1">
                  <Button onClick={sortBySelectedCrops}>
                    {selectedCropsSortFlag ? (
                      <Sort
                        style={{
                          color: CustomStyles().secondaryProgressBtnColor,
                        }}
                      />
                    ) : (
                      <Sort
                        style={{
                          color: CustomStyles().progressColor,
                          transform: 'rotate(180deg)',
                        }}
                      />
                    )}
                    &nbsp;MY LIST
                  </Button>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="tableBodyWrapper">
            {activeCropData.length > 0 || inactiveCropData.length > 0 ? (
              <Fragment>
                {activeCropData.length === 0 ? (
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
                            <Typography
                              variant="body1"
                              gutterBottom
                              className="pb-2"
                            >
                              No cover crops match your selected Cover Crop
                              Property filters.
                            </Typography>
                            <Typography
                              variant="body1"
                              gutterBottom
                              className="pb-2"
                            >
                              Consider expanding your Cover Crop Property filter
                              criteria.
                            </Typography>
                            <Typography
                              variant="body1"
                              gutterBottom
                              className=""
                            >
                              Alternatively, clear all Cover Crop Property
                              filters.
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <tr></tr>
                )}
                <RenderActiveInactiveCropData />
              </Fragment>
            ) : (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="cropGoals"></div>
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
      <CropLegendModal
        legendModal={legendModal}
        handleLegendModal={handleLegendModal}
        disableBackdropClick={false}
      />
    </Fragment>
  ) : (
    <div className="table-responsive calendarViewTableWrapper">
      <div className="circularCentered">
        <CircularProgress size={"6em"} />
      </div>
    </div>
  );
};

export default CropTableComponent;
