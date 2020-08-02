import React, { useState, useEffect, Fragment, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import "../../styles/cropComparisonView.scss";
import {
  DataTooltip,
  getRating,
  RenderSeedPriceIcons,
} from "../../shared/constants";
import { MonetizationOn } from "@material-ui/icons";
import { Context } from "../../store/Store";

const lightBorder = {
  border: "1px solid #35999b",
  padding: "5px",
  marginBottom: "5px",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
};
const lightBG = {
  border: "1px solid white",
  backgroundColor: "#f1f7eb",
  padding: "5px",
  marginBottom: "5px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  minHeight: "36px",
};
const MyCoverCropComparisonComponent = (props) => {
  const [state, dispatch] = useContext(Context);
  const { filterKeys } = state;
  return (
    <div className="container-fluid comparisonContainer">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <Card style={{ width: "100%", boxShadow: "none" }}>
            <CardMedia
              children={
                <img
                  src="https://placehold.it/100x100"
                  style={{ opacity: 0 }}
                />
              }
              style={{ width: "100%", height: "100px" }}
            />
            <CardContent>
              <div
                className="font-weight-bold text-uppercase"
                style={{ fontSize: "10pt", color: "white" }}
              >
                {"Family Common Name"}
              </div>
              <div
                className="font-weight-bold "
                style={{ fontSize: "16pt", color: "white" }}
              >
                {"Cover Crop Name"}
              </div>
              <small className="font-italic" style={{ color: "white" }}>
                {"Scientific Name"}
              </small>
              <div>
                <small className="text-muted">
                  <a
                    style={{
                      textDecoration: "underline",
                      color: "white",
                    }}
                    onClick={() => {}}
                  >
                    View Crop Details
                  </a>
                </small>
              </div>
            </CardContent>
            <hr style={{ borderTop: "1px solid rgba(0,0,0,0)" }} />
            <CardContent style={{ paddingRight: "0px", paddingLeft: "0px" }}>
              {filterKeys.map((keys, index) => (
                <div style={lightBorder} key={index}>
                  <span>
                    <DataTooltip data={"Info"} />
                  </span>
                  <span>
                    <Typography variant="body2">
                      {keys === "Cover Crop Group"
                        ? "COVER CROP TYPE"
                        : keys.toUpperCase()}
                    </Typography>
                  </span>
                </div>
              ))}
              <div style={lightBorder}>
                <span>
                  <DataTooltip data={"Info"} />
                </span>
                <span>
                  <Typography variant="body2">AVERAGE GOAL RATING</Typography>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        {props.selectedCrops.map((crop, index) => (
          <div className="col-xl-2 col-lg-4" key={index}>
            <Card style={{ width: "100%" }}>
              <CardMedia
                image={
                  crop.data["Image"]
                    ? crop.data["Image"][0].url
                    : "https://placehold.it/100x100"
                }
                // image="https://placehold.it/100x100"
                title={crop.cropName}
                style={{ width: "100%", height: "100px" }}
              />
              <CardContent>
                <div
                  className="font-weight-bold text-muted text-uppercase"
                  style={{ fontSize: "10pt" }}
                >
                  {crop.data["Family Common Name"]}
                </div>
                <div className="font-weight-bold " style={{ fontSize: "16pt" }}>
                  {crop.data["Cover Crop Name"]}
                </div>
                <small className="font-italic text-muted">
                  {crop.data["Scientific Name"]}
                </small>
                <div>
                  <small className="text-muted">
                    <a
                      style={{
                        textDecoration: "underline",
                        color: "rgb(53, 153, 155)",
                      }}
                      onClick={() => {}}
                    >
                      View Crop Details
                    </a>
                  </small>
                </div>
              </CardContent>
              <hr />
              <CardContent style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                {filterKeys.map((filterKey, index) => (
                  <RenderRelevantData
                    key={index}
                    filterKey={filterKey}
                    data={crop.data}
                    index={index}
                  />
                ))}
                {/* <div style={lightBG}>
                  {(parseInt(crop.data["Dry Matter Max (lbs/A/y)"]) +
                    parseInt(crop.data["Dry Matter Min (lbs/A/y)"])) /
                    2}{" "}
                  LBS/A/Y
                </div>
                <div style={lightBG}>
                  <RenderGrowthWindow window={crop.data["Growing Window"]} />
                </div>
                <div style={lightBG}>
                  <RenderCtoNRatioText
                    ratio={crop.data["C to N Ratio - 3 stars"]}
                  />
                </div>
                <div style={lightBG}>
                  {crop.data["Soil Moisture Use"].toUpperCase()}
                </div>
                <div style={lightBG}>
                  {crop.data["Flowering Trigger"]
                    ? crop.data["Flowering Trigger"].toString()
                    : "NO DATA"}
                </div>
                <div style={lightBG}>
                  <RenderSeedPriceIcons
                    val={crop.data["Seed Price per Pound"]}
                  />
                </div>
                <div style={lightBG}>
                  {getRating(crop.data["Ease of Establishment"])}
                </div>
                <div style={lightBG}>
                  {getRating(crop.data["Establishes Quickly"])}
                </div>
                <div style={lightBG}>
                  {getRating(crop.data["Early Spring Growth"])}
                </div> */}
                <div style={lightBG}>
                  <GetAverageGoalRating crop={crop} />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderGrowthWindow = ({ window }) => {
  const growingWindows = ["Very Short", "Short", "Medium", "Long", "Very Long"];
  const index = growingWindows.indexOf(window);

  switch (index) {
    case 0:
      return getRating(1);
    case 1:
      return getRating(2);
    case 2:
      return getRating(3);
    case 3:
      return getRating(4);
    case 4:
      return getRating(5);
    default:
      return getRating(0);
  }
};

const RenderRelevantData = ({ filterKey = "", data = [], index = 0 }) => {
  if (typeof data[filterKey] === "number") {
    if (data[filterKey].toString().length === 1) {
      if (filterKey === "Seed Price per Pound") {
        return (
          <div style={lightBG}>
            <RenderSeedPriceIcons val={data["Seed Price per Pound"]} />
          </div>
        );
      } else return <div style={lightBG}>{getRating(data[filterKey])}</div>;
    } else {
      return <div style={lightBG}>{data[filterKey]}</div>;
    }
  } else {
    if (filterKey === "Frost Seeding" || filterKey === "Aerial Seeding") {
      return (
        <div style={lightBG}>
          <RenderSeedingData data={data} filterKey={filterKey} />
        </div>
      );
    } else return <div style={lightBG}>{data[filterKey].toString()}</div>;
  }
};

const RenderSeedingData = ({ filterKey, data }) => {
  if (data[filterKey].toString() !== "-999") {
    return <div style={lightBG}>{data[filterKey]}</div>;
  } else {
    return <div style={lightBG}>N/A</div>;
  }
};
const GetAverageGoalRating = ({ crop }) => {
  const [state, dispatch] = useContext(Context);
  let goalRating = 0;
  if (state.selectedGoals.length > 0) {
    state.selectedGoals.map((goal) => {
      if (crop.data[goal]) {
        goalRating += crop.data[goal];
      }
    });
  }
  // console.log(goalRating);
  return getRating(goalRating / state.selectedGoals.length);
};

const RenderCtoNRatioText = ({ ratio }) => {
  switch (parseInt(ratio)) {
    case 1:
      return "LOW";
    case 2:
      return "MEDIUM";
    case 3:
      return "HIGH";
    default:
      return "NO DATA";
  }
};

export default MyCoverCropComparisonComponent;
