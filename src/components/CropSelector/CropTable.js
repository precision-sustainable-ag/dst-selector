/* TODO: RENDER CROPS BY: 
    1. Zone decision === include
    2. sortBy default: First Selected Goal

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
} from "../../shared/constants";
import {
  Button,
  Typography,
  makeStyles,
  Table,
  CircularProgress,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";

import "../../styles/cropTable.scss";
import { ArrowUpward, ArrowDownward, AddCircle } from "@material-ui/icons";
import GrowthWindowComponent from "./GrowthWindow";
import "../../styles/cropCalendarViewComponent.scss";
import CropDetailsModalComponent from "./CropDetailsModal";
import CropLegendModal from "./CropLegendModal";

const CropTableComponent = (props) => {
  const cropData = props.cropData || [];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

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
  // const handleModalClose = () => {
  //   setModalOpen(false);
  // };
  // zone7 appid = app2q3UaKHXutMQyt
  // const url =
  // "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))";
  // const url = `https://api.airtable.com/v0/app2q3UaKHXutMQyt/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&sort=[{field: ${state.selectedGoals[0]}, direction: "asc"}]&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))`;
  useEffect(() => {
    props.showGrowthWindow
      ? setShowGrowthWindow(true)
      : setShowGrowthWindow(false);
  }, [props]);

  const checkCropsAddedToCart = () => {
    if (state.selectedCrops.length !== 0) {
      try {
        state.selectedCrops.map((crop, index) => {
          let btnId = crop.btnId;
          let container = document.getElementById(btnId);
          container.querySelector(".MuiButton-label").innerHTML = "ADDED";
          container.classList.add("activeCartBtn");
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
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

        // this.state.selectedCrops.splice(removeIndex, 1);
      }
    } else {
      // DONE: add the selected crop to state and change the state, show snackbar

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
                      from="tableOnlyCashCropWindow"
                      data={crop.fields}
                      key={index}
                      id={`growthCell${index}`}
                      month={index}
                    />
                  ))}
                </tr>
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
            onClick={() => {
              addCropToBasket(
                crop.id,
                crop.fields["Cover Crop Name"],
                `cartBtn${indexKey}`,
                crop.fields
              );
            }}
          >
            ADD TO LIST
          </LightButton>{" "}
          <br />
          <Button size="small" onClick={() => handleModalOpen(crop)}>
            View Details
          </Button>
        </TableCell>
      </Fragment>
    );

    // state.selectedGoals.map((goal, index) => (
    //   <td key={`rating${index}`}>
    //     {getRating(crop.fields[goal])}
    //     <span className="d-none">
    //       {crop.fields[goal]}
    //     </span>
    //   </td>
    // ))

    // return (
    //   <td colSpan={goalsLength}>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-around",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           flexWrap: "nowrap",
    //           justifyContent: "space-around",
    //         }}
    //       >
    //         {state.selectedGoals.length > 0 ? (
    //           state.selectedGoals.map((goal, index) => (
    //             <div key={`rating${index}`}>
    //               {crop.fields[goal]
    //                 ? getRating(crop.fields[goal])
    //                 : getRating(0)}
    //               <span className="d-none">{crop.fields[goal]}</span>
    //             </div>
    //           ))
    //         ) : (
    //           <div></div>
    //         )}
    //         <div>
    //           <table style={{ width: "188px", height: "40px" }}>
    //             <tbody>
    //               <tr>
    //                 {allMonths.map((month, index) => (
    //                   <GrowthWindowComponent
    //                     from="tableOnlyCashCropWindow"
    //                     data={crop.fields}
    //                     key={index}
    //                     id={`growthCell${index}`}
    //                     month={index}
    //                   />
    //                 ))}
    //               </tr>
    //               <tr>
    //                 {allMonths.map((month, index) => (
    //                   <GrowthWindowComponent
    //                     from="tableAll"
    //                     data={crop.fields}
    //                     key={index}
    //                     id={`growthCell${index}`}
    //                     month={index}
    //                   />
    //                 ))}
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //         <div className="button1">
    // <LightButton
    //   id={`cartBtn${indexKey}`}
    //   style={{
    //     borderRadius: CustomStyles().nonRoundedRadius,
    //     width: "130px",
    //   }}
    //   onClick={() => {
    //     addCropToBasket(
    //       crop.id,
    //       crop.fields["Cover Crop Name"],
    //       `cartBtn${indexKey}`,
    //       crop.fields
    //     );
    //   }}
    // >
    //   ADD TO LIST
    // </LightButton>
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           flexWrap: "nowrap",
    //           justifyContent: "space-around",
    //         }}
    //       >
    // <div>
    //   <Typography variant="subtitle2" component="b">
    //     C TO N RATIO:
    //   </Typography>
    //   <Typography variant="subtitle2" component="b">
    //     {crop.fields["C to N Ratio"]}
    //   </Typography>
    // </div>
    // <div>
    //   <Typography variant="subtitle2" component="b">
    //     N FIXED:
    //   </Typography>
    //   <Typography variant="subtitle2" component="b">
    //     NONE
    //   </Typography>
    // </div>
    // <div>
    //   <Typography variant="subtitle2" component="b">
    //     DRY MATTER:
    //   </Typography>
    //   <Typography variant="subtitle2" component="b">
    //     {crop.fields["Dry Matter Min (lbs/A/y)"]}-
    //     {crop.fields["Dry Matter Max (lbs/A/y)"]} LBS/A/Y
    //   </Typography>
    // </div>

    //         <div className="button2" style={{ display: "flex" }}>
    //           <Button size="small" onClick={() => handleModalOpen(crop)}>
    //             View Details
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </td>
    // );
  };

  return cropData.length !== 0 ? (
    <TableContainer>
      <div className="table-responsive calendarViewTableWrapper">
        {state.ajaxInProgress ? (
          <div className="circularCentered">
            <CircularProgress size={"6em"} />
          </div>
        ) : (
          <Table className="table table-borderless table-sm">
            <TableHead className="tableHeadWrapper">
              <tr>
                <th
                  style={{
                    backgroundColor: "white",
                    // borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    // borderTopRightRadius: CustomStyles()._10pxRoundedRadius,
                  }}
                  colSpan="2"
                ></th>

                {state.selectedGoals.length > 0 ? (
                  <th
                    colSpan={state.selectedGoals.length}
                    style={{
                      // borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                      // borderTopRightRadius: CustomStyles()._10pxRoundedRadius,
                      // borderBottom: "2px solid white",
                      borderRight: "5px solid white",
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
                  </th>
                ) : (
                  ""
                )}

                <th
                  style={
                    {
                      // borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                      // borderTopRightRadius: CustomStyles()._10pxRoundedRadius,
                    }
                  }
                >
                  <Button startIcon={<AddCircle />} onClick={handleLegendModal}>
                    {" "}
                    <Typography variant="body2">LEGEND</Typography>
                  </Button>
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    // borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    // borderTopRightRadius: CustomStyles()._10pxRoundedRadius,
                  }}
                ></th>
              </tr>
              <tr>
                <th style={{ width: "28%" }}>
                  <Typography variant="body2">COVER CROPS</Typography>
                </th>
                <th style={{ width: "18%" }}>
                  <Typography variant="body2">AGRONOMICS</Typography>
                </th>
                {state.selectedGoals.length > 0
                  ? state.selectedGoals.map((goal, index) => (
                      <th
                        key={index}
                        style={{ wordBreak: "break-word", maxWidth: "185px" }}
                      >
                        <Typography variant="body2">
                          {goal.toUpperCase()}
                        </Typography>
                      </th>
                    ))
                  : ""}

                {showGrowthWindow ? (
                  <th>
                    <Typography variant="body2">GROWTH WINDOW</Typography>
                  </th>
                ) : (
                  ""
                )}

                <th>
                  <Typography variant="body2">MY LIST</Typography>
                </th>
              </tr>
            </TableHead>

            <TableBody className="tableBodyWrapper">
              {props.cropData.map((crop, index) => {
                if (
                  // !crop.fields["Cover Crop Name"].trim() !==
                  // "Ok hopefully he answers me soon.".trim()
                  true
                ) {
                  if (crop.fields["Zone Decision"] === "Include")
                    return (
                      <TableRow key={`croprow${index}`}>
                        <TableCell
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {/* {this.getCropImageFromAPI(
                          crop.fields["Cover Crop Name"]
                        )} */}
                          {crop.fields["Image"] ? (
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

                        {/* <td style={{}}> */}
                        {/* <div className="button1">
                            <LightButton
                              id={`cartBtn${index}`}
                              style={{
                                borderRadius: CustomStyles().nonRoundedRadius,
                                width: "130px"
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
                          </div>
                          <br />
                          <div className="button2">
                            <Button
                              size="small"
                              onClick={() => handleModalOpen(crop)}
                            >
                              View Details
                            </Button>
                          </div> */}
                        {/* </td> */}
                      </TableRow>
                    );
                } else return "";
              })}
            </TableBody>
          </Table>
        )}
      </div>

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
    </TableContainer>
  ) : (
    ""
  );
};

export default CropTableComponent;
