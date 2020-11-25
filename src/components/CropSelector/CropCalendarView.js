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
  Tooltip,
} from "@material-ui/core";
import {
  LightButton,
  allMonths,
  cropDataURL,
  allGoalsURL,
  getRating,
  CropImage,
  CustomStyles,
  flipCoverCropName,
  trimString,
} from "../../shared/constants";
import "../../styles/cropCalendarViewComponent.scss";
import GrowthWindowComponent from "./GrowthWindow";
// import { AddCircle, FiberManualRecord, CloseRounded } from "@material-ui/icons";
import CropLegendModal from "./CropLegendModal";
import { AirtableBearerKey } from "../../shared/keys";
import {
  AddCircle,
  Eco,
  WbSunny,
  LocalFlorist,
  AcUnit,
} from "@material-ui/icons";
import CropDetailsModalComponent from "./CropDetailsModal";
import CropSelectorCalendarView from "./CropSelectorCalendarView";
// import RenderCashCropOverlay from "./RenderCashCropOverlay";
const growthIcon = {
  color: "white",
};
const CropCalendarViewComponent = (props) => {
  const { cropData, activeCropData, inactiveCropData } = props;
  const [state, dispatch] = useContext(Context);
  const [legendModal, setLegendModal] = useState(false);
  const [selectedCropsIds, setSelectedCropsIds] = useState([]);
  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.id;
  });

  const handleLegendModal = () => {
    setLegendModal(!legendModal);
  };

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

  const checkIfGrowthMonth = (month) => {
    const { activeGrowthPeriod } = state;

    if (activeGrowthPeriod.length !== 0) {
      if (activeGrowthPeriod.includes(month)) return true;
      else return false;
    } else {
      return false;
    }
  };
  const sortReset = (from = "cropName") => {
    setActiveSortType("goals");
    // reset to default
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
  const [activeSortType, setActiveSortType] = useState("goals");
  const [nameSortFlag, setNameSortFlag] = useState(true);
  const [selectedCropsSortFlag, setSelectedCropsSortFlag] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([{}]);

  const RenderCrops = ({ cropData, active = true }) => {
    return cropData.map((crop, index) => {
      if (crop.fields["Zone Decision"] === "Include")
        return (
          <TableRow
            key={`cropRow${index}`}
            style={active ? {} : { opacity: "0.2" }}
          >
            <TableCell
              className="calendarTableCell"
              style={{
                paddingBottom: "0px",
              }}
            >
              <div className="tdContainer d-flex justify-content-between flex-nowrap">
                {crop.fields["Image Data"] ? (
                  <Button
                    size="small"
                    onClick={() => {
                      setModalData(crop);
                      setModalOpen(!modalOpen);
                    }}
                  >
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
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() => {
                      setModalData(crop);
                      setModalOpen(!modalOpen);
                    }}
                  >
                    <CropImage view={"calendar"} present={false} />
                  </Button>
                )}

                <Button
                  size="small"
                  style={
                    {
                      // borderRadius: "0px",
                      // paddingTop: "0px",
                    }
                  }
                  onClick={() => {
                    setModalData(crop);
                    setModalOpen(!modalOpen);
                  }}
                >
                  {crop.fields["Cover Crop Name"] !== "Sorghum-sudangrass"
                    ? flipCoverCropName(crop.fields["Cover Crop Name"])
                    : trimString(
                        flipCoverCropName(crop.fields["Cover Crop Name"]),
                        15
                      )}
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

            {/* {allMonths.map((month, index) => (
              <GrowthWindowComponent
                from="calendar"
                data={crop.fields}
                key={index}
                id={`growthCell${index}`}
                month={index}
              />
            ))} */}
            <TableCell colSpan="12">
              <CropSelectorCalendarView from="calendar" data={crop} />
            </TableCell>

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
                  selectedBtns.includes(crop.fields.id)
                    ? "activeCartBtn"
                    : "inactiveCartBtn"
                }
                onClick={() => {
                  addCropToBasket(
                    crop.fields["id"],
                    crop.fields["Cover Crop Name"],
                    `cartBtn${index}`,
                    crop.fields
                  );
                }}
              >
                {selectedBtns.includes(crop.fields.id)
                  ? "ADDED"
                  : "ADD TO LIST"}
              </LightButton>
            </TableCell>
          </TableRow>
        );
    });
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
          style={{ lineHeight: "0.5" }}
        >
          <Table
            stickyHeader
            className="table calendarViewTable table-sm table-borderless"
            style={{}}
          >
            <TableHead className="tableHeadWrapper">
              <TableRow className="calFirstHeadRow">
                <TableCell
                  colSpan={state.activeGrowthPeriod.length === 0 ? 2 : 1}
                  style={{ backgroundColor: "white" }}
                ></TableCell>
                {state.activeGrowthPeriod.length === 0 ? (
                  <TableCell
                    colSpan="12"
                    style={{
                      borderBottom: "5px solid white",
                    }}
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-6">
                          <Typography variant="body1">
                            <Button>
                              {currentYear} COVER CROP GROWTH WINDOW
                            </Button>
                          </Typography>
                        </div>
                        <div className="col-6">
                          <Typography variant="body1">
                            <Button
                              startIcon={<AddCircle />}
                              onClick={handleLegendModal}
                            >
                              Legend
                            </Button>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                ) : (
                  <Fragment>
                    <TableCell
                      colSpan="1"
                      style={{
                        borderBottom: "5px solid white",
                        borderRight: "5px solid white",
                      }}
                    >
                      <Button>ACTIVE GROWTH PERIOD</Button>
                    </TableCell>

                    {state.activeGrowthPeriod.includes("Jan") ? (
                      <Tooltip placement="top" title="Winter">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            // borderBottom: "5px solid " + CustomStyles().darkGreen,
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
                      <TableCell
                        style={{ borderBottom: "5px solid white" }}
                        colSpan="2"
                      ></TableCell>
                    )}

                    {state.activeGrowthPeriod.includes("Mar") ? (
                      <Tooltip placement="top" title="Spring">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            // borderBottom: "5px solid " + CustomStyles().darkGreen,
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
                      <TableCell
                        style={{ borderBottom: "5px solid white" }}
                        colSpan="3"
                      ></TableCell>
                    )}

                    {state.activeGrowthPeriod.includes("Jun") ? (
                      <Tooltip placement="top" title="Summer">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            // borderBottom: "5px solid " + CustomStyles().darkGreen,
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
                      <TableCell
                        style={{ borderBottom: "5px solid white" }}
                        colSpan="3"
                      ></TableCell>
                    )}

                    {state.activeGrowthPeriod.includes("Sep") ? (
                      <Tooltip placement="top" title="Fall">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            // borderBottom: "5px solid " + CustomStyles().darkGreen,
                            backgroundColor: CustomStyles().darkGreen,
                          }}
                          colSpan="3"
                        >
                          <Typography variant="body1">
                            <Eco style={growthIcon} />
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    ) : (
                      <TableCell
                        style={{ borderBottom: "5px solid white" }}
                        colSpan="3"
                      ></TableCell>
                    )}
                    {state.activeGrowthPeriod.includes("Dec") ? (
                      <Tooltip placement="top" title="Winter">
                        <TableCell
                          className="activeGrowthMonth growthMonthSeparator"
                          style={{
                            // borderBottom: "5px solid " + CustomStyles().darkGreen,
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
                      <TableCell
                        style={{ borderBottom: "5px solid white" }}
                        colSpan="1"
                      ></TableCell>
                    )}
                  </Fragment>
                )}
                {state.activeGrowthPeriod.length > 0 ? (
                  <TableCell
                    style={{
                      borderLeft: "5px solid white",
                      borderBottom: "5px solid white",
                    }}
                  >
                    <div className="col-12">
                      <Typography variant="body1">
                        <Button
                          startIcon={<AddCircle />}
                          onClick={handleLegendModal}
                        >
                          Legend
                        </Button>
                      </Typography>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell style={{ backgroundColor: "white" }}></TableCell>
                )}
              </TableRow>
              <TableRow className="calSecondHeadRow">
                <TableCell
                  style={{ width: "17%", borderRight: "5px solid white" }}
                >
                  <Button onClick={sortCropsByName}>COVER CROPS</Button>
                </TableCell>
                {state.selectedGoals.length === 0 ? (
                  ""
                ) : (
                  <TableCell
                    style={{ width: "13%", borderRight: "5px solid white" }}
                  >
                    <Button onClick={sortReset}>AVERAGE GOAL RATING</Button>
                  </TableCell>
                )}

                {allMonths.map((month, index) => {
                  const growthMonth = checkIfGrowthMonth(month);
                  const growthMonthSeparator = growthMonth
                    ? month === "Feb" ||
                      month === "May" ||
                      month === "Aug" ||
                      month === "Nov"
                      ? true
                      : false
                    : false;

                  return (
                    <TableCell
                      key={`monthskey${index}`}
                      className={`calendarSecondHeadMonth ${
                        growthMonth ? `activeGrowthMonth` : ``
                      } ${growthMonthSeparator ? `growthMonthSeparator` : ``}`}
                    >
                      <Button>{month}</Button>
                    </TableCell>
                  );
                })}

                <TableCell
                  style={{ width: "10%", borderLeft: "5px solid white" }}
                >
                  <Button
                    // onClick={() => {
                    //   dispatch({
                    //     type: "ACTIVATE_MY_COVER_CROP_LIST_TILE",
                    //     data: {
                    //       myCoverCropActivationFlag: true,
                    //       speciesSelectorActivationFlag: false,
                    //     },
                    //   });
                    // }}
                    onClick={sortBySelectedCrops}
                  >
                    MY LIST <br />
                    {`[${state.selectedCrops.length} CROPS]`}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="calendarTableBodyWrapper">
              {activeCropData.length > 0 ? (
                <RenderCrops active={true} cropData={activeCropData} />
              ) : (
                ""
              )}
              {inactiveCropData.length > 0 ? (
                <RenderCrops active={false} cropData={inactiveCropData} />
              ) : (
                ""
              )}
            </TableBody>
          </Table>
        </TableContainer>
        // </div>
      )}
      <CropLegendModal
        legendModal={legendModal}
        handleLegendModal={handleLegendModal}
        disableBackdropClick={false}
      />
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </Fragment>
  );
};

export default CropCalendarViewComponent;
