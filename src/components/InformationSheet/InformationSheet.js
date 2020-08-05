import React, { useState, useEffect, useContext, Fragment } from "react";
import "../../styles/InformationSheet.scss";
import {
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Close,
  Info,
} from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";
import { zoneIcon, CropImage } from "../../shared/constants";
import { Context } from "../../store/Store";

import html2canvas from "html2canvas";
import * as JSPDF from "jspdf";
import { saveAs } from "file-saver";
import InformationSheetContent from "./InformationSheetContent";

const removeHeaderContent = () => {
  document.querySelector(".row.greenHeader > .col-9").classList.add("d-none");
  document.querySelector(".row.greenHeader > .col-2").classList.add("d-none");
  document.querySelector(".row.greenHeader > .col-1").classList.add("d-none");
};

const InformationSheet = (props) => {
  const [state] = useContext(Context);

  const name = props.match.params.cropName
    ? props.match.params.cropName
    : "none";

  const cropData = props.match.params.cropName
    ? state.cropData.find(
        (crop) => crop.fields["Cover Crop Name"] === props.match.params.cropName
      )
    : "none";
  //   check if crop data is passed as crop
  //   elseif, check if localstorage has infosheet data else use default crop data
  const [referrer, setReferrer] = useState("direct");
  const [crop] = useState(
    name === "none"
      ? props.crop
        ? props.crop
        : window.localStorage.getItem("infosheet") !== null
        ? JSON.parse(window.localStorage.getItem("infosheet"))
        : BasicCrop
      : cropData.fields
  );
  const ref = React.createRef();
  const from = props.from || "direct";

  useEffect(() => {
    document.getElementsByTagName("footer")[0].style.display = "none";

    if (window.localStorage.getItem("infosheet") !== null) {
      // removeHeaderContent();
      document.title = crop["Cover Crop Name"];
      window.print();
    }

    // delete localstorage
    window.localStorage.removeItem("infosheet");

    // if (props.modal) {
    //   // component being invoked from modal
    //   setReferrer("modal");
    //   document
    //     .querySelector(".row.greenHeader > .col-1")
    //     .classList.remove("d-none");
    // } else {
    //   document
    //     .querySelector(".row.greenHeader > .col-1")
    //     .classList.add("d-none");
    //   setReferrer("direct");
    // }
  }, []);

  const exportToPdf = (filename) => {
    const input = document.body;
    // const h = input.clientHeight;
    const h = input.offsetHeight;
    // const w = input.clientWidth;
    const w = input.offsetWidth;

    // const ratio = divHeight / divWidth;
    html2canvas(input, { scale: 2, scrollY: -window.scrollY }).then(function (
      canvas
    ) {
      var img = canvas.toDataURL("image/jpeg", 1);
      saveAs(img, filename + ".jpg");
      //   var doc = new JSPDF("L", "px", [w, h]);
      //   doc.addImage(img, "JPEG", 0, 0, w, h);
      //   doc.save(filename + ".pdf");
    });
    // html2canvas(input, { scale: "1" }).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/jpeg");
    //   saveAs(imgData, "image.png");
    //   const pdfDOC = new JSPDF("l", "mm", "a4"); //  use a4 for smaller page

    //   const width = pdfDOC.internal.pageSize.getWidth();
    //   let height = pdfDOC.internal.pageSize.getHeight();
    //   height = ratio * width;

    //   pdfDOC.addImage(imgData, "JPEG", 0, 0, width - 20, height - 10);
    //   pdfDOC.save("summary.pdf"); //Download the rendered PDF.
    // });
  };

  return (
    <div className="wrapper container-fluid" ref={ref}>
      <header className="row greenHeader">
        <div className="col-10">
          <span className="pr-4">DOWNLOAD:</span>
          <span className="pr-2">
            <Button
              style={{ color: "white" }}
              href={`/pdf/${crop["Cover Crop Name"]}.pdf`}
              target="_blank"
              rel="noreferer"
            >
              <PictureAsPdf /> &nbsp; PDF
            </Button>
          </span>
          <span className="pr-2">
            <Button
              href={`/csv/${crop["Cover Crop Name"]}.csv`}
              style={{ color: "white" }}
            >
              <FormatListBulleted />
              &nbsp; SPREADSHEET
            </Button>
          </span>
        </div>
        <div className="col-1">
          <Button onClick={window.print} style={{ color: "white" }}>
            <Print /> &nbsp;PRINT
          </Button>
        </div>
        <div className="col-1 text-right">
          <Button onClick={props.closeModal} style={{ color: "white" }}>
            <Close />
          </Button>
        </div>
      </header>
      <div className="row">
        <div className="col-6">
          <div className="row coverCropNames">
            <div className="col-12 coverCropGroup">
              <Typography
                variant="body1"
                className="text-uppercase text-muted font-weight-bold"
              >
                {crop["Cover Crop Group"]}
              </Typography>
            </div>
            <div className="col-12 coverCropName">
              <Typography variant="h5" className="pr-3" display="inline">
                {crop["Cover Crop Name"]}
              </Typography>

              <Typography
                variant="subtitle2"
                display="inline"
                className="text-muted font-italic"
              >
                {crop["Scientific Name"]}
              </Typography>
            </div>
            <div className="col-12 pt-3">
              <span className="pr-2">
                <Info style={{ color: "#2b7b79" }} />
              </span>
              <span>
                <Typography variant="body1" display="inline">
                  This data is based on expert opinion.
                </Typography>
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row coverCropImagesWrapper">
            {crop["Image Data"] ? (
              <CropImage
                present={true}
                view={"information-sheet"}
                src={
                  crop["Image Data"]["Key Thumbnail"]
                    ? `/images/Cover Crop Photos/${crop["Image Data"]["Directory"]}/${crop["Image Data"]["Key Thumbnail"]}`
                    : "https://placehold.it/100x100"
                }
                alt={crop["Cover Crop Name"]}
              />
            ) : (
              <CropImage present={false} view={"information-sheet"} />
            )}
          </div>
        </div>
      </div>
      <div className="row middleGreenStrip">
        <div className="col-6">
          {zoneIcon(20, 20)}
          <span className="pl-2">
            Plant Hardiness Zone {state.zone} Dataset
          </span>
        </div>
        <div className="col-6 text-right">
          {/* <PhotoLibrary /> <span className="pl-2">View Photos</span> */}
        </div>
      </div>

      <InformationSheetContent crop={crop} />
    </div>
  );
};

