/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { CustomStyles } from "../../shared/constants";
import { Context } from "../../store/Store";
import MapContext from "./MapContext";
import SoilCondition from "./SoilCondition";
import WeatherConditions from "./WeatherConditions";
import "leaflet/dist/leaflet.css";

const LocationConfirmation = () => {
  const [state, dispatch] = useContext(Context);
  return (
    <div
      className="container-fluid mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="row boxContainerRow"
        style={{ textAlign: "left", minHeight: "520px" }}
      >
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <MapContext
                  width="100%"
                  height="200px"
                  minzoom={4}
                  maxzoom={20}
                  from="confirmation"
                />
              </div>
              <div className="col-lg-6">
                <div className="col-12">
                  <Typography variant="h4">Location Details</Typography>
                </div>
                <div className="col-12 pt-2">
                  <Typography variant="body1">
                    Your cover crop recommendations will come from the Plant
                    Hardiness Zone {state.zone} NECCC dataset.
                  </Typography>
                </div>
                <div className="col-12">
                  <Typography
                    variant="body1"
                    className="pt-2 font-weight-bold"
                    style={{
                      color: CustomStyles().lighterGreen,
                    }}
                  >
                    {state.address.length > 0
                      ? `${state.address.toString().substring(0, 35)}...`
                      : "Loading..."}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12"></div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <Typography variant="body1">
                  Disclaimer: Cover crop recommendations are based on expert
                  opinions. Your cover crop performance and seeding rates will
                  vary based on location, management, cultivars, and many other
                  variables. Consult your local{" "}
                  <a
                    href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
                    title="click to consult your local nrcs service center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NRCS Service Center
                  </a>
                  ,{" "}
                  <a
                    href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
                    title="Link to Cooperative Extension Service office"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cooperative Extension Service office
                  </a>
                  , or{" "}
                  <a
                    href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Conservation District
                  </a>{" "}
                  for detailed guidance. Cover crop incentive programs may
                  dictate seeding rate ranges and methods, and planting and
                  termination dates. Consult your program contact to ensure your
                  plans comply.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5 offset-xl-1 col-lg-12">
          <div className="container-fluid">
            {state.progress === 2 ? <SoilCondition /> : ""}
            {state.progress === 3 ? <WeatherConditions /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmation;
