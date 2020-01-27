import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import { LightButton, zoneIcon } from "../../shared/constants";
import {
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";

import "../../styles/cropTable.scss";
import {
  PhotoLibrary,
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Info,
  Close,
  ExpandMore
} from "@material-ui/icons";
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

const CropTableComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleModalOpen = crop => {
    setModalOpen(true);
    // put data inside modal
    setModalData(crop);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const url =
    "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))";
  useEffect(() => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer keywdZxSD9AC4vL6e");
    fetch(url, {
      headers: headers
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          type: "PULL_CROP_DATA",
          data: data.records
        });
        checkCropsAddedToCart();
      });
  }, [state.cropData]);

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
            snackOpen: true,
            snackMessage: `${cropName} Added`
          }
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
            snackMessage: `${cropName} Removed`
          }
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
          snackMessage: `${cropName} Added`
        }
      });
    }
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <table className="table">
          <thead className="tableHeadWrapper">
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
              <th>
                <Typography variant="body1">GROWTH WINDOW</Typography>
              </th>
              <th>
                <Typography variant="body1">MY LIST</Typography>
                <Typography variant="subtitle1">
                  {/* <br /> */}
                  {`[${state.selectedCrops.length} CROPS]`}
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className="tableBodyWrapper">
            {state.cropData.map((crop, index) => {
              if (
                !crop.fields["Cover Crop Name"].trim() !==
                "Ok hopefully he answers me soon.".trim()
              ) {
                return (
                  <tr key={`croprow${index}`}>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      {/* {this.getCropImageFromAPI(
                          crop.fields["Cover Crop Name"]
                        )} */}
                      <img
                        src="http://placehold.it/100x100"
                        alt="placeholder"
                        style={{
                          flexBasis: "20%"
                        }}
                      />
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
                    </td>
                    {state.selectedGoals.length !== 0
                      ? state.selectedGoals.map((goal, index) => (
                          <td key={`rating${index}`}>
                            {getRating(crop.fields[goal])}
                          </td>
                        ))
                      : ""}
                    <td>GROWTH WINDOW</td>
                    <td style={{}}>
                      <div className="button1">
                        <LightButton
                          id={`cartBtn${index}`}
                          style={{
                            borderRadius: "0px",
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
                          View Crop Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              } else return "";
            })}
          </tbody>
        </table>
      </div>

      <div className="cropGoals"></div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="ransition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        disableBackdropClick={true}
      >
        <Fade in={modalOpen}>
          {modalData.fields ? (
            <div className={`cropTableModal modalContainer ${classes.paper}`}>
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-12"
                    style={{
                      background: "#2D7B7B",
                      color: "white",
                      height: "auto",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px"
                    }}
                  >
                    <div className="row">
                      <div className="col-2 offset-10 text-right">
                        {" "}
                        <Button
                          style={{ color: "white" }}
                          onClick={handleModalClose}
                        >
                          <Close />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col mt-2">
                        <div>{modalData.fields["Cover Crop Group"]}</div>
                        <div className="font-weight-bold">
                          {modalData.fields["Cover Crop Name"]}
                        </div>
                        <div>{modalData.fields["Scientific Name"]}</div>
                      </div>
                      <div
                        className="col"
                        style={{
                          textAlign: "right",
                          paddingRight: "0px",
                          paddingLeft: "0px"
                        }}
                      >
                        <img src="//placehold.it/100x100" />
                        <img src="//placehold.it/100x100" />
                        <img src="//placehold.it/100x100" />
                        <img src="//placehold.it/100x100" />
                        <img src="//placehold.it/100x100" />
                        <img src="//placehold.it/100x100" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-12"
                    style={{ background: "#2D7B7B", color: "white" }}
                  >
                    <div className="row">
                      <div className="col-4">
                        <Button style={{ color: "white" }}>
                          {zoneIcon(20, 20)}
                          <span className="pl-2">
                            Plant Hardiness Zone {state.zone} Dataset
                          </span>
                        </Button>
                      </div>
                      <div className="col-2">
                        <Button style={{ color: "white" }}>
                          <PhotoLibrary />{" "}
                          <span className="pl-2">View Photos</span>
                        </Button>
                      </div>
                      <div className="col-4">
                        <Button style={{ color: "white" }}>Download :</Button>
                        <Button style={{ color: "white" }}>
                          <PictureAsPdf />
                          <span className="pl-2">PDF</span>
                        </Button>
                        <Button style={{ color: "white" }}>
                          <FormatListBulleted />
                          <span className="pl-2">SPREADSHEET</span>
                        </Button>
                      </div>
                      <div className="col-2 text-right">
                        <Button style={{ color: "white" }}>
                          <Print /> <span className="pl-2">PRINT</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6">
                        <Typography variant="h6">Cover Crop Uses</Typography>
                      </div>
                      <div className="col-6 text-right">
                        <small>
                          (Source: NRCS Plant Guide{" "}
                          <Info style={{ fontSize: "10pt" }} /> )
                        </small>
                      </div>

                      <div className="col-12 mt-2">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis eu interdum elit, nec convallis ex. Sed in
                          posuere ipsum. Vivamus eget scelerisque urna, at
                          maximus mauris. Suspendisse potenti. Nullam eget
                          vulputate nulla. Morbi eget suscipit libero. Phasellus
                          eleifend velit vitae leo efficitur luctus. Donec
                          euismod odio et urna elementum elementum. Curabitur
                          quam nisi, blandit eu libero at, efficitur dignissim
                          dui. Aenean viverra consectetur odio ac sodales. Nunc
                          elit sem, tincidunt et ligula ac, volutpat venenatis
                          ex. Sed feugiat suscipit lorem vitae efficitur. Morbi
                          malesuada elit a urna ornare faucibus. Curabitur id
                          varius enim. Praesent dui erat, faucibus quis
                          consequat quis, condimentum eget diam. Phasellus
                          efficitur sapien ac ex suscipit pretium. Quisque ut
                          nisi fringilla, scelerisque purus sit amet, fermentum
                          justo. Maecenas dignissim ornare lectus, eget congue
                          elit vulputate vel. Quisque pellentesque quam eget
                          ante commodo, a porta dolor interdum. Donec ut nisi
                          ligula. Aenean eget cursus lectus, vel mattis enim.
                          Nunc rutrum pulvinar imperdiet. In finibus nunc eu
                          mattis semper. Nunc pharetra dui velit, eget
                          pellentesque nulla molestie in. Ut gravida ac leo sit
                          amet blandit. Duis sapien ipsum, volutpat quis nisl
                          quis, ornare laoreet diam. Nunc sit amet eros vel ante
                          rutrum ullamcorper a scelerisque magna. Etiam semper
                          orci eget lorem dictum, in varius est laoreet.
                          Curabitur enim velit, pharetra ut ullamcorper in,
                          volutpat nec lacus. Cras sed nunc iaculis, dignissim
                          enim id, elementum lectus. Fusce auctor turpis
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">Agronomic</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">
                          Environmental Tolerance
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">Soil Conditions</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">Growth</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">
                          Planting &amp; Termination
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">
                          Grazers &amp; Pollinators
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      className="modalSideBar"
                      defaultExpanded={false}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="modal-side-panel-content"
                      >
                        <Typography variant="body1">
                          Pests &amp; Disease
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Fade>
      </Modal>
    </Fragment>
  );
};

const getRating = ratng => {
  let rating = parseInt(ratng);
  if (rating === 0) {
    return (
      <div className="rating-0">
        <span></span>
      </div>
    );
  } else if (rating === 1) {
    return (
      <div className="rating-1">
        <span></span>
      </div>
    );
  } else if (rating === 2) {
    return (
      <div className="rating-2">
        <span></span>
      </div>
    );
  } else if (rating === 3) {
    return (
      <div className="rating-3">
        <span></span>
      </div>
    );
  } else if (rating === 4) {
    return (
      <div className="rating-4">
        <span></span>
      </div>
    );
  } else if (rating === 5) {
    return (
      <div className="rating">
        <span></span>
      </div>
    );
  }
};

export default CropTableComponent;
