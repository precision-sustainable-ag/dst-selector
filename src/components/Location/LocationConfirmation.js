import React, { useContext } from "react";
import MapComponent from "./Map";
import { Context } from "../../store/Store";
import AutoCompleteComponent from "./AutoComplete";
import SoilConditions from "./SoilConditions";
import WeatherConditions from "./WeatherConditions";

const LocationConfirmation = () => {
  const [state, dispatch] = useContext(Context);
  return (
    <div
      className="container-fluid mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="row boxContainerRow" style={{ textAlign: "left" }}>
        <div className="col-lg-6">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <MapComponent
                  width="100%"
                  height="100%"
                  minzoom={4}
                  maxzoom={20}
                />
              </div>
              <div className="col-lg-6">
                <h1>Location Details</h1>
                <p>
                  Your cover crop recommendations will come from the Plant
                  Hardiness Zone {state.zone} NECCC dataset.
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <AutoCompleteComponent />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <p>
                  Disclaimer: Cover crop recommendations are based on expert
                  opinions. Your cover crop performance will vary based on
                  location, management, cultivars, and many other variables.
                  Consult an{" "}
                  <a href="/" title="click to consult an nrcs extension expert">
                    NRCS Extension Expert
                  </a>{" "}
                  for detailed guidance
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1">
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
