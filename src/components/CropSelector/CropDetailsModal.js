import React, { useState, useContext, useEffect, Fragment } from "react";
import { Context } from "../../store/Store";
import { zoneIcon, getRating } from "../../shared/constants";
import cropDesc from "../../shared/crop-descriptions.json";
import "../../styles/cropDetailsModal.scss";
import {
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  withStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import {
  PhotoLibrary,
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Info,
  Close,
  ExpandMoreOutlined,
  ExpandLessOutlined,
  AddCircleOutline,
  RemoveCircleOutline,
  ExpandMore,
} from "@material-ui/icons";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    // display: "block",
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
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);
const CropDetailsModalComponent = (props) => {
  let crop = props.crop;
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  // const [modalOpen, setModalOpen] = useState(true);
  const [modalData, setModalData] = useState({});
  const [expanded, setExpanded] = React.useState("panel2");

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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
      "Drought Tolerance",
      "Flood Tolerance",
      "Heat Tolerance",
      "Low Fertility Tolerance",
      "Salinity Tolerance",
      "Shade Tolerance",
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
      "Good Grazing",
      "Pollinator Food",
      "Pollinator Habitat",
      "Notes: Grazers & Pollinators",
    ],
    Weeds: [
      "Volunteer Establishment",
      "Persistence",
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

  const handleModalClose = () => {
    props.setModalOpen(!props.modalOpen);
  };

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
              <div className="row" id="coverCropModalPrimary">
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
                      <Button
                        href={`/information-sheets/${crop.fields["Cover Crop Name"]}.pdf`}
                        style={{ color: "white" }}
                        download={`${crop.fields["Cover Crop Name"]}`}
                      >
                        <PictureAsPdf />
                        <span className="pl-2">PDF</span>
                      </Button>
                      <Button style={{ color: "white" }}>
                        <FormatListBulleted />
                        <span className="pl-2">SPREADSHEET</span>
                      </Button>
                    </div>
                    <div className="col-2 text-right">
                      <Button
                        style={{ color: "white" }}
                        // onClick={() => printDiv("coverCropModalPrimary")}
                      >
                        <Print /> <span className="pl-2">PRINT</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 pb-4">
                <div className="col-7">
                  <div className="row">
                    <div className="col-6">
                      <Typography variant="h6">
                        Cover Crop Description
                      </Typography>
                    </div>
                    <div className="col-6 text-right">
                      <small>
                        (Source: NRCS Plant Guide{" "}
                        <Info style={{ fontSize: "10pt" }} /> )
                      </small>
                    </div>

                    <div className="col-12 mt-2">
                      <p>
                        {
                          cropDesc[`${crop.fields["Cover Crop Name"]}`][
                            "Topic Details"
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <Accordion
                    square
                    expanded={expanded === "panel1"}
                    onChange={handleAccordionChange("panel1")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      // expandIcon={<ExpandLessOutlined />}
                    >
                      <Typography>
                        {expanded === "panel1" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Agronomics
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                  {sideBarVal === "C to N Ratio"
                                    ? getRating(
                                        parseInt(crop.fields[sideBarVal])
                                      )
                                    : crop.fields[sideBarVal]}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel2"}
                    onChange={handleAccordionChange("panel2")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>
                        {expanded === "panel2" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Environmental Tolerance
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                    ? crop.fields[sideBarVal].toString()
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
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleAccordionChange("panel3")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>
                        {" "}
                        {expanded === "panel3" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Soil Conditions
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                  {sideBarVal === "Soil Drainage" ||
                                  sideBarVal === "Soil Textures"
                                    ? crop.fields[sideBarVal].toString()
                                    : sideBarVal === "Notes: Soil Conditions"
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
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel4"}
                    onChange={handleAccordionChange("panel4")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                      <Typography>
                        {" "}
                        {expanded === "panel4" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Growth
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                {sideBarVal === "Flowering Trigger" ||
                                sideBarVal === "Growing Window" ||
                                sideBarVal === "Root Depth" ||
                                sideBarVal === "Root Architecture" ||
                                sideBarVal === "Inoculant Type (Legumes Only)"
                                  ? crop.fields[sideBarVal].toString()
                                  : sideBarVal ===
                                    "Notes: Growth, Roots, and Nutrients"
                                  ? crop.fields[sideBarVal]
                                  : getRating(
                                      parseInt(crop.fields[sideBarVal])
                                    )}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel5"}
                    onChange={handleAccordionChange("panel5")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel5d-content"
                      id="panel5d-header"
                    >
                      <Typography>
                        {" "}
                        {expanded === "panel5" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Planting & Termination
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel6"}
                    onChange={handleAccordionChange("panel6")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel6d-content"
                      id="panel6d-header"
                    >
                      <Typography>
                        {" "}
                        {expanded === "panel6" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Grazers & Pollinators
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                  {sideBarVal === "Notes: Grazers & Pollinators"
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
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel7"}
                    onChange={handleAccordionChange("panel7")}
                    className="accordion"
                  >
                    <AccordionSummary
                      aria-controls="panel7d-content"
                      id="panel7d-header"
                    >
                      <Typography>
                        {" "}
                        {expanded === "panel7" ? (
                          <RemoveCircleOutline />
                        ) : (
                          <AddCircleOutline />
                        )}{" "}
                        Pests & Disease
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                  {sideBarVal ===
                                  "Notes: Disease and Non-weed Pests"
                                    ? crop.fields[sideBarVal]
                                    : getRating(
                                        parseInt(crop.fields[sideBarVal])
                                      )}
                                </Typography>
                              </div>
                            )
                          )}

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
                                {sideBarVal === "Notes: Weeds"
                                  ? crop.fields[sideBarVal]
                                  : getRating(
                                      parseInt(crop.fields[sideBarVal])
                                    )}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
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
function printDiv(divName) {
  if (document.getElementById(divName)) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
export default CropDetailsModalComponent;
