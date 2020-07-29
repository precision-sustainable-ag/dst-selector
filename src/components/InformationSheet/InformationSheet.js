import React, { useState, useEffect, useContext } from "react";
import "../../styles/InformationSheet.scss";
import {
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Close,
  InfoOutlined,
  Info,
  PhotoLibrary,
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { zoneIcon, getRating } from "../../shared/constants";
import { Context } from "../../store/Store";
import SoilDrainageTimeline from "./SoilDrainageTimeline";

const InformationSheet = (props) => {
  const [state, dispatch] = useContext(Context);
  const [crop, setCrop] = useState(props.crop || BasicCrop);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].style.display = "none";
  }, []);

  return (
    <div className="wrapper container-fluid">
      <header className="row greenHeader">
        <div className="col-9">
          <span className="pr-4">DOWNLOAD:</span>
          <span className="pr-2">
            <PictureAsPdf /> PDF
          </span>
          <span className="pr-2">
            <FormatListBulleted /> SPREADSHEET
          </span>
        </div>
        <div className="col-3">
          <div>
            <Print /> PRINT
          </div>
        </div>
        <div className="col-1 text-right">
          <div>
            <Close />
          </div>
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
            {crop["Image"] ? (
              crop["Image"].map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.filename}
                  style={{
                    height: "250px",
                    width: "250px",
                  }}
                />
              ))
            ) : (
              <img
                src="//placehold.it/250x250?text=Placeholder%20Image"
                alt="placeholder"
                width="250"
                height="250"
              />
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
          <PhotoLibrary /> <span className="pl-2">View Photos</span>
        </div>
      </div>
      <div className="row coverCropDescriptionWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Cover Crop Description
          </Typography>
          {crop["Description"] ? (
            <Typography variant="body1" className="p-3">
              {crop["Description"]}
            </Typography>
          ) : (
            <Typography variant="body1" className="p-3">
              <DummyText />{" "}
            </Typography>
          )}
        </div>
      </div>
      <div className="row mt-2 coverCropGoalsWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Goals
          </Typography>
          <div className="row col-12 py-4 text-right">
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Growing Window</Typography>
              </span>
              <span className="col-3">{crop["Growing Window"]}</span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Penetrates Plow Pan</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Penetrates Plow Pan"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Nitrogen Scavenging</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Nitrogen Scavenging"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Reduces Topsoil Compaction
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Reduces Topsoil Compaction"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Lasting Residue</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Lasting Residue"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Improve Soil Organic Matter
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Improve Soil Organic Matter"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Prevent Fall Soil Erosion
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Prevent Fall Soil Erosion"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Increase Soil Aggregation
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Increase Soil Aggregation"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Prevent Spring Soil Erosion
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Prevent Spring Soil Erosion"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Supports Mycorrhizae</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Supports Mycorrhizae"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Promote Water Quality</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Promote Water Quality"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Good Grazing</Typography>
              </span>
              <span className="col-3">{getRating(crop["Good Grazing"])}</span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Forage Harvest Value</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Forage Harvest Value"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Pollinator Food</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Pollinator Food"])}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row otherRows">
        <div className="col-6 weedsRowWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Weeds
            </Typography>
          </div>
          <div className="row col-12 py-4 text-right">
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Residue Suppresses Summer Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Residue Suppresses Summer Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Outcompetes Summer Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Outcompetes Summer Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Suppresses Winter Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Suppresses Winter Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Persistence</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Persistence"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Volunteer Establishment</Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Volunteer Establishment"])}
            </div>
          </div>
        </div>
        <div className="col-6 envTolWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Environmental Tolerances
            </Typography>
          </div>
          <div className="row col-12 py-4 text-right">
            <div className="col-9 mb-2">
              <Typography variant="body1">Winter Survival</Typography>
            </div>
            {/* <div className="col-3 mb-2">
              {getRating(crop["Winter Survival"].toString())}
            </div> */}
            <div className="col-3 mb-2">
              <div className="blue-bg">
                <Typography variant="body1">
                  {crop["Winter Survival"]}
                </Typography>
              </div>
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Low Fertility</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Low Fertility"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Drought</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Drought"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Heat</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Heat"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Shade</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Shade"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Flood</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Flood"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Salinity</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Salinity"])}</div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Basic Agronomics
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Duration</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop["Duration"]}</Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Zone Use</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop["Zone Use"]}</Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Shape And Orientation</Typography>
              </div>
              <div className="col-3 mb-2">
                {crop["Shape & Orientation"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Active Growth Period</Typography>
              </div>
              <div className="col-3 mb-2">
                {crop["Active Growth Period"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">C:N</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["C to N Ratio"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Dry Matter (Lbs/A/Yr)</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {" "}
                    {`${crop["Dry Matter Min (lbs/A/y)"]} - ${crop["Dry Matter Max (lbs/A/y)"]}`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil Texture</Typography>
              </div>
              <div className="col-3 mb-2 text-capitalize">
                {crop["Soil Textures"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil PH</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {" "}
                    {`${crop["Minimum Tolerant Soil pH"]} - ${crop["Maximum Tolerant Soil pH"]}`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil Moisture Use</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Soil Moisture Use"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Hessian Fly Free Date?</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Hessian Fly Free Date"]
                      ? crop["Hessian Fly Free Date"]
                      : "No"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Soil Drainage
            </Typography>
            <div className="col-12 py-4 text-right">
              <SoilDrainageTimeline drainage={crop["Soil Drainage"]} />
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Growth
            </Typography>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Planting
            </Typography>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Termination
            </Typography>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Planting Dates
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSheet;

const DummyText = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. At imperdiet dui accumsan sit. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Porta non pulvinar neque laoreet suspendisse interdum. Malesuada fames ac turpis egestas integer eget. Eget arcu dictum varius duis at consectetur lorem donec massa. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque viverra justo nec ultrices dui sapien eget mi proin. Egestas maecenas pharetra convallis posuere. Tortor condimentum lacinia quis vel eros donec. Ultricies integer quis auctor elit sed. Nisi scelerisque eu ultrices vitae auctor eu. Eget felis eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec.";
};

const BasicCrop = () => {
  return {
    _id: {
      $oid: "5f0607732241843e7da82c03",
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
    "Flowering Trigger": ["Based on plant size"],
    "Establishes Quickly": 2,
    "Root Architecture": ["Tap"],
    "Root Depth": "Shallow",
    "Notes: Growth, Roots, and Nutrients": "Minimum Germination Temp. ~ 41˚F",
    "Tillage Termination at Vegetative": 4,
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
    "March, Early": ["Reliable establishment/growth"],
    "March, Mid": ["Reliable establishment/growth"],
    "April, Early": ["Reliable establishment/growth"],
    "April, Mid": ["Reliable establishment/growth"],
    "May, Early": ["Reliable establishment/growth"],
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
    "Promotes Nematodes": 1,
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
    __id: "rec1KNI87iZslbLy2",
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
    "Freezing at Vegetative": 2,
    "Chemical at Vegetative": 5,
    "Mow at Flowering": 5,
    "Roller Crimp at Flowering": 3,
    "Frost Seeding": -999,
    "Aerial Seeding": -999,
    "Pollinator Habitat": 0,
    "Pollinator Food": 0,
  };
};