export default InformationSheet;

const BasicCrop = () => {
  return {
    _id: {
      $oid: "5f24456fe695147b85dd78fe",
    },
    "Cover Crop Name": "Pea, Spring",
    "Scientific Name": "Pisum sativum",
    Synonyms: "Garden Pea",
    "cv, var, or ssp to specify": "Spring '1020'",
    "Notes: Taxonomy":
      "forage pea would be better common name - actual garden peas have been bred for unpigmented seed coats and high sugar, which reduces germination",
    Origin: "MCCC Species tool",
    "Drought Tolerance": 3,
    "Shade Tolerance": 2,
    "Flood Tolerance": 2,
    "Low Fertility Tolerance": 4,
    "Salinity Tolerance": 1,
    "Winter Survival": ["Never"],
    "Active Growth Period": ["Fall", "Spring", "Summer"],
    Duration: ["Annual"],
    "Shape & Orientation": ["Semi-Erect", "Climbing"],
    "Notes: Basic Agronomics":
      "Dry matter highly dependent on planting and termination date and precipitation. Season length, habit vary by cultivar. Biomass breaks down quickly; early planting and termination reduces winter survival. Mixes well with grains when grown for forage. Bloat potential that is easily managed. Seed vigor highly variable. For grazing purposes, restrict to 30% of total ration or mixing with a grass is recommended.",
    "Review Status": "Zone Team Start",
    "Soil Drainage": [
      "Somewhat poorly drained",
      "Moderately well drained",
      "Well drained",
      "Excessively drained",
      "Well drained muck",
    ],
    "Min Germination Temp (F)": 42,
    "Seeds per Pound": 3500,
    "Inoculant Type (Legumes Only)": ["pea/vetch"],
    "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "58-104",
    "Seeding Rate: Drilled (lbs/A)": "50-100",
    "Seeding Rate: Aerial (lbs/A)": "Not Recommended",
    "Drilled Depth Min": 1,
    "Loosens Topsoil": 2,
    "Frees P & K": 5,
    "Growing Window": "Short",
    "Ease of Establishment": 2,
    "Family Common Name": "Pea family",
    "Family Scientific Name": "Fabaceae",
    "Soil Textures": ["medium", "coarse"],
    "Minimum Tolerant Soil pH": 6,
    "Maximum Tolerant Soil pH": 7.5,
    "Soil Moisture Use": "Medium",
    "Cover Crop Group": "Legume",
    "Heat Tolerance": 3,
    "Seed Price per Pound": 3,
    "USDA Symbol": "PISA6",
    "Zone Decision": "Include",
    "Zone Use": "Emerging",
    "Shape & Orientation-USDA PLANTS": "Climbing",
    "Flooding Tolerance": "Poor",
    "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 40,
    "Dry Matter Min (lbs/A/y)": 1000,
    "C to N Ratio": 1,
    "Active Growth Period-USDA PLANTS": ["Spring", "Summer"],
    "Notes: Termination [Goal: Method: Timing]":
      "If using herbicides to terminate use a tank mixture (e.g., glyphosate + dicamba or 2,4-d)",
    "Loosens Subsurface Soil": 1,
    "Supports Mycorrhizae": 3,
    "Early Spring Growth": 3,
    "Flowering Trigger": ["Plant Size"],
    "Establishes Quickly": 2,
    "Root Architecture": ["Tap"],
    "Root Depth": "Shallow",
    "Notes: Growth, Roots, and Nutrients": "Minimum Germination Temp. ~ 41˚F",
    "Tillage Termination at Vegetative": 4,
    "Pollinator Habitat": 4,
    "Pollinator Food": 2,
    "Tillage Termination at Flowering": 4,
    "Freezing Termination at Vegetative": 2,
    "Freezing Termination at Flowering": 5,
    "Chemical Termination at Flowering": 5,
    "Mow Termination at Flowering": 5,
    "Chemical Termination at Vegetative": 5,
    "Mow Tolerance at Vegetative": 5,
    "Roller Crimp Tolerance at Flowering": 3,
    "Roller Crimp Tolerance at Vegetative": 1,
    "Volunteer Establishment": 5,
    Persistence: 1,
    "Notes: Weeds":
      " Late planting increases heaving. Weak plant with low volunteer seed survivability.",
    "Seed price per acre: Drilled/Cultipack and Cultivation": 3,
    "Seed price per acre: Broadcast (w/cultivation)": 3,
    "Improve Soil Organic Matter": 1,
    "Increase Soil Aggregation": 2,
    "Lasting Residue": 1,
    "Penetrates Plow Pan": 1,
    "Base Seeding Rate Min (lbs/A)": 40,
    "Base Seeding Rate Max (lbs/A)": 100,
    "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 100,
    "Dry Matter Max (lbs/A/y)": 2500,
    "Drilled Depth Max": 1.5,
    "Reduces Topsoil Compaction": 2,
    "March, Early": [
      "Reliable establishment/growth",
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
    ],
    "March, Mid": [
      "Reliable establishment/growth",
      "Reliable Establishment/Growth",
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
      "Standard Spring Seeding Rate Date",
    ],
    "April, Early": [
      "Reliable establishment/growth",
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
    ],
    "April, Mid": [
      "Reliable establishment/growth",
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
    ],
    "May, Early": [
      "Reliable establishment/growth",
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
    ],
    "May, Mid": ["Reliable establishment/growth"],
    "August, Early": ["Reliable establishment/growth", "Early seeding rate"],
    "August, Mid": ["Reliable establishment/growth", "Standard seeding rate"],
    "September, Early": ["Reliable establishment/growth", "Late seeding rate"],
    "September, Mid": ["Reliable establishment/growth"],
    "Prevent Fall Soil Erosion": 1,
    "Prevent Spring Soil Erosion": 3,
    "Promote Water Quality": 1,
    "Nitrogen Fixation": 3,
    "Nitrogen Scavenging": 1,
    "Good Grazing": 3,
    "Forage Harvest Value": 4,
    "C to N Ratio - 3 stars": 1,
    "Residue Suppresses Summer Annual Weeds": 2,
    "Outcompetes Summer Annual Weeds": 3,
    "Disoucrages Nematodes": 2,
    "Promotes Nematodes": 3,
    "Discourages Pest Insects": 2,
    "Promotes Pest Insects": 1,
    "Notes: Disease & Non-Weed Pests":
      "Information too limited to rate P and K effect. Some cultivars, nematode resistant. Poor host for soybean cyst nematode. With late planting,  biomass is low and spring pea won't suppress winter weeds. Good cool season component for grazing mixes. Quick cool season nitrogen fixer. Susceptible to sclerotinia in East;  Late planting increases heaving. Host for root knot nematode, Penetrans Root-Lesion Nematode and sugarbeet cyst nematode.  Weak plant with low volunteer seed survivability.",
    "Suppresses Cash Crop Disease": 2,
    "Promotes Cash Crop Disease": 1,
    "Early Spring Seeding Rate Date Start": "2020-02-15",
    "Early Spring Seeding Rate Date End": "2020-07-15",
    "Standard Spring Seeding Rate Date Start": "2020-02-15",
    "Standard Spring Seeding Rate Date End": "2020-05-15",
    "Suppresses Winter Annual Weeds": 2,
    Notes:
      "Best mixed with cereals to prevent lodging. Less competitive against summer annual weeds in hot-summer areas (such as Contintental hardiness zone 6).",
    "Reliable Establishment/Growth Start": "2020-02-15",
    "Reliable Establishment/Growth End": "2020-05-15",
    "Notes: Pollinators":
      "Self-pollinated so not particularly useful for pollinators compared to other legumes",
    "Notes: Nematodes":
      "Some cultivars, nematode resistant. Poor host for soybean cyst nematode.  Host for root knot nematode, Penetrans Root-Lesion Nematode and sugarbeet cyst nematode. ",
    __id: "rec1KNI87iZslbLy2",
    "February, Early": [
      "Reliable Establishment/Growth",
      "Standard Spring Seeding Rate Date",
    ],
    "Image Data": {
      "Cover Crop": "Pea, Spring",
      "Key Thumbnail": "Spring_pea_flowering_Brown_2020.JPG",
      Notes: null,
      Directory: "Pea, Spring",
    },
    "Crop Description":
      "Also known as Yellow Pea or Canadian Spring Pea. Winter-kills if planted in fall. Excellent spring cover crop. Plant early for lush growth; fast-growing varieties are available. Inoculate the seed with appropriate Rhizobium spp. Cross inoculates vetch. Mixes well with spring oat, forage radish. Lower biomass and total N fixation compared to overwintered peas.",
    "Discourages Nematodes": 2,
    id: "rec1KNI87iZslbLy2",
    Drought: 3,
    Flood: 2,
    Heat: 3,
    "Low Fertility": 4,
    Salinity: 1,
    Shade: 2,
    "Tillage at Vegetative": 4,
    "Tillage at Flowering": 4,
    "Freezing at Flowering": 5,
    "Freezing at Vegetative": 2,
    "Chemical at Vegetative": 5,
    "Chemical at Flowering": 5,
    "Mow at Flowering": 5,
    "Roller Crimp at Flowering": 3,
    "Frost Seeding": -999,
    "Aerial Seeding": -999,
  };
};
