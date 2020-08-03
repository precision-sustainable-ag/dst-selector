import React, { useState, useEffect, Fragment, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import "../../styles/cropComparisonView.scss";
import {
  DataTooltip,
  getRating,
  RenderSeedPriceIcons,
} from "../../shared/constants";
import { MonetizationOn, Cancel } from "@material-ui/icons";
import { Context } from "../../store/Store";

import "../../styles/MyCoverCropComparisonComponent.scss";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-4">
          <div className="row pt-3">
            <div className="col-12">
              <Card style={{ width: "100%", boxShadow: "none" }}>
                <CardMedia
                  children={
                    <img
                      src="https://via.placeholder.com/10/FFFFFF/FFFFFF"
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
                <CardContent
                  style={{ paddingRight: "0px", paddingLeft: "0px" }}
                >
                  {filterKeys.map((keys, index) => (
                    <div style={lightBorder} key={index}>
                      <span>
                        <DataTooltip data={"Info"} />
                      </span>
                      <span>
                        <Typography variant="body2" className="text-capitalize">
                          {keys === "Cover Crop Group"
                            ? "Cover Crop Type"
                            : keys}
                        </Typography>
                      </span>
                    </div>
                  ))}
                  <div style={lightBorder}>
                    <span>
                      <DataTooltip data={"Info"} />
                    </span>
                    <span>
                      <Typography variant="body2">
                        Average Goal Rating
                      </Typography>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8 col-md-8 comparisonContainer">
          <div className="row pt-3">
            {props.selectedCrops.map((crop, index) => (
              <div className="col-xl-3 col-lg-5" key={index}>
                <Card className="mainComparisonCard" style={{ width: "100%" }}>
                  <span onClick={() => {}} className="cardCloseIcon">
                    <Cancel titleAccess="Remove Crop" />
                  </span>
                  <CardMedia
                    image={
                      crop.data["Image Data"]["Key Thumbnail"]
                        ? `/images/Cover Crop Photos/${crop.data["Image Data"]["Directory"]}/${crop.data["Image Data"]["Key Thumbnail"]}`
                        : "https://placehold.it/100x100?text=Placeholder"
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
                    <div
                      className="font-weight-bold "
                      style={{ fontSize: "16pt" }}
                    >
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
                  <CardContent
                    style={{
                      paddingRight: "0px",
                      paddingLeft: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    {filterKeys.map((filterKey, index) => (
                      <RenderRelevantData
                        key={index}
                        filterKey={filterKey}
                        data={crop.data}
                        index={index}
                      />
                    ))}
                    <div style={lightBG}>
                      <GetAverageGoalRating crop={crop} />
                    </div>
                  </CardContent>
                  <CardActionArea
                    style={{
                      backgroundColor: "#e3f2f4",
                      textAlign: "center",
                      padding: "0.5em",
                    }}
                    onClick={() => console.log("remove crop")}
                  >
                    <Typography
                      variant="body2"
                      className="text-uppercase"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      REMOVE
                    </Typography>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </div>
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
      return (
        <div style={lightBG}>
          <Typography variant="body2">{data[filterKey]}</Typography>
        </div>
      );
    }
  } else {
    if (filterKey === "Frost Seeding" || filterKey === "Aerial Seeding") {
      return (
        <div style={lightBG}>
          <RenderSeedingData data={data} filterKey={filterKey} />
        </div>
      );
    } else
      return (
        <div style={lightBG}>
          <Typography variant="body2">{data[filterKey].toString()}</Typography>
        </div>
      );
  }
};

const RenderSeedingData = ({ filterKey, data }) => {
  if (data[filterKey]) {
    return <Typography variant="body2">Yes</Typography>;
  } else {
    return <Typography variant="body2">N/A</Typography>;
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
