import React, { useContext } from "react";
import MapComponent from "./Map";
import { Context } from "../../store/Store";
// import AutoCompleteComponent from "./AutoComplete";
import SoilConditions from "./SoilConditions";
import WeatherConditions from "./WeatherConditions";
import { CustomStyles } from "../../shared/constants";
import MapContext from "./MapContext";
// import { TextField } from "@material-ui/core";

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
        style={{ textAlign: "left", height: "480px" }}
      >
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                {/* <MapComponent
                  width="100%"
                  height="100%"
                  minzoom={4}
                  maxzoom={20}
                  
                /> */}
                <MapContext
                  width="100%"
                  height="200px"
                  minzoom={4}
                  maxzoom={20}
                  from="confirmation"
                />
              </div>
              <div className="col-lg-6">
                <h1>Location Details</h1>
                <p>
                  Your cover crop recommendations will come from the Plant
                  Hardiness Zone {state.zone} NECCC dataset.
                </p>
                <p
                  className="pt-2 font-weight-bold"
                  style={{
                    color: CustomStyles().lighterGreen,
                  }}
                >
                  {state.address.length > 0
                    ? `${state.address.toString().substring(0, 35)}...`
                    : "Loading..."}
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12"></div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <p>
                  Disclaimer: Cover crop recommendations are based on expert
                  opinions. Your cover crop performance and seeding rates will
                  vary based on location, management, cultivars, and many other
                  variables. Consult an{" "}
                  <a
                    href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
                    title="click to consult an nrcs extension expert"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NRCS Extension Expert
                  </a>{" "}
                  for detailed guidance for detailed guidance. Cover crop
                  incentive programs may dictate seeding rate ranges and methods
                  and planting and termination dates. Consult your program
                  contact to ensure your plans complyent, cultivars, and many
                  other variables.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5 offset-xl-1 col-lg-12">
          <div className="container-fluid">
            {state.progress === 2 ? <SoilConditions /> : ""}
            {state.progress === 3 ? <WeatherConditions /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmation;
