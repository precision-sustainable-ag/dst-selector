import React from "react";
import { cloudIcon } from "../../shared/constants";
import Slider from "@material-ui/core/Slider";
import { Cloud, Info } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const WeatherConditions = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <h1>Weather Conditions?</h1>
      </div>
      <div className="col-lg-9 mt-2">
        <h6 className="font-weight-bold text-uppercase">
          <Cloud /> HISTORICAL WEATHER
        </h6>
        <div className="offset-lg-1 col-lg-11">
          Average Frost Dates
          <div className="offset-lg-1">
            First Frost Date: <b>Oct 13</b>
          </div>
          <div className="offset-lg-1">
            {" "}
            Last Frost Date: <b>May 2</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Average Precipitation
          <div className="offset-lg-1">
            NOVEMBER: <b>3.6 inches</b>
          </div>
          <div className="offset-lg-1">
            Annual: <b>43 inches</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Frost Free Days: <b>173</b>
          <div className="text-right font-size-small">
            (source: SSURGO <Info className="font-size-small" /> )
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <Button>CLICK TO EDIT</Button>
      </div>
    </div>
  );
};

export default WeatherConditions;
