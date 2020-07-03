import React, { useState, useContext, useEffect, Fragment } from "react";
import { Context } from "../../store/Store";
import { zoneIcon, getRating } from "../../shared/constants";
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
} from "@material-ui/core";
import {
  PhotoLibrary,
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Info,
  Close,
  ExpandMore,
} from "@material-ui/icons";
import Axios from "axios";
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
    padding: "0px",
    // padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const CropDetailsModalComponent = (props) => {
  let crop = props.crop;
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  // const [modalOpen, setModalOpen] = useState(true);
  const [modalData, setModalData] = useState({});

  const [sideBarData, setSideBarData] = useState({
    Taxonomy: [
      "Cover Crop Name",
      "Scientific Name",
      "Synonyms",
      "cv, var, or ssp to specify",
      "Cover Crop Group",
      "Family Common Name",
      "Family Scientific Name",
      "Origin",
      "Notes: Taxonomy",
    ],
    Environmental: [
      "Heat Tolerance",
      "Drought Tolerance",
      "Shade Tolerance",
      "Flood Tolerance",
      "Low Fertility Tolerance",
      "Salinity Tolerance",
      "Winter Survival",
      "Notes: Environmental Tolerances",
    ],
    "Basic Agronomics": [
      "Zone Use",
      "Active Growth Period",
      "Duration",
      "Shape & Orientation",
      "Hessian Fly-Free Date",
      "C to N Ratio",
      "Nitrogen Accumulation Min, Legumes (lbs/A/y)",
      "Nitrogen Accumulation Max, Legumes (lbs/A/y)",
      "Dry Matter Min (lbs/A/y)",
      "Dry Matter Max (lbs/A/y)",
      "Notes: Basic Agronomics",
    ],
    "Soil Conditions": [
      "Soil Drainage",
      "Flooding/Ponding Tolerance",
      "Soil Textures",
      "Minimum Tolerant Soil pH",
      "Maximum Tolerant Soil pH",
      "Soil Moisture Use",
      "Loosens Subsurface Soil",
      "Loosens Topsoil",
      "Supports Mycorrhizae",
      "Notes: Soil Conditions",
    ],
    Growth: [
      "Ease of Establishment",
      "Establishes Quickly",
      "Early Spring Growth",
      "Flowering Trigger",
      "Growing Window",
      "Root Architecture",
      "Root Depth",
      "Innoculant Type (Legumes Only)",
      "Frees P & K",
      "Notes: Growth, Roots, and Nutrients",
    ],
    Planting: [
      "Seeds per Pound",
      "Seed Price per Pound",
      "Base Seeding Rate Min (lbs/A)",
      "Base Seeding Rate Max (lbs/A)",
      "Drilled Depth Min",
      "Drilled Depth Max",
      "Can Aerial Seed?",
      "Broadcast Frost Seeding",
      "Min Germination Temp (F)",
      "Notes: Planting",
    ],
    Termination: [
      "Tillage Termination at Vegetative",
      "Tillage Termination at Flowering",
      "Freezing Termination at Vegetative",
      "Freezing Termination at Flowering",
      "Chemical Termination at Vegetative",
      "Chemical Termination at Flowering",
      "Mow Termination at Flowering",
      "Roller Crimp Termination at Flowering",
      "Planting Green",
      "Notes: Termination",
    ],
    "Grazers & Pollinators": [
      "Harvestability",
      "Grazing Tolerance",
      "Grazing Value",
      "Pollinator Food",
      "Pollinator Habitat",
      "Notes: Grazers & Pollinators",
    ],
    Weeds: [
      "Volunteer Establishment",
      "Hard Seededness",
      "Outcompetes Weeds",
      "Allelopathic to Weeds",
      "Notes: Weeds",
    ],
    "Disease and Non-weed Pests": [
      "Discourages Nematodes",
      "Promotes Nematodes",
      "Discourages Pest Insects",
      "Promotes Pest Insects",
      "Suppresses Cash Crop Disease",
      "Promotes Cash Crop Disease",
      "Notes: Disease and Non-weed Pests",
    ],
  });

  const [images, setImages] = useState(["https://placehold.it/100x100"]);

  useEffect(() => {
    setModalData(crop);
    // get 5 images related to crop
  }, [crop]);

  // const getImages = async (cropName) => {
  //   let cropNameFormatted = encodeURIComponent(cropName);
  //   let requestBuffer = await Axios.get(
  //     `https://api.qwant.com/api/search/images?count=5&q=${cropNameFormatted}Spring&t=images&safesearch=1&locale=en_US&uiv=4`,
  //     {
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
  //       },
  //     }
  //   );
  //   return requestBuffer;
  // };

  const handleModalClose = () => {
    props.setModalOpen(!props.modalOpen);
    // dispatch({
    //   type: "TOGGLE_CROP_DETAIL_MODAL",
    //   data: { cropDetailModal: false }
    // });
    // setModalOpen(false);
  };

  // const renderImages = (cropName) => {
  //   // getImages(cropName).then((data) => {
  //   //   console.log(data.data);
  //   // });

  //   return (
  //     <Fragment>
  //       {images.map((image, index) => (
  //         <img key={index} src={image} alt={`${cropName} Image ${index + 1}`} />
  //       ))}
  //     </Fragment>
  //   );
  // };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="ransition-modal-description"
      className={classes.modal}
      open={props.modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      style={{ overflow: "scroll", height: "100%" }}
    >
      <Fade in={props.modalOpen}>
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
                    borderTopRightRadius: "5px",
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
                        paddingLeft: "0px",
                      }}
                    >
                      {crop.fields["Image"] ? (
                        <img
                          src={crop.fields["Image"][0].url}
                          alt={crop.fields["Image"][0].filename}
                          style={{
                            height: "100px",
                            width: "200px",
                          }}
                        />
                      ) : (
                        <img src="//placehold.it/100x100" alt="placeholder" />
                      )}
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
                <div className="col-7">
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis eu interdum elit, nec convallis ex. Sed in posuere
                        ipsum. Vivamus eget scelerisque urna, at maximus mauris.
                        Suspendisse potenti. Nullam eget vulputate nulla. Morbi
                        eget suscipit libero. Phasellus eleifend velit vitae leo
                        efficitur luctus. Donec euismod odio et urna elementum
                        elementum. Curabitur quam nisi, blandit eu libero at,
                        efficitur dignissim dui. Aenean viverra consectetur odio
                        ac sodales. Nunc elit sem, tincidunt et ligula ac,
                        volutpat venenatis ex. Sed feugiat suscipit lorem vitae
                        efficitur. Morbi malesuada elit a urna ornare faucibus.
                        Curabitur id varius enim. Praesent dui erat, faucibus
                        quis consequat quis, condimentum eget diam. Phasellus
                        efficitur sapien ac ex suscipit pretium. Quisque ut nisi
                        fringilla, scelerisque purus sit amet, fermentum justo.
                        Maecenas dignissim ornare lectus, eget congue elit
                        vulputate vel. Quisque pellentesque quam eget ante
                        commodo, a porta dolor interdum. Donec ut nisi ligula.
                        Aenean eget cursus lectus, vel mattis enim. Nunc rutrum
                        pulvinar imperdiet. In finibus nunc eu mattis semper.
                        Nunc pharetra dui velit, eget pellentesque nulla
                        molestie in. Ut gravida ac leo sit amet blandit. Duis
                        sapien ipsum, volutpat quis nisl quis, ornare laoreet
                        diam. Nunc sit amet eros vel ante rutrum ullamcorper a
                        scelerisque magna. Etiam semper orci eget lorem dictum,
                        in varius est laoreet. Curabitur enim velit, pharetra ut
                        ullamcorper in, volutpat nec lacus. Cras sed nunc
                        iaculis, dignissim enim id, elementum lectus. Fusce
                        auctor turpis
                      </p>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">Taxonomy</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData.Taxonomy.map((sideBarVal, index) => (
                            <div className="col-6" key={`taxonomy--${index}`}>
                              <Typography
                                variant="body1"
                                className="font-weight-bold"
                              >
                                {sideBarVal}
                              </Typography>
                              <Typography variant="body2">
                                {crop.fields[sideBarVal]}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
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
                        {Object.keys(sideBarData)[1]}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData["Environmental"].map(
                            (sideBarVal, index) => (
                              <div
                                className="col-6"
                                key={`environmental--${index}`}
                              >
                                <Typography
                                  variant="body1"
                                  className="font-weight-bold"
                                  component="div"
                                >
                                  {sideBarVal}
                                </Typography>
                                <Typography variant="body2" component="div">
                                  {sideBarVal === "Winter Survival"
                                    ? getRating(0)
                                    : sideBarVal ===
                                      "Notes: Environmental Tolerances"
                                    ? crop.fields[sideBarVal]
                                    : getRating(
                                        parseInt(crop.fields[sideBarVal])
                                      )}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                      <Typography variant="body1">Basic Agronomics</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData["Basic Agronomics"].map(
                            (sideBarVal, index) => (
                              <div
                                className="col-6"
                                key={`basic-agronomics--${index}`}
                              >
                                <Typography
                                  variant="body1"
                                  className="font-weight-bold"
                                  component="div"
                                >
                                  {sideBarVal}
                                </Typography>
                                <Typography variant="body2" component="div">
                                  {crop.fields[sideBarVal]}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData["Soil Conditions"].map(
                            (sideBarVal, index) => (
                              <div
                                className="col-6"
                                key={`soil-conditions--${index}`}
                              >
                                <Typography
                                  variant="body1"
                                  className="font-weight-bold"
                                  component="div"
                                >
                                  {sideBarVal}
                                </Typography>
                                <Typography variant="body2" component="div">
                                  {crop.fields[sideBarVal]}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData.Growth.map((sideBarVal, index) => (
                            <div className="col-6" key={`growth--${index}`}>
                              <Typography
                                variant="body1"
                                className="font-weight-bold"
                                component="div"
                              >
                                {sideBarVal}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {crop.fields[sideBarVal]}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
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
                      <Typography variant="body1">Planting</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData.Planting.map((sideBarVal, index) => (
                            <div className="col-6" key={`planting--${index}`}>
                              <Typography
                                variant="body1"
                                className="font-weight-bold"
                                component="div"
                              >
                                {sideBarVal}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {crop.fields[sideBarVal]}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
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
                      <Typography variant="body1">Termination</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData.Termination.map((sideBarVal, index) => (
                            <div
                              className="col-6"
                              key={`environmental--${index}`}
                            >
                              <Typography
                                variant="body1"
                                className="font-weight-bold"
                                component="div"
                              >
                                {sideBarVal}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {sideBarVal === "Planting Green"
                                  ? getRating(0)
                                  : sideBarVal === "Notes: Termination"
                                  ? crop.fields[sideBarVal]
                                  : getRating(
                                      parseInt(crop.fields[sideBarVal])
                                    )}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
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
                        Grazers & Pollinators
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData["Grazers & Pollinators"].map(
                            (sideBarVal, index) => (
                              <div
                                className="col-6"
                                key={`grazers-and-pollinators--${index}`}
                              >
                                <Typography
                                  variant="body1"
                                  className="font-weight-bold"
                                  component="div"
                                >
                                  {sideBarVal}
                                </Typography>
                                <Typography variant="body2" component="div">
                                  {crop.fields[sideBarVal]}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                      <Typography variant="body1">Weeds</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData.Weeds.map((sideBarVal, index) => (
                            <div className="col-6" key={`weeds--${index}`}>
                              <Typography
                                variant="body1"
                                className="font-weight-bold"
                                component="div"
                              >
                                {sideBarVal}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {crop.fields[sideBarVal]}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
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
                        Disease & Non-weed Pests
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="container-fluid">
                        <div className="row">
                          {sideBarData["Disease and Non-weed Pests"].map(
                            (sideBarVal, index) => (
                              <div
                                className="col-6"
                                key={`disease-and-non-weed-pests--${index}`}
                              >
                                <Typography
                                  variant="body1"
                                  className="font-weight-bold"
                                  component="div"
                                >
                                  {sideBarVal}
                                </Typography>
                                <Typography variant="body2" component="div">
                                  {crop.fields[sideBarVal]}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
  );
};

export default CropDetailsModalComponent;
