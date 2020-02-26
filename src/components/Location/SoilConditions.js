import React from "react";
import TerrainIcon from "@material-ui/icons/Terrain";
import Slider from "@material-ui/core/Slider";

const SoilConditions = props => {
  const [caller, setCaller] = React.useState("");

  React.useEffect(() => {
    if (props.caller) {
      setCaller(props.caller);
    } else {
      setCaller("");
    }
  }, [props]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <h1>Soil Conditions?</h1>
      </div>
      <div className="col-lg-12 mt-2">
        <h6 className="font-weight-bold text-uppercase">
          <TerrainIcon /> SOILS COMPOSITION
        </h6>
        {caller == "greenbar" ? (
          <p className="col-lg-12">Loam (54%), Silt Loam (38%)</p>
        ) : (
          <p className="offset-lg-1 col-lg-6">Loam (54%), Silt Loam (38%)</p>
        )}
      </div>
      <div className="col-lg-12 mt-2">
        <h6 className="font-weight-bold text-uppercase">
          <TerrainIcon style={{ color: "transparent" }} />
          DRAINAGE CLASS
        </h6>

        {caller == "greenbar" ? (
          <div className="drainageSlider col-lg-12">
            <Slider
              defaultValue={50}
              // getAriaValueText={}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={25}
              marks
              min={0}
              max={100}
            />
            <p className="text-center text-uppercase">WELL DRAINED</p>
          </div>
        ) : (
          <div className="drainageSlider col-lg-6 offset-lg-1">
            <Slider
              defaultValue={50}
              // getAriaValueText={}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={25}
              marks
              min={0}
              max={100}
            />
            <p className="text-center text-uppercase">WELL DRAINED</p>
          </div>
        )}
      </div>
      <div className="col-lg-12 mt-2">
        <h6 className="font-weight-bold text-uppercase">
          <TerrainIcon style={{ color: "transparent" }} />
          FLOODING OR PONDING
        </h6>
        <div className="floodingSlider col-lg-6 offset-lg-1">
          <Slider
            defaultValue={0}
            // getAriaValueText={}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={8}
            marks
            min={10}
            max={110}
          />
          <p className="text-center text-uppercase">NONE</p>
        </div>
      </div>
    </div>
  );
};

export default SoilConditions;
