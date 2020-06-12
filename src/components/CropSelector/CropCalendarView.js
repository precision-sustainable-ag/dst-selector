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
} from "@material-ui/core";
import {
  LightButton,
  allMonths,
  cropDataURL,
  allGoalsURL,
  getRating,
} from "../../shared/constants";
import "../../styles/cropCalendarViewComponent.scss";
import GrowthWindowComponent from "./GrowthWindow";
import { AddCircle, FiberManualRecord, CloseRounded } from "@material-ui/icons";
import CropLegendModal from "./CropLegendModal";
import { AirtableBearerKey } from "../../shared/keys";
import RenderCashCropOverlay from "./RenderCashCropOverlay";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "1em",
    width: "30%",
    // padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const CropCalendarViewComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [goalRatings, setGoalRatings] = useState(0);
  const [legendModal, setLegendModal] = useState(false);

  // DONE: Check year logic ? currently Juliet wants to return current year if month is before november
  // ref. useeffect();
  let currentYear = new Date().getFullYear();
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

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };
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

    // setGoalRatings(getAverageGoalRating(state.selectedGoals));
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
      state.cropData.map((crop, index2) => {
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
    dispatch({
      type: "SET_AJAX_IN_PROGRESS",
      data: true,
    });
    let _promise = new Promise(async function (resolve, reject) {
      if (state.cropData.length === 0) {
        // get crop data
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
      <div className="table-responsive calendarViewTableWrapper">
        {state.ajaxInProgress ? (
          <div className="circularCentered">
            <CircularProgress size={"6em"} />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12" style={{ lineHeight: "0.5" }}>
              {/* <div className="table-overlay">
                <span> */}
              <table
                className="table calendarViewTable table-sm table-borderless"
                style={{}}
              >
                <thead className="tableHeadWrapper">
                  <tr>
                    <td
                      colSpan={state.selectedGoals.length === 0 ? 1 : 2}
                      style={{ width: "30%", backgroundColor: "white" }}
                    ></td>
                    <td
                      colSpan="12"
                      style={{
                        width: "60%",
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
                      <Typography
                        variant="body1"
                        style={{ width: "50%", display: "inline-block" }}
                      >
                        <Button
                          startIcon={<AddCircle />}
                          onClick={handleLegendModal}
                        >
                          {" "}
                          <Typography variant="body1">Legend</Typography>
                        </Button>
                      </Typography>
                    </td>
                    <td style={{ width: "10%", backgroundColor: "white" }}></td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>
                      <Typography variant="body1">COVER CROPS</Typography>
                    </td>
                    {/* {state.selectedGoals.length !== 0
     ? state.selectedGoals.map((goal, index) => (
         <th key={index}>
           <Typography variant="body1">
             {goal.toUpperCase()}
           </Typography>
         </th>
       ))
     : ""} */}
                    {state.selectedGoals.length === 0 ? (
                      ""
                    ) : (
                      <td style={{ width: "10%" }}>
                        <Typography variant="body1">
                          AVERAGE GOAL RATING
                        </Typography>
                      </td>
                    )}

                    {allMonths.map((month, index) => (
                      <td key={`monthskey${index}`} style={{ width: "5%" }}>
                        <Typography variant="body1">{month}</Typography>
                      </td>
                    ))}

                    <td style={{ width: "10%" }}>
                      <Typography variant="body1">MY LIST</Typography>
                      <Typography variant="subtitle1">
                        {/* <br /> */}
                        {`[${state.selectedCrops.length} CROPS]`}
                      </Typography>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <tr className="overlay">
                    <td></td>
                    {state.selectedGoals.length > 0 ? <td></td> : ""}
                    {allMonths.map((month, index) => (
                      // <tr>
                      <RenderCashCropOverlay
                        from="calendar"
                        key={index}
                        id={`overlayGrowthCell${index}`}
                        month={index}
                      />
                      // </tr>
                      // <div>{month}</div>
                    ))}
                    <td></td>
                  </tr>
                  {state.cropData
                    ? state.cropData.map((crop, index) => {
                        if (crop.fields["Zone Decision"] === "Include")
                          return (
                            <tr key={`cropRow${index}`}>
                              <td
                                className="calendarTableCell"
                                style={{
                                  paddingTop: "0px",
                                  paddingBottom: "0px",
                                  // fontSize: '10px'
                                }}
                              >
                                <div className="tdContainer d-flex justify-content-between flex-wrap">
                                  {/* {crop.fields["Image"] ? (
                            <img
                              src={crop.fields["Image"][0].url}
                              alt={crop.fields["Image"][0].filename}
                              style={{
                                width: "100px",
                                height: "100px",
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          ) : (
                            <img
                              src="//placehold.it/100x100"
                              alt="placeholder"
                              style={{
                                width: "100px",
                                height: "100px",
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          )} */}
                                  <img
                                    src="//placehold.it/50x50"
                                    alt="Placeholder"
                                  />
                                  <Button style={{ borderRadius: "0px" }}>
                                    {crop.fields["Cover Crop Name"]}
                                  </Button>
                                </div>
                              </td>
                              {state.selectedGoals.length === 0 ? (
                                ""
                              ) : (
                                <td
                                  style={{
                                    paddingTop: "0px",
                                    paddingBottom: "0px",
                                    // fontSize: '10px'
                                  }}
                                >
                                  {getAverageGoalRating(
                                    state.selectedGoals,
                                    crop
                                  )}
                                  {/*average goal rating */}
                                </td>
                              )}

                              {/* {index === 0 ? (
                                <td
                                  colSpan="12"
                                  rowSpan={state.cropData.length}
                                >
                                  <table style={{ width: "100%" }}>
                                    <tbody> */}
                              {allMonths.map((month, index) => (
                                // <tr>
                                <GrowthWindowComponent
                                  from="calendar"
                                  data={crop.fields}
                                  key={index}
                                  id={`growthCell${index}`}
                                  month={index}
                                />
                                // </tr>
                                // <div>{month}</div>
                              ))}
                              {/* </tbody>
                                  </table>
                                </td>
                              ) : (
                                ""
                              )} */}

                              <td
                                style={{
                                  paddingTop: "0px",
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
                                  onClick={() => {
                                    addCropToBasket(
                                      crop.id,
                                      crop.fields["Cover Crop Name"],
                                      `cartBtn${index}`,
                                      crop.fields
                                    );
                                  }}
                                >
                                  ADD TO LIST
                                </LightButton>
                              </td>
                            </tr>
                          );
                      })
                    : ""}
                </tbody>
              </table>
              {/* </span>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <CropLegendModal
        legendModal={legendModal}
        handleLegendModal={handleLegendModal}
        disableBackdropClick={false}
      />
    </Fragment>
  );
};

export default CropCalendarViewComponent;
