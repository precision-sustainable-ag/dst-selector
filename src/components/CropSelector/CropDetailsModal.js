/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
  Styles are created using makeStyles
*/

import { Backdrop, Button, Fade, makeStyles, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { CropImage, zoneIcon } from "../../shared/constants";
// import cropDesc from "../../shared/crop-descriptions.json";
import "../../styles/cropDetailsModal.scss";
import InformationSheetContent from "../InformationSheet/InformationSheetContent";

// import Axios from "axios";
// import html2canvas from "html2canvas";
const useStyles = makeStyles((theme) => ({
  modal: {
    // position: "absolute",
    // top: "10%",
    // left: "10%",
    // overflow: "",
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

const CropDetailsModalComponent = (props) => {
  let crop = props.crop;
  const classes = useStyles();
  // const [state, dispatch] = useContext(Context);
  // const [modalOpen, setModalOpen] = useState(true);
  const [modalData, setModalData] = useState({});
  const [expanded, setExpanded] = useState("panel2");
  // const [print, setPrint] = useState(false);
  // const handleAccordionChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };
  // const [sideBarData, setSideBarData] = useState({
  //   Taxonomy: [
  //     "Cover Crop Name",
  //     "Scientific Name",
  //     "Synonyms",
  //     "cv, var, or ssp to specify",
  //     "Cover Crop Group",
  //     "Family Common Name",
  //     "Family Scientific Name",
  //     "Origin",
  //     "Notes: Taxonomy",
  //   ],
  //   Environmental: [
  //     "Drought Tolerance",
  //     "Flood Tolerance",
  //     "Heat Tolerance",
  //     "Low Fertility Tolerance",
  //     "Salinity Tolerance",
  //     "Shade Tolerance",
  //     "Notes: Environmental Tolerances",
  //   ],
  //   "Basic Agronomics": [
  //     "Zone Use",
  //     "Active Growth Period",
  //     "Duration",
  //     "Shape & Orientation",
  //     "Hessian Fly-Free Date",
  //     "C to N Ratio",
  //     "Nitrogen Accumulation Min, Legumes (lbs/A/y)",
  //     "Nitrogen Accumulation Max, Legumes (lbs/A/y)",
  //     "Dry Matter Min (lbs/A/y)",
  //     "Dry Matter Max (lbs/A/y)",
  //     "Notes: Basic Agronomics",
  //   ],
  //   "Soil Conditions": [
  //     "Soil Drainage",
  //     "Soil Textures",
  //     "Minimum Tolerant Soil pH",
  //     "Maximum Tolerant Soil pH",
  //     "Soil Moisture Use",
  //     "Loosens Subsurface Soil",
  //     "Loosens Topsoil",
  //     "Supports Mycorrhizae",
  //     "Notes: Soil Conditions",
  //   ],
  //   Growth: [
  //     "Ease of Establishment",
  //     "Establishes Quickly",
  //     "Early Spring Growth",
  //     "Flowering Trigger",
  //     "Growing Window",
  //     "Root Architecture",
  //     "Root Depth",
  //     "Innoculant Type (Legumes Only)",
  //     "Frees P & K",
  //     "Notes: Growth, Roots, and Nutrients",
  //   ],
  //   Planting: [
  //     "Seeds per Pound",
  //     "Seed Price per Pound",
  //     "Base Seeding Rate Min (lbs/A)",
  //     "Base Seeding Rate Max (lbs/A)",
  //     "Drilled Depth Min",
  //     "Drilled Depth Max",
  //     "Can Aerial Seed?",
  //     "Broadcast Frost Seeding",
  //     "Min Germination Temp (F)",
  //     "Notes: Planting",
  //   ],
  //   Termination: [
  //     "Tillage Termination at Vegetative",
  //     "Tillage Termination at Flowering",
  //     "Freezing Termination at Vegetative",
  //     "Freezing Termination at Flowering",
  //     "Chemical Termination at Vegetative",
  //     "Chemical Termination at Flowering",
  //     "Mow Termination at Flowering",
  //     "Roller Crimp Termination at Flowering",
  //     "Planting Green",
  //     "Notes: Termination",
  //   ],
  //   "Grazers & Pollinators": [
  //     "Harvestability",
  //     "Grazing Tolerance",
  //     "Good Grazing",
  //     "Pollinator Food",
  //     "Pollinator Habitat",
  //     "Notes: Grazers & Pollinators",
  //   ],
  //   Weeds: [
  //     "Volunteer Establishment",
  //     "Persistence",
  //     "Hard Seededness",
  //     "Outcompetes Weeds",
  //     "Allelopathic to Weeds",
  //     "Notes: Weeds",
  //   ],
  //   "Disease and Non-weed Pests": [
  //     "Discourages Nematodes",
  //     "Promotes Nematodes",
  //     "Discourages Pest Insects",
  //     "Promotes Pest Insects",
  //     "Suppresses Cash Crop Disease",
  //     "Promotes Cash Crop Disease",
  //     "Notes: Disease and Non-weed Pests",
  //   ],
  // });

  // const [images, setImages] = useState(["https://placehold.it/100x100"]);

  useEffect(() => {
    setModalData(crop);
  }, [crop]);

  const handleModalClose = () => {
    props.setModalOpen(!props.modalOpen);
  };

  return (
    <Modal
      aria-labelledby="coover-crop-modal-title"
      aria-describedby="cover-crop-modal-description"
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
          <div className="modalParentWrapper">
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
                        <div
                          className="font-weight-bold"
                          id="cover-crop-modal-title"
                        >
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
                                ? `/images/Cover Crop Photos/100x100/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
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
                        <Button
                          style={{ color: "white" }}
                          className="dataDict"
                          onClick={() => {
                            window.open("/data-dictionary", "_blank");
                          }}
                        >
                          {zoneIcon(20, 20)}
                          <span className="pl-2">
                            Plant Hardiness Zone {crop.fields.Zone} Dataset
                          </span>
                        </Button>
                      </div>
                      <div className="col-2">
                        {/* <Button style={{ color: "white" }}>
                        <PhotoLibrary />{" "}
                        <span className="pl-2">View Photos</span>
                      </Button> */}
                      </div>
                      <div className="col-4">
                        {/* <Button style={{ color: "white" }}>Download :</Button>
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
                      </Button> */}
                      </div>
                      <div className="col-2 text-right">
                        {/* <Button
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
                      </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="" id="cover-crop-modal-description">
                  <InformationSheetContent crop={crop.fields} from="modal" />
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
// function printDiv(divName) {
//   if (document.getElementById(divName)) {
//     var printContents = document.getElementById(divName).innerHTML;
//     var originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;

//     window.print();

//     document.body.innerHTML = originalContents;
//   }
// }
export default CropDetailsModalComponent;
