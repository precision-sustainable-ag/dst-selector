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
} from "@material-ui/core";

import "../../styles/cropTable.scss";
import {
  ArrowUpward,
  ArrowDownward,
  AddCircle,
  FiberManualRecord,
  CloseRounded,
  RemoveCircle,
} from "@material-ui/icons";
import GrowthWindowComponent from "./GrowthWindow";
import "../../styles/cropCalendarViewComponent.scss";
import CropDetailsModalComponent from "./CropDetailsModal";
import CropLegendModal from "./CropLegendModal";

const CropTableComponent = (props) => {
  // let cropTableElement = document.getElementById("#primaryCropTable");
  // cropTableElement.addEventListener("scroll", (e) => {
  //   let tableHead = document.querySelector("thead");
  //   let scrollTop = cropTableElement.scrollTop;
  //   tableHead.style.transform = "translateY(" + scrollTop + "px)";
  // });

  const cropData = props.cropData || [];
  const inactiveCropData = props.inactiveCropData || [];
  const activeCropData = props.activeCropData || [];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedCropsIds, setSelectedCropsIds] = useState([]);
  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.btnId;
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
  }, [props]);

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
    if (container.classList.contains("activeCartBtn")) {
      // change text back to 'add to list' and remove element from state

      if (container.textContent === "ADDED") {
        container.querySelector(".MuiButton-label").innerHTML = "ADD TO LIST";
        container.classList.remove("activeCartBtn");
        toAdd = false;
      } else toAdd = true;

      // this.state.selectedCrops.splice(x, 1);
      // get index of the element
    } else {
      // change text to 'added' and add element to state

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
            snackOpen: false,
            snackMessage: `${cropName} Added`,
          },
        });
        enqueueSnackbar(`${cropName} Added`);
      } else {
        // alert(removeIndex);
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        // console.log(selectedCropsCopy);
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
              <TableCell style={{ textAlign: "center" }} key={index}>
                {getRating(crop.fields[goal])}
              </TableCell>
            ))
          : ""}
        {showGrowthWindow ? (
          <TableCell style={goalsLength === 0 ? { width: "50%" } : {}}>
            <table style={{ width: "100%", height: "40px" }}>
              <tbody>
                <tr>
                  {allMonths.map((month, index) => (
                    <GrowthWindowComponent
                      from="tableAll"
                      data={crop.fields}
                      key={index}
                      id={`growthCell${index}`}
                      month={index}
                    />
                  ))}
                </tr>
                <tr>
                  {state.selectedGoals.length === 0
                    ? allMonths.map((month, index) => (
                        <td key={index}>{month}</td>
                      ))
                    : allMonths.map((month, index) =>
                        month === "Jan" || month === "Dec" ? (
                          <td
                            key={index}
                            style={index === 11 ? { textAlign: "right" } : {}}
                          >
                            {month}
                          </td>
                        ) : (
                          <td key={index}></td>
                        )
                      )}
                </tr>
              </tbody>
            </table>
          </TableCell>
        ) : (
          ""
        )}

        <TableCell style={{ maxWidth: "150px", textAlign: "center" }}>
          <LightButton
            id={`cartBtn${indexKey}`}
            style={{
              borderRadius: CustomStyles().nonRoundedRadius,
              width: "150px",
            }}
            className={
              selectedBtns.includes(`cartBtn${indexKey}`)
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
            {selectedBtns.includes(`cartBtn${indexKey}`)
              ? "ADDED"
              : "ADD TO LIST"}
          </LightButton>{" "}
          <br />
          <Button size="small" onClick={() => handleModalOpen(crop)}>
            View Details
          </Button>
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

  const RenderActiveInactiveCropData = () => {
    return (
      <Fragment>
        {activeCropPresent
          ? activeCropData.map((crop, index) => {
              if (crop.fields["Zone Decision"] === "Include")
                return (
                  <TableRow key={`croprow${index}`} id={crop.fields["id"]}>
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
                              ? `/images/Cover Crop Photos/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                              : "https://placehold.it/100x100"
                          }
                          alt={crop.fields["Cover Crop Name"]}
                        />
                      ) : (
                        <CropImage present={false} />
                      )}

                      <div className="cropDetailsText" style={{}}>
                        <div className="part1_ut">
                          <span className="cropCategory text-uppercase">
                            {crop.fields["Cover Crop Group"]}
                          </span>
                          <span className="cropName font-weight-lighter">
                            {crop.fields["Cover Crop Name"]}
                          </span>
                          <span className="cropScientificName">
                            {trimString(crop.fields["Scientific Name"], 25)}
                          </span>
                        </div>
                        <div className="part2_lt">
                          <span className="cropDuration text-uppercase font-weight-bold">
                            {crop.fields["Duration"]}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "left" }}>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          C TO N RATIO:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
                          {crop.fields["C to N Ratio"]}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          N FIXED:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
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
                          }{" "}
                          lbs/A/y
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          DRY MATTER:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
                          {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                          {crop.fields["Dry Matter Max (lbs/A/y)"]} lbs/A/y
                        </Typography>
                      </div>
                    </TableCell>
                    {getCardFlex(crop, index)}
                  </TableRow>
                );
            })
          : ""}

        {inactiveCropPresent
          ? inactiveCropData.map((crop, index) => {
              if (crop.fields["Zone Decision"] === "Include")
                return (
                  <TableRow
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
                      {/* {this.getCropImageFromAPI(
                crop.fields["Cover Crop Name"]
              )} */}
                      {crop.fields["Image Data"] ? (
                        <CropImage
                          present={true}
                          src={
                            crop.fields["Image Data"]["Key Thumbnail"]
                              ? `/images/Cover Crop Photos/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                              : "https://placehold.it/100x100"
                          }
                          alt={crop.fields["Cover Crop Name"]}
                        />
                      ) : (
                        <CropImage present={false} />
                      )}

                      <div className="cropDetailsText" style={{}}>
                        <div className="part1_ut">
                          <span className="cropCategory text-uppercase">
                            {crop.fields["Cover Crop Group"]}
                          </span>
                          <span className="cropName font-weight-lighter">
                            {crop.fields["Cover Crop Name"]}
                          </span>
                          <span className="cropScientificName">
                            {trimString(crop.fields["Scientific Name"], 25)}
                          </span>
                        </div>
                        <div className="part2_lt">
                          <span className="cropDuration text-uppercase font-weight-bold">
                            {crop.fields["Duration"]}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "left" }}>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          C TO N RATIO:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
                          {crop.fields["C to N Ratio"]}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          N FIXED:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
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
                          }{" "}
                          lbs/A/y
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle2"
                          component="b"
                          className="font-weight-bold"
                        >
                          DRY MATTER:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="b">
                          {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                          {crop.fields["Dry Matter Max (lbs/A/y)"]} lbs/A/y
                        </Typography>
                      </div>
                    </TableCell>
                    {getCardFlex(crop, index)}
                  </TableRow>
                );
            })
          : ""}
      </Fragment>
    );
  };

  return state.cropData.length !== 0 ? (
    <Fragment>
      <TableContainer
        className="table-responsive calendarViewTableWrapper"
        component="div"
        style={{ maxHeight: 850 }}
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
                }}
                colSpan="2"
              ></TableCell>

              {state.selectedGoals.length > 0 ? (
                <TableCell
                  colSpan={state.selectedGoals.length}
                  style={{
                    borderRight: "5px solid white",
                    backgroundColor: "#abd08f",
                    textAlign: "center",
                  }}
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
                        <ArrowDownward fontSize="inherit" />
                      ) : (
                        <ArrowUpward fontSize="inherit" />
                      )}
                      &nbsp; COVER CROPPING GOALS
                    </Button>
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}

              <TableCell
                style={{ backgroundColor: "#abd08f", textAlign: "center" }}
              >
                <Typography variant="body2">
                  <Button
                    startIcon={<AddCircle />}
                    onClick={() => {
                      const ele = document.getElementById("legendWrapper");
                      if (ele.classList.contains("d-none")) {
                        ele.classList.remove("d-none");
                      } else {
                        ele.classList.add("d-none");
                      }
                    }}
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
                              {"Cash Crop Growth Window"}
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
                }}
              ></TableCell>
            </TableRow>
            <TableRow className="theadSecond">
              <TableCell style={{ width: "28%", backgroundColor: "#abd08f" }}>
                <Typography variant="body1">
                  <Button>COVER CROPS</Button>
                </Typography>
              </TableCell>
              <TableCell style={{ width: "18%", backgroundColor: "#abd08f" }}>
                <Typography variant="body1">
                  {" "}
                  <Button>AGRONOMICS</Button>
                </Typography>
              </TableCell>
              {state.selectedGoals.length > 0
                ? state.selectedGoals.map((goal, index) => (
                    <TableCell
                      key={index}
                      style={{
                        wordBreak: "break-word",
                        maxWidth: "185px",
                        backgroundColor: "#abd08f",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body1">
                        <Button>{goal.toUpperCase()}</Button>
                      </Typography>
                    </TableCell>
                  ))
                : ""}

              {showGrowthWindow ? (
                <TableCell
                  style={{ backgroundColor: "#abd08f", textAlign: "center" }}
                >
                  <Typography variant="body1">
                    {" "}
                    <Button>PLANTING WINDOW</Button>
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}

              <TableCell
                style={{ backgroundColor: "#abd08f", textAlign: "center" }}
              >
                <Typography variant="body1">
                  {" "}
                  <Button>MY LIST</Button>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="tableBodyWrapper">
            {/* {activeCropData.length > 0 || inactiveCropData.length > 0 ? (
                <RenderActiveInactiveCropData />
              ) : ( */}
            {activeCropData.length > 0 || inactiveCropData.length > 0 ? (
              <RenderActiveInactiveCropData />
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
