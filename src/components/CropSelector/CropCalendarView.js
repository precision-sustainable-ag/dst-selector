import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import moment from "moment";
import {
  Typography,
  Button,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  LightButton,
  allMonths,
  cropDataURL,
  allGoalsURL,
  getRating,
  CropImage,
} from "../../shared/constants";
import "../../styles/cropCalendarViewComponent.scss";
import GrowthWindowComponent from "./GrowthWindow";
// import { AddCircle, FiberManualRecord, CloseRounded } from "@material-ui/icons";
// import CropLegendModal from "./CropLegendModal";
import { AirtableBearerKey } from "../../shared/keys";
// import RenderCashCropOverlay from "./RenderCashCropOverlay";

const CropCalendarViewComponent = (props) => {
  const { cropData } = props;

  const [state, dispatch] = useContext(Context);

  const [selectedCropsIds, setSelectedCropsIds] = useState([]);
  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.btnId;
  });

  // DONE: Check year logic ? currently Juliet wants to return current year if month is before november
  // ref. useeffect();
  let currentYear = new Date().getFullYear();

  useEffect(() => {
    if (state.selectedCrops.length > 0) {
      let selectedIds = state.selectedCrops.map((crop) => {
        return crop.id;
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
    if (container.classList.contains("activeCartBtn")) {
      // change text back to 'add to list' and remove element from state

      if (document.getElementById(btnId).textContent === "ADDED") {
        container.querySelector(".MuiButton-label").innerHTML = "ADD TO LIST";
        container.classList.remove("activeCartBtn");
        toAdd = false;
      } else toAdd = true;

      // this.state.selectedCrops.splice(x, 1);
      // get index of the element
    } else {
      // change text to 'added' and add element to state
      console.log(document.getElementById(btnId).textContent);
      if (container.textContent === "ADD TO LIST") {
        container.querySelector(".MuiButton-label").innerHTML = "ADDED";
        container.classList.add("activeCartBtn");
        toAdd = true;
      } else toAdd = false;
    }

    // // check if crop id exists inside state, if yes then remove it

    if (state.selectedCrops.length > 0) {
      // DONE: Remove crop from basket
      var removeIndex = state.selectedCrops
        .map(function (item) {
          return item.btnId;
        })
        .indexOf(`${btnId}`);
      if (removeIndex === -1) {
        // element not in array
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: true,
            snackMessage: `${cropName} Added`,
          },
        });
      } else {
        // alert(removeIndex);
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        // console.log(selectedCropsCopy);
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: true,
            snackMessage: `${cropName} Removed`,
          },
        });

        // this.state.selectedCrops.splice(removeIndex, 1);
      }
    } else {
      // DONE: add the selected crop to state and change the state, show snackbar

      dispatch({
        type: "SELECTED_CROPS_MODIFIER",
        data: {
          selectedCrops: [cropArray],
          snackOpen: true,
          snackMessage: `${cropName} Added`,
        },
      });
    }
  };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${AirtableBearerKey}`);

  useEffect(() => {
    let initialized = fetchRecordsIfUnavailable();
    initialized.then(() => {
      let currentMonth = moment().format("MMM");
      // console.log(currentMonth);
      if (currentMonth === "Nov" || currentMonth === "Dec") {
        currentYear = currentYear + 1;
      }
      console.log("goal values set");

      // putGoalValues();
    });
  }, []);

  const getAverageGoalRating = (selectedGoals, crop) => {
    // get goal rating for each crop and calculate+render rating
    let goalRating = 0;
    selectedGoals.map((goal, index) => {
      if (crop.fields[goal]) {
        goalRating += crop.fields[goal];
      }
    });

    return getRating(goalRating / selectedGoals.length);
  };

  const putGoalValues = () => {
    console.log(state.allGoals.length);
    state.allGoals.map((goal, index) => {
      let goalName = goal.fields["Cover Crop Goal"];
      cropData.map((crop, index2) => {
        // let cropId =

        console.log(
          goalName + " for " + crop.fields["Cover Crop Name"],
          crop.fields[goalName]
        );
      });
    });
  };
  const fetchRecordsIfUnavailable = () => {
    // get crop data if unavailable

    let _promise = new Promise(async function (resolve, reject) {
      if (cropData.length === 0) {
        // get crop data
        dispatch({
          type: "SET_AJAX_IN_PROGRESS",
          data: true,
        });
        let records = await fetch(cropDataURL, { headers: headers });
        let json = records.json();

        json
          .then((val) => {
            // console.log(val);
            dispatch({
              type: "PULL_CROP_DATA",
              data: val.records,
            });
          })
          .then(async () => {
            if (state.allGoals.length === 0) {
              // get all goals
              let records = await fetch(allGoalsURL, { headers: headers });
              // console.log(records.json());
              let json = records.json();
              json
                .then((val) => {
                  dispatch({
                    type: "ADD_GOALS",
                    data: val.records,
                  });
                })
                .then(() => {
                  resolve("worked");
                });
            } else resolve("worked");
          });
      } else resolve("worked");
    }).then(() => {
      dispatch({
        type: "SET_AJAX_IN_PROGRESS",
        data: false,
      });
    });
    // let isResolved = false;

    return _promise;
  };

  return (
    <Fragment>
      {/* <div className="table-responsive calendarViewTableWrapper"> */}
      {state.ajaxInProgress ? (
        <div className="circularCentered">
          <CircularProgress size={"6em"} />
        </div>
      ) : (
        // <div className="row">
        <TableContainer
          component="div"
          className="table-responsive calendarTableViewWrapper"
          style={{ lineHeight: "0.5", maxHeight: 850 }}
        >
          <Table
            stickyHeader
            className="table calendarViewTable table-sm table-borderless"
            style={{}}
          >
            <TableHead className="tableHeadWrapper">
              <TableRow>
                <TableCell
                  colSpan={state.selectedGoals.length === 0 ? 1 : 2}
                  style={{ backgroundColor: "white" }}
                ></TableCell>
                <TableCell
                  colSpan="12"
                  style={{
                    borderRight: "0px",
                    borderBottom: "5px solid white",
                    // borderTopLeftRadius: "10px",
                    // borderTopRightRadius: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      width: "50%",
                      display: "inline-block",
                      textAlign: "right",
                    }}
                  >
                    {currentYear} COVER CROP GROWTH WINDOW
                  </Typography>
                </TableCell>
                <TableCell style={{ backgroundColor: "white" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "16%" }}>
                  <Typography variant="body1">COVER CROPS</Typography>
                </TableCell>
                {state.selectedGoals.length === 0 ? (
                  ""
                ) : (
                  <TableCell style={{ width: "10%" }}>
                    <Typography variant="body1">AVERAGE GOAL RATING</Typography>
                  </TableCell>
                )}

                {allMonths.map((month, index) => (
                  <TableCell key={`monthskey${index}`} style={{}}>
                    <Typography variant="body1">{month}</Typography>
                  </TableCell>
                ))}

                <TableCell style={{ width: "10%" }}>
                  <Typography variant="body1">MY LIST</Typography>
                  <Typography variant="subtitle1">
                    {/* <br /> */}
                    {`[${state.selectedCrops.length} CROPS]`}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="calendarTableBodyWrapper">
              {cropData
                ? cropData.map((crop, index) => {
                    if (crop.fields["Zone Decision"] === "Include")
                      return (
                        <TableRow key={`cropRow${index}`}>
                          <TableCell
                            className="calendarTableCell"
                            style={{
                              paddingBottom: "0px",
                            }}
                          >
                            <div className="tdContainer d-flex justify-content-between flex-wrap">
                              {crop.fields["Image Data"] ? (
                                <CropImage
                                  view={"calendar"}
                                  present={true}
                                  src={
                                    crop.fields["Image Data"]["Key Thumbnail"]
                                      ? `/images/Cover Crop Photos/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                                      : "https://placehold.it/100x100"
                                  }
                                  alt={crop.fields["Cover Crop Name"]}
                                />
                              ) : (
                                <CropImage view={"calendar"} present={false} />
                              )}

                              <Button
                                size="small"
                                style={{
                                  borderRadius: "0px",
                                  paddingTop: "0px",
                                }}
                              >
                                {crop.fields["Cover Crop Name"]}
                              </Button>
                            </div>
                          </TableCell>
                          {state.selectedGoals.length === 0 ? (
                            ""
                          ) : (
                            <TableCell
                              style={{
                                paddingBottom: "0px",
                                textAlign: "center",
                              }}
                            >
                              {getAverageGoalRating(state.selectedGoals, crop)}
                            </TableCell>
                          )}

                          {allMonths.map((month, index) => (
                            <GrowthWindowComponent
                              from="calendar"
                              data={crop.fields}
                              key={index}
                              id={`growthCell${index}`}
                              month={index}
                            />
                          ))}

                          <TableCell
                            style={{
                              paddingBottom: "0px",
                            }}
                          >
                            {" "}
                            <LightButton
                              id={`cartBtn${index}`}
                              style={{
                                borderRadius: "0px",
                                width: "130px",
                              }}
                              className={
                                selectedBtns.includes(`cartBtn${index}`)
                                  ? "activeCartBtn"
                                  : "inactiveCartBtn"
                              }
                              onClick={() => {
                                addCropToBasket(
                                  crop.id,
                                  crop.fields["Cover Crop Name"],
                                  `cartBtn${index}`,
                                  crop.fields
                                );
                              }}
                            >
                              {selectedBtns.includes(`cartBtn${index}`)
                                ? "ADDED"
                                : "ADD TO LIST"}
                            </LightButton>
                          </TableCell>
                        </TableRow>
                      );
                  })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        // </div>
      )}
    </Fragment>
  );
};

export default CropCalendarViewComponent;
