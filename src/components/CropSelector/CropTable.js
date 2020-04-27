/* TODO: RENDER CROPS BY: 
    1. Zone decision === include
    2. sortBy default: First Selected Goal

*/
import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import { useSnackbar } from "notistack";
import {
  LightButton,
  zoneIcon,
  CustomStyles,
  allMonths,
  getRating
} from "../../shared/constants";
import {
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  CircularProgress,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  IconButton
} from "@material-ui/core";

import "../../styles/cropTable.scss";
import {
  PhotoLibrary,
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Info,
  Close,
  ExpandMore,
  ArrowUpward,
  ArrowDownward
} from "@material-ui/icons";
import GrowthWindowComponent from "./GrowthWindow";
import "../../styles/cropCalendarViewComponent.scss";
import CropDetailsModalComponent from "./CropDetailsModal";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "0px"
    // padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const CropTableComponent = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  
  const handleModalOpen = crop => {
    // setModalOpen(true);
    // put data inside modal
    setModalData(crop);

    setModalOpen(true);
  };

  const [showGrowthWindow, setShowGrowthWindow] = useState(true);

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
    // if (state.cropData.length === 0) {
    //   const headers = new Headers();
    //   headers.append("Authorization", "Bearer ***REMOVED***");
    //   fetch(url, {
    //     headers: headers
    //   })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       dispatch({
    //         type: "PULL_CROP_DATA",
    //         data: data.records
    //       });
    //       checkCropsAddedToCart();
    //     });
    // }
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
        .map(function(item) {
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
            snackMessage: `${cropName} Added`
          }
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
            snackMessage: `${cropName} Removed`
          }
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
          snackMessage: `${cropName} Added`
        }
      });
      enqueueSnackbar(`${cropName} Added`);
    }
  };

  const getCardFlex = (crop, indexKey) => {
    let goalsLength = state.selectedGoals.length;

    // state.selectedGoals.map((goal, index) => (
    //   <td key={`rating${index}`}>
    //     {getRating(crop.fields[goal])}
    //     <span className="d-none">
    //       {crop.fields[goal]}
    //     </span>
    //   </td>
    // ))

    return (
      <td colSpan={goalsLength + 2}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-around"
            }}
          >
            {state.selectedGoals.map((goal, index) => (
              <div key={`rating${index}`}>
                {crop.fields[goal]
                  ? getRating(crop.fields[goal])
                  : getRating(0)}
                <span className="d-none">{crop.fields[goal]}</span>
              </div>
            ))}
            <div>
              <table style={{ width: "188px", height: "40px" }}>
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
            </div>
            <div className="button1">
              <LightButton
                id={`cartBtn${indexKey}`}
                style={{
                  borderRadius: CustomStyles().nonRoundedRadius,
                  width: "130px"
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
              </LightButton>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-around"
            }}
          >
            <div>
              <Typography variant="subtitle2" component="b">
                C TO N RATIO:
              </Typography>
              <Typography variant="subtitle2" component="b">
                {crop.fields["C to N Ratio"]}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" component="b">
                N FIXED:
              </Typography>
              <Typography variant="subtitle2" component="b">
                NONE
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" component="b">
                DRY MATTER:
              </Typography>
              <Typography variant="subtitle2" component="b">
                {crop.fields["Dry Matter Min (lbs/A/y)"]}-
                {crop.fields["Dry Matter Max (lbs/A/y)"]} LBS/A/Y
              </Typography>
            </div>

            <div className="button2" style={{ display: "flex" }}>
              <Button size="small" onClick={() => handleModalOpen(crop)}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </td>
    );
  };

  return props.cropData.length !== 0 ? (
    <TableContainer>
      <div className="table-responsive calendarViewTableWrapper">
        {state.ajaxInProgress ? (
          <div className="circularCentered">
            <CircularProgress size={"6em"} />
          </div>
        ) : (
          <Table className="table table-borderless table-sm">
            {/* <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            /> */}

            <TableHead className="tableHeadWrapper">
              <tr>
                <th
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    borderTopRightRadius: CustomStyles()._10pxRoundedRadius
                  }}
                ></th>
                <th
                  colSpan={state.selectedGoals.length + 1}
                  style={{
                    borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    borderTopRightRadius: CustomStyles()._10pxRoundedRadius,
                    borderBottom: "2px solid white",
                    borderRight: "5px solid white"
                  }}
                >
                  <Typography variant="body2">
                    {true ? (
                      <IconButton size="small">
                        <ArrowUpward fontSize="inherit" />
                      </IconButton>
                    ) : (
                      <IconButton size="small">
                        <ArrowUpward fontSize="inherit" />
                      </IconButton>
                    )}
                    COVER CROPPING GOALS
                  </Typography>
                </th>
                <th
                  style={{
                    borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    borderTopRightRadius: CustomStyles()._10pxRoundedRadius
                  }}
                >
                  <Typography variant="body2">LEGEND</Typography>
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: CustomStyles()._10pxRoundedRadius,
                    borderTopRightRadius: CustomStyles()._10pxRoundedRadius
                  }}
                ></th>
              </tr>
              <tr>
                <th>
                  <Typography variant="body2">COVER CROPS</Typography>
                </th>
                <th
                  colSpan={
                    state.selectedGoals.length > 0
                      ? state.selectedGoals.length + 2
                      : 2
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "space-around"
                    }}
                  >
                    {state.selectedGoals.length !== 0
                      ? state.selectedGoals.map((goal, index) => (
                          <div key={index}>
                            <Typography variant="body2">
                              {goal.toUpperCase()}
                            </Typography>
                          </div>
                        ))
                      : ""}
                    {showGrowthWindow ? (
                      <div>
                        <Typography variant="body2">GROWTH WINDOW</Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      <Typography variant="body2">MY LIST</Typography>
                    </div>
                  </div>
                </th>
              </tr>
            </TableHead>
            {/* <TableHead className="tableHeadWrapper">
              <tr>
                <th>
                  <Typography variant="body1">COVER CROPS</Typography>
                </th>
                {state.selectedGoals.length !== 0
                  ? state.selectedGoals.map((goal, index) => (
                      <th key={index}>
                        <Typography variant="body1">
                          {goal.toUpperCase()}
                        </Typography>
                      </th>
                    ))
                  : ""}
                {showGrowthWindow ? (
                  <th style={{ minWidth: "300px" }}>
                    <Typography variant="body1">GROWTH WINDOW</Typography>
                  </th>
                ) : (
                  ""
                )}

                <th>
                  <Typography variant="body1">MY LIST</Typography>

                </th>
              </tr>
            </TableHead> */}
            <TableBody className="tableBodyWrapper">
              {props.cropData.map((crop, index) => {
                if (
                  !crop.fields["Cover Crop Name"].trim() !==
                  "Ok hopefully he answers me soon.".trim()
                ) {
                  if (crop.fields["Zone Decision"] === "Include")
                    return (
                      <TableRow key={`croprow${index}`}>
                        <TableCell
                          style={{
                            display: "flex",
                            flexDirection: "row"
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
                                maxWidth: "100px",
                                maxHeight: "100px",
                                flexBasis: "20%"
                              }}
                            />
                          ) : (
                            <img
                              src="//placehold.it/100x100"
                              alt="placeholder"
                              style={{
                                flexBasis: "20%"
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
                                {crop.fields["Scientific Name"]}
                              </span>
                            </div>
                            <div className="part2_lt">
                              <span className="cropDuration text-uppercase font-weight-bold">
                                {crop.fields["Duration"]}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        {state.selectedGoals.length !== 0
                          ? getCardFlex(crop, index)
                          : ""}

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
    </TableContainer>
  ) : (
    ""
  );
};

export default CropTableComponent;
