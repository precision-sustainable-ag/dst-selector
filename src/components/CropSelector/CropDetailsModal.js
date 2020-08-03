import React, { useState, useContext, useEffect, Fragment } from "react";
import { Context } from "../../store/Store";
import { zoneIcon, getRating, CropImage } from "../../shared/constants";
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
  AddCircleOutline,
  RemoveCircleOutline,
  ExpandMore,
  AddCircle,
} from "@material-ui/icons";
import InformationSheetContent from "../InformationSheet/InformationSheetContent";
// import Axios from "axios";
// import html2canvas from "html2canvas";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
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
  AccordionSummaryIcon: {
    "& div.MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(45deg)",
    },
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
  const [expanded, setExpanded] = useState("panel2");
  const [print, setPrint] = useState(false);
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

  // const setPrintContents = (id) => {
  //   // setPrint(true);
  //   setPrint(!print);
  //   html2canvas(document.getElementById(`cropDetailModal-${id}`))
  //     .then((canvas) => {
  //       // document.body.appendChild(canvas)
  //       const dataUrl = canvas.toDataURL();
  //       let windowContent = "<!DOCTYPE html>";
  //       windowContent += "<html>";
  //       windowContent += "<head><title>Print View</title></head>";
  //       windowContent += "<body>";
  //       windowContent += '<img src="' + dataUrl + '">';
  //       windowContent += "</body>";
  //       windowContent += "</html>";

  //       const printWin = window.open(
  //         "",
  //         "",
  //         "width=" +
  //           window.screen.availWidth +
  //           ",height=" +
  //           window.screen.availHeight
  //       );
  //       printWin.document.open();
  //       printWin.document.write(windowContent);

  //       printWin.document.addEventListener(
  //         "load",
  //         function () {
  //           printWin.focus();
  //           // printWin.print();
  //           // printWin.document.close();
  //           // printWin.close();
  //         },
  //         true
  //       );
  //     })
  //     .then(() => {
  //       setPrint(!print);
  //     });
  //   // console.log(divId);
  //   // let innerContents = document.getElementById(`modal-` + divId);
  //   // let newWindow = window.open(
  //   //   "",
  //   //   "mywindow",
  //   //   "status=1,width=350,height=150"
  //   // );
  //   // newWindow.document.write(innerContents);

  //   // let printconf = window.print();
  //   // console.log(printconf);
  // };

  // useEffect(() => {
  //   console.log("run");
  // });
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
      // id={`modal-${props.crop.fields["id"]}`}
    >
      <Fade in={props.modalOpen}>
        {modalData.fields ? (
          <div
            className={`cropTableModal modalContainer ${classes.paper}`}
            id={`cropDetailModal-${modalData.fields["id"]}`}
          >
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
                      <Button
                        style={{ color: "white" }}
                        href={`/csv/${crop.fields["Cover Crop Name"]}.csv`}
                        download={`${crop.fields["Cover Crop Name"]}`}
                      >
                        <FormatListBulleted />
                        <span className="pl-2">SPREADSHEET</span>
                      </Button>
                    </div>
                    <div className="col-2 text-right">
                      <Button
                        style={{ color: "white" }}
                        // href={`http://covercrop.tools/information-sheets/${encodeURIComponent(
                        //   crop.fields["Cover Crop Name"]
                        // )}.pdf`}
                        // target="_blank"
                        onClick={() => {
                          window.localStorage.setItem(
                            "infosheet",
                            JSON.stringify(crop.fields)
                          );
                          window.open("/information-sheet", "_blank");
                        }}
                      >
                        <Print /> <span className="pl-2">PRINT</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <InformationSheetContent crop={crop.fields} from="modal" />
              </div>
              {/* <div className="row mt-4 pb-4">
                <div className={print ? "col-12" : "col-7"}>
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
                        {cropDesc[`${crop.fields["Cover Crop Name"]}`][
                          "Topic Details"
                        ]
                          ? cropDesc[`${crop.fields["Cover Crop Name"]}`][
                              "Topic Details"
                            ]
                          : "No Data"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={print ? "col-12" : "col-12"}>
                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Agronomics</Typography>
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
                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>Environmental Tolerance</Typography>
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
                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>Soil Conditions</Typography>
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

                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                      <Typography>Growth</Typography>
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

                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel5d-content"
                      id="panel5d-header"
                    >
                      <Typography>Planting & Termination</Typography>
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

                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel6d-content"
                      id="panel6d-header"
                    >
                      <Typography>Grazers & Pollinators</Typography>
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

                  <Accordion defaultExpanded className="accordion">
                    <AccordionSummary
                      expandIcon={<AddCircleOutline />}
                      className={classes.AccordionSummaryIcon}
                      aria-controls="panel7d-content"
                      id="panel7d-header"
                    >
                      <Typography>Pests & Disease</Typography>
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
              </div> */}
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
