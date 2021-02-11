/*
  This file contains the CropTable component
  The CropTable is the 
  addCropToBasket manages adding crops to cart
  Styles are created using makeStyles
*/

import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import { useSnackbar } from "notistack";
import {
  LightButton,
  CustomStyles,
  allMonths,
  getRating,
  trimString,
  CropImage,
  flipCoverCropName,
  sudoButtonStyle,
} from "../../shared/constants";
import {
  Button,
  Typography,
  Table,
  CircularProgress,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  ButtonBase,
  Tooltip,
  Zoom,
  makeStyles,
  Fab,
} from "@material-ui/core";

import "../../styles/cropTable.scss";
import {
  ArrowUpward,
  ArrowDownward,
  AddCircle,
  FiberManualRecord,
  CloseRounded,
  RemoveCircle,
  KeyboardArrowUp,
  Sort,
} from "@material-ui/icons";
// import GrowthWindowComponent from "./GrowthWindow";
import "../../styles/cropCalendarViewComponent.scss";
import CropDetailsModalComponent from "./CropDetailsModal";
// import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CropLegendModal from "./CropLegendModal";
import CropSelectorCalendarView from "./CropSelectorCalendarView";

const CropTableComponent = (props) => {
  // let cropTableElement = document.getElementById("#primaryCropTable");
  // cropTableElement.addEventListener("scroll", (e) => {
  //   let tableHead = document.querySelector("thead");
  //   let scrollTop = cropTableElement.scrollTop;
  //   tableHead.style.transform = "translateY(" + scrollTop + "px)";
  // });

  const cropData = props.cropData || [];
  let inactiveCropData = props.inactiveCropData || [];
  let activeCropData = props.activeCropData || [];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedCropsIds, setSelectedCropsIds] = useState([]);
  const [activeSortType, setActiveSortType] = useState("goals");
  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.id;
  });

  const handleModalOpen = (crop) => {
    // setModalOpen(true);
    // put data inside modal
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

    // console.log(cropData);
  }, [props.showGrowthWindow]);

  useEffect(() => {
    if (state.selectedCrops.length > 0) {
      let selectedIds = state.selectedCrops.map((crop) => {
        return crop["id"];
      });

      setSelectedCropsIds(selectedIds);
    }
  }, [state.progress]);

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    let container = document.getElementById(btnId);
    let selectedCrops = {};
    let toAdd = false;
    var cropArray = [];
    selectedCrops["id"] = cropId;
    selectedCrops["cropName"] = cropName;
    selectedCrops["btnId"] = btnId;
    selectedCrops["data"] = cropData;
    cropArray = selectedCrops;
    // change the UI
    // if (container.classList.contains("activeCartBtn")) {
    //   // change text back to 'add to list' and remove element from state

    //   if (container.textContent === "ADDED") {
    //     container.querySelector(".MuiButton-label").innerHTML = "ADD TO LIST";
    //     container.classList.remove("activeCartBtn");
    //     toAdd = false;
    //   } else toAdd = true;

    //   // this.state.selectedCrops.splice(x, 1);
    //   // get index of the element
    // } else {
    //   // change text to 'added' and add element to state

    //   if (container.textContent === "ADD TO LIST") {
    //     container.querySelector(".MuiButton-label").innerHTML = "ADDED";
    //     container.classList.add("activeCartBtn");
    //     toAdd = true;
    //   } else toAdd = false;
    // }

    // // check if crop id exists inside state, if yes then remove it

    if (state.selectedCrops.length > 0) {
      var removeIndex = state.selectedCrops
        .map(function (item) {
          return item.id;
        })
        .indexOf(`${cropId}`);
      if (removeIndex === -1) {
        // Element not in array, add new
        // let newActives = props.activeCropData.map((crop) => {
        //   if (crop.fields.id === cropId) {
        //     crop.fields["inBasket"] = true;
        //   } else {
        //     crop.fields["inBasket"] = false;
        //   }
        // });

        // props.setActiveCropData(newActives);
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
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
        // console.log(selectedCropsCopy);
        // let newActives = props.activeCropData.map((crop) => {
        //   if (crop.fields.id === cropId) {
        //     crop.fields["inBasket"] = false;
        //   }
        // });

        // props.setActiveCropData(newActives);
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
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
        type: "SELECTED_CROPS_MODIFIER",
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
                style={{ textAlign: "center" }}
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
                          {": "}
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
          : ""}
        {showGrowthWindow ? (
          <TableCell style={goalsLength === 0 ? { width: "50%" } : {}}>
            <CropSelectorCalendarView data={crop} from={"listView"} />
          </TableCell>
        ) : (
          ""
        )}
        <TableCell style={{ maxWidth: "150px", textAlign: "center" }}>
          <div className="d-flex w-100 justify-content-center align-items-center flex-column">
            <LightButton
              id={`cartBtn${indexKey}`}
              style={{
                borderRadius: CustomStyles().nonRoundedRadius,
                width: "150px",
              }}
              className={
                selectedBtns.includes(crop.fields.id)
                  ? "activeCartBtn"
                  : "inactiveCartBtn"
              }
              onClick={() => {
                addCropToBasket(
                  crop.fields["id"],
                  crop.fields["Cover Crop Name"],
                  `cartBtn${indexKey}`,
                  crop.fields
                );
              }}
            >
              {selectedBtns.includes(crop.fields.id) ? "ADDED" : "ADD TO LIST"}
            </LightButton>{" "}
            <Button size="small" onClick={() => handleModalOpen(crop)}>
              View Details
            </Button>
          </div>
        </TableCell>
      </Fragment>
    );
  };

  const activeCropPresent = () => {
    if (activeCropData.length > 0) return true;
    else {
      return false;
    }
  };
  const inactiveCropPresent = () => {
    if (inactiveCropData.length > 0) return true;
    else return false;
  };

  const hasGoalRatingTwoOrLess = (crop = []) => {
    const { selectedGoals } = state;

    if (selectedGoals.every((rating) => crop.fields[rating] <= 2)) {
      return true;
    } else return false;
  };

  const RenderActiveInactiveCropData = () => {
    return (
      <Fragment>
        {activeCropPresent
          ? activeCropData.map((crop, index) => {
              if (
                crop.fields["Zone Decision"] === "Include" &&
                !hasGoalRatingTwoOrLess(crop)
              )
                return (
                  <Fragment key={index}>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ""
                      }
                    >
                      <TableCell colSpan={42}></TableCell>
                    </TableRow>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ""
                      }
                      key={`croprow${index}`}
                      id={crop.fields["id"]}
                      style={
                        hasGoalRatingTwoOrLess(crop) ? { opacity: "0.2" } : {}
                      }
                    >
                      <TableCell
                        style={{
                          height:
                            crop.fields["Cover Crop Group"].toLowerCase() ===
                            "legume"
                              ? `auto`
                              : `auto`,
                        }}
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-auto pl-md-0">
                              {crop.fields["Image Data"] ? (
                                <CropImage
                                  present={true}
                                  src={
                                    crop.fields["Image Data"]["Key Thumbnail"]
                                      ? `/images/Cover Crop Photos/100x100/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                                      : "https://placehold.it/100x100"
                                  }
                                  alt={crop.fields["Cover Crop Name"]}
                                />
                              ) : (
                                <CropImage present={false} />
                              )}
                            </div>
                            <div className="col-auto pl-md-0">
                              <div className="col-12 p-md-0">
                                <Typography variant="h6">
                                  {flipCoverCropName(
                                    crop.fields["Cover Crop Name"]
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="body1"
                                  style={{
                                    color: "gray",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                    fontSize: "small",
                                  }}
                                >
                                  {trimString(
                                    crop.fields["Scientific Name"],
                                    25
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="subtitle2"
                                  className="text-uppercase"
                                  style={{ color: "gray" }}
                                >
                                  {crop.fields["Cover Crop Group"]}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", verticalAlign: "middle" }}
                      >
                        <table>
                          <tbody>
                            {crop.fields["Cover Crop Group"].toLowerCase() ===
                            "legume" ? (
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
                                  <Tooltip
                                    arrow
                                    placement="right"
                                    title="lbs/A/y"
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      component="b"
                                    >
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Min, Legumes (lbs/A/y)"
                                        ]
                                      }
                                      -
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Max, Legumes (lbs/A/y)"
                                        ]
                                      }
                                    </Typography>
                                  </Tooltip>
                                </td>
                              </tr>
                            ) : (
                              ""
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
                                <Tooltip
                                  arrow
                                  placement="right"
                                  title="lbs/A/y"
                                >
                                  <Typography variant="subtitle2" component="b">
                                    {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                                    {crop.fields["Dry Matter Max (lbs/A/y)"]}
                                  </Typography>
                                </Tooltip>
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
                                  {crop.fields["Duration"]
                                    .toString()
                                    .toLowerCase() === "short-lived perennial"
                                    ? "Perennial"
                                    : crop.fields["Duration"].toString()}
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
                return "";
              }
            })
          : ""}

        {inactiveCropPresent
          ? inactiveCropData.map((crop, index) => {
              if (crop.fields["Zone Decision"] === "Include")
                return (
                  <Fragment key={index}>
                    <TableRow className="inactiveCropRow">
                      <TableCell colSpan={42}></TableCell>
                    </TableRow>
                    <TableRow
                      className="inactiveCropRow"
                      key={`croprow${index}`}
                      id={crop.fields["id"]}
                      style={{ opacity: "0.2" }}
                    >
                      <TableCell
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {crop.fields["Image Data"] ? (
                          <CropImage
                            present={true}
                            src={
                              crop.fields["Image Data"]["Key Thumbnail"]
                                ? `/images/Cover Crop Photos/100x100/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                                : "https://placehold.it/100x100"
                            }
                            alt={crop.fields["Cover Crop Name"]}
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
                                  crop.fields["Cover Crop Name"]
                                )}
                              </Typography>
                            </span>
                            <span
                              className="cropScientificName"
                              style={{ color: "gray" }}
                            >
                              {trimString(crop.fields["Scientific Name"], 25)}
                            </span>
                            <span
                              className="cropCategory text-uppercase"
                              style={{ color: "gray" }}
                            >
                              {crop.fields["Cover Crop Group"]}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", verticalAlign: "middle" }}
                      >
                        <table>
                          <tbody>
                            {crop.fields["Cover Crop Group"].toLowerCase() ===
                            "legume" ? (
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
                                  <Tooltip
                                    arrow
                                    placement="right"
                                    title="lbs/A/y"
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      component="b"
                                    >
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Min, Legumes (lbs/A/y)"
                                        ]
                                      }
                                      -
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Max, Legumes (lbs/A/y)"
                                        ]
                                      }
                                    </Typography>
                                  </Tooltip>
                                </td>
                              </tr>
                            ) : (
                              ""
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
                                <Tooltip
                                  arrow
                                  placement="right"
                                  title="lbs/A/y"
                                >
                                  <Typography variant="subtitle2" component="b">
                                    {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                                    {crop.fields["Dry Matter Max (lbs/A/y)"]}
                                  </Typography>
                                </Tooltip>
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
                                  {crop.fields["Duration"]
                                    .toString()
                                    .toLowerCase() === "short-lived perennial"
                                    ? "Perennial"
                                    : crop.fields["Duration"].toString()}
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
            })
          : ""}
        {activeCropPresent
          ? activeCropData.map((crop, index) => {
              if (
                crop.fields["Zone Decision"] === "Include" &&
                hasGoalRatingTwoOrLess(crop)
              ) {
                return (
                  <Fragment key={index}>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ""
                      }
                    >
                      <TableCell colSpan={42}></TableCell>
                    </TableRow>
                    <TableRow
                      className={
                        hasGoalRatingTwoOrLess(crop) ? `inactiveCropRow` : ""
                      }
                      key={`croprow${index}`}
                      id={crop.fields["id"]}
                      style={
                        hasGoalRatingTwoOrLess(crop) ? { opacity: "0.2" } : {}
                      }
                    >
                      <TableCell
                        style={{
                          height:
                            crop.fields["Cover Crop Group"].toLowerCase() ===
                            "legume"
                              ? `auto`
                              : `auto`,
                        }}
                      >
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-auto pl-md-0">
                              {crop.fields["Image Data"] ? (
                                <CropImage
                                  present={true}
                                  src={
                                    crop.fields["Image Data"]["Key Thumbnail"]
                                      ? `/images/Cover Crop Photos/100x100/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                                      : "https://placehold.it/100x100"
                                  }
                                  alt={crop.fields["Cover Crop Name"]}
                                />
                              ) : (
                                <CropImage present={false} />
                              )}
                            </div>
                            <div className="col-auto pl-md-0">
                              <div className="col-12 p-md-0">
                                <Typography variant="h6">
                                  {flipCoverCropName(
                                    crop.fields["Cover Crop Name"]
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="body1"
                                  style={{
                                    color: "gray",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                    fontSize: "small",
                                  }}
                                >
                                  {trimString(
                                    crop.fields["Scientific Name"],
                                    25
                                  )}
                                </Typography>
                              </div>
                              <div className="col-12 p-md-0">
                                <Typography
                                  variant="subtitle2"
                                  className="text-uppercase"
                                  style={{ color: "gray" }}
                                >
                                  {crop.fields["Cover Crop Group"]}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", verticalAlign: "middle" }}
                      >
                        <table>
                          <tbody>
                            {crop.fields["Cover Crop Group"].toLowerCase() ===
                            "legume" ? (
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
                                  <Tooltip
                                    arrow
                                    placement="right"
                                    title="lbs/A/y"
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      component="b"
                                    >
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Min, Legumes (lbs/A/y)"
                                        ]
                                      }
                                      -
                                      {
                                        crop.fields[
                                          "Nitrogen Accumulation Max, Legumes (lbs/A/y)"
                                        ]
                                      }
                                    </Typography>
                                  </Tooltip>
                                </td>
                              </tr>
                            ) : (
                              ""
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
                                <Tooltip
                                  arrow
                                  placement="right"
                                  title="lbs/A/y"
                                >
                                  <Typography variant="subtitle2" component="b">
                                    {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                                    {crop.fields["Dry Matter Max (lbs/A/y)"]}
                                  </Typography>
                                </Tooltip>
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
                                  {crop.fields["Duration"]
                                    .toString()
                                    .toLowerCase() === "short-lived perennial"
                                    ? "Perennial"
                                    : crop.fields["Duration"].toString()}
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
              }
            })
          : ""}
      </Fragment>
    );
  };

  const [maxTableHeight, setMaxTableHeight] = useState(850);

  const [tbodyHeight, setTbodyHeight] = useState(0);
  const [theadHeight, setTheadHeight] = useState(0);

  useEffect(() => {
    if (document.querySelector("thead.MuiTableHead-root.tableHeadWrapper")) {
      const theadComputedHeight = document
        .querySelector("thead.MuiTableHead-root.tableHeadWrapper")
        .getBoundingClientRect().height;

      setTbodyHeight(maxTableHeight - theadComputedHeight);
      setTheadHeight(theadComputedHeight);
    }
    // console.log(tbodyHeight);
  });

  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const sortBySelectedCrops = () => {
    sortReset("selectedCrops");
    setActiveSortType("selectedCrops");
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
          if (selectedCropIds.includes(crop.fields.id)) {
            crop["inCart"] = true;
          } else {
            crop["inCart"] = false;
          }
          return crop;
        });

        if (inactiveCropDataShadow.length > 0) {
          let newInactiveShadow = inactiveCropDataShadow.map((crop) => {
            if (selectedCropIds.includes(crop.fields.id)) {
              crop["inCart"] = true;
            } else {
              crop["inCart"] = false;
            }
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

        // console.log(newActiveShadow);
        // console.log(selectedCropIds);

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

        // if(inactiveCropDataShadow.length > 0) {

        // }
      }
    } else {
      // sort back to original values
      sortReset("selectedCrops");
    }
    setSelectedCropsSortFlag(!selectedCropsSortFlag);
  };

  const sortReset = (from = "cropName") => {
    setActiveSortType("goals");
    // reset to default
    // if (from === "cropName") {
    //   if (selectedCropsSortFlag && nameSortFlag)
    //     setSelectedCropsSortFlag(false);
    // }
    // if (from === "selectedCrops") {
    //   if (nameSortFlag && selectedCropsSortFlag) setNameSortFlag(false);
    // }
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
  // useEffect(() => {
  //   console.log("props for active inactive changed");
  //   activeCropData = props.activeCropData;
  //   inactiveCropData = props.inactiveCropData;
  //   let activeCropDataShadow = props.cropData;
  //   const { selectedGoals } = state;
  //   console.log("cropdata", activeCropDataShadow.length);
  //   console.log("actives", activeCropData.length);
  //   console.log("inactives", inactiveCropData.length);

  //   const newActives = activeCropDataShadow.filter((crops) => {
  //     if (selectedGoals.every((rating) => crops.fields[rating] <= 2)) {
  //       return false;
  //     } else return true;
  //   });
  //   const newInactives = activeCropDataShadow.filter((crops) => {
  //     if (selectedGoals.every((rating) => crops.fields[rating] <= 2)) {
  //       return true;
  //     } else return false;
  //   });
  //   props.setInactiveCropData(newInactives);
  //   props.setActiveCropData(newActives);
  //   console.log("cropdata", activeCropDataShadow.length);
  //   console.log("newactives", newActives.length);
  //   console.log("newinactives", newInactives.length);
  // }, [props.cropData]);

  const sortCropsByName = () => {
    let activeCropDataShadow = props.activeCropData;
    let inactiveCropDataShadow = props.inactiveCropData;
    sortReset("cropName");
    setActiveSortType("selectedCrops");

    if (nameSortFlag) {
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
          var secondCropName = flipCoverCropName(
            b.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
          return firstCropName.localeCompare(secondCropName);
        });

        props.setActiveCropData(activeCropDataShadow);
      }

      if (inactiveCropDataShadow.length > 0) {
        inactiveCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields["Cover Crop Name"].toLowerCase()
          );
          var secondCropName = flipCoverCropName(
            b.fields["Cover Crop Name"].toLowerCase()
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
      // sortReset("cropName");
      if (activeCropDataShadow.length > 0) {
        activeCropDataShadow.sort((a, b) => {
          var firstCropName = flipCoverCropName(
            a.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
          var secondCropName = flipCoverCropName(
            b.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
          // return firstCropName.localeCompare(secondCropName);
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
            a.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
          var secondCropName = flipCoverCropName(
            b.fields["Cover Crop Name"].toLowerCase()
          ).replace(/\s+/g, "");
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
        // style={{ maxHeight: maxTableHeight }}
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
                  backgroundColor: "white",
                  color: "white",
                  visibility: "hidden",
                }}
                colSpan="2"
              >
                blank
              </TableCell>

              {state.selectedGoals.length > 0 ? (
                <TableCell
                  colSpan={state.selectedGoals.length}
                  style={{
                    borderBottom: "5px solid white",
                    backgroundColor: "#abd08f",
                    textAlign: "center",
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
                            props.sortPreference === "desc" ? "asc" : "desc"
                          );
                        }}
                      >
                        {props.sortPreference === "asc" ? (
                          <Sort
                            style={{
                              color: CustomStyles().secondaryProgressBtnColor,
                            }}
                          />
                        ) : (
                          <Sort
                            style={{
                              color: CustomStyles().progressColor,
                              transform: "rotate(180deg)",
                            }}
                          />
                        )}
                        &nbsp; COVER CROPPING GOALS
                      </Button>
                    </Typography>
                  </Tooltip>
                </TableCell>
              ) : (
                ""
              )}

              <TableCell
                style={{
                  backgroundColor: "#abd08f",
                  textAlign: "center",
                  borderRight: "5px solid white",
                  borderBottom: "5px solid white",
                }}
              >
                <Typography variant="body2">
                  <Button
                    startIcon={<AddCircle />}
                    onClick={handleLegendModal}
                    // onClick={() => {
                    //   const ele = document.getElementById("legendWrapper");
                    //   if (ele.classList.contains("d-none")) {
                    //     ele.classList.remove("d-none");
                    //   } else {
                    //     ele.classList.add("d-none");
                    //   }
                    // }}
                  >
                    {" "}
                    LEGEND
                  </Button>
                </Typography>

                <div
                  id="legendWrapper"
                  className="d-none"
                  style={{
                    position: "fixed",
                    backgroundColor: "rgba(171, 208, 143, 0.8)",
                    bottom: 0,
                    zIndex: 999,
                    textAlign: "left",
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
                              const ele = document.getElementById(
                                "legendWrapper"
                              );
                              ele.classList.add("d-none");
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
                            <span className="pl-3">
                              {"Reliable Establishment"}
                            </span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="temperatureRisk" />
                            <span className="pl-3">
                              {"Temperature Risk To Establishment"}
                            </span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="frostPossible" />
                            <span className="pl-3">
                              {"Frost Seeding Possible"}
                            </span>
                          </Typography>
                        </div>
                        <div className="col-12 legendModalRow">
                          <Typography variant="body1">
                            <FiberManualRecord className="cashCrop" />
                            <span className="pl-3">
                              {"Previous Cash Crop Growth Window"}
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
                  backgroundColor: "white",
                  color: "white",
                  visibility: "hidden",
                }}
              >
                blank
              </TableCell>
            </TableRow>
            <TableRow className="theadSecond">
              <TableCell
                style={{
                  minWidth: "320px",
                  backgroundColor: "#abd08f",
                  borderRight: "5px solid white",
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
                          transform: "rotate(180deg)",
                        }}
                      />
                    )}
                    &nbsp; COVER CROPS
                  </Button>
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  minWidth: "240px",
                  backgroundColor: "#abd08f",
                  borderRight: "5px solid white",
                }}
              >
                <Typography variant="body1">
                  <div style={sudoButtonStyle}>Growth Traits</div>
                </Typography>
              </TableCell>
              {state.selectedGoals.length > 0
                ? state.selectedGoals.map((goal, index) => {
                    let lastIndex = state.selectedGoals.length - 1;
                    return (
                      <TableCell
                        key={index}
                        style={{
                          wordBreak: "break-word",
                          maxWidth: "185px",
                          backgroundColor: "#abd08f",
                          textAlign: "center",
                          borderRight:
                            index === lastIndex ? "5px solid white" : "none",
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
                : ""}

              {showGrowthWindow ? (
                <TableCell
                  style={{
                    backgroundColor: "#abd08f",
                    textAlign: "center",
                    borderRight: "5px solid white",
                    width: "180px",
                  }}
                >
                  <Typography variant="body1">
                    {" "}
                    <div style={sudoButtonStyle}>PLANTING WINDOW</div>
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}

              <TableCell
                style={{
                  backgroundColor: "#abd08f",
                  textAlign: "center",
                  minWidth: "165px",
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
                          transform: "rotate(180deg)",
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
                          width: "100%",
                          height: tbodyHeight,
                          position: "absolute",
                          top: theadHeight,
                          backgroundColor: "rgba(255,255,255, 0.1)",
                          zIndex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(171, 208, 143, 1)",
                            minHeight: "100px",
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
                  ""
                )}

                <RenderActiveInactiveCropData />
              </Fragment>
            ) : (
              // <RenderDefaultCropData />
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
