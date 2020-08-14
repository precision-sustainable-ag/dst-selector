import React, { Fragment } from "react";
import TerrainIcon from "@material-ui/icons/Terrain";
import Slider from "@material-ui/core/Slider";
import { Context } from "../../store/Store";
import { Typography } from "@material-ui/core";
import { Waves, LocalDrink } from "@material-ui/icons";
import { ReferenceTooltip } from "../../shared/constants";

const SoilConditions = (props) => {
  const [state, dispatch] = React.useContext(Context);
  const [drainageChange, setDrainageChange] = React.useState(false);
  const [floodingChange, setFloodingChange] = React.useState(false);
  const [caller, setCaller] = React.useState("");
  const [defaultDrainageMark, setDefaultDrainageMark] = React.useState([
    50,
    100,
  ]);
  const [defaultFloodingMark, setDefaultFloodingMark] = React.useState([
    50,
    100,
  ]);
  const [drainageValueCopy, setDrainageValueCopy] = React.useState({
    initial: 0,
    final: 0,
  });
  const [floodingValueCopy, setfloodingValueCopy] = React.useState({
    initial: 0,
    final: 0,
  });
  const [drainageMarkText, setDrainageMarkText] = React.useState(``);

  const getDrainageText = () => {
    console.log("rendering...");
    let startObj = drainageDictionary.find(
      (obj) => obj.value === defaultDrainageMark[0]
    );
    // console.log("startObj", startObj);
    let endObj = drainageDictionary.find(
      (obj) => obj.value === defaultDrainageMark[defaultDrainageMark.length - 1]
    );
    // console.log("DraingageText::StartObj", startObj);
    // console.log(
    //   "DraingageText::defaultDrainageMark[0]",
    //   defaultDrainageMark[0]
    // );
    // console.log(startObj, endObj);
    setDrainageMarkText(`Between ${startObj.label} and ${endObj.label}`);
    // setDrainageMarkText("hello");
  };

  const [drainageDictionary, setDrainageDictionary] = React.useState([
    {
      value: 12.5,
      label: "Well drained muck",
    },
    {
      value: 25,
      label: "Saturated muck",
    },
    {
      value: 37.5,
      label: "Excessively drained",
    },
    {
      value: 50,
      label: "Well drained",
    },
    {
      value: 62.5,
      label: "Moderately well drained",
    },
    {
      value: 75,
      label: "Somewhat poorly drained",
    },
    {
      value: 87.5,
      label: "Poorly drained",
    },
    {
      value: 100,
      label: "Very poorly drained",
    },
  ]);

  const [drainageMarks, setDrainageMarks] = React.useState([
    {
      value: 12.5,
      // label: "Very poorly drained"
    },
    {
      value: 25,
      // label: "Poorly drained"
    },
    {
      value: 37.5,
      // label: "Somewhat poorly drained"
    },
    {
      value: 50,
      // label: "Moderately well drained"
    },
    {
      value: 62.5,
      // label: "Well drained"
    },
    {
      value: 75,
      // label: "Excessively drained"
    },
    {
      value: 87.5,
      // label: "Saturated muck"
    },
    {
      value: 100,
      // label: "Well drained muck"
    },
  ]);

  React.useEffect(() => {
    if (props.caller) {
      setCaller(props.caller);
    } else {
      setCaller("");
    }

    if (!drainageChange) {
      if (state.soilData.Drainage_Class.length > 0) {
        console.log(
          "state.soilData.Drainage_Class[0]",
          state.soilData.Drainage_Class[0]
        );
        // getDrainageText();
        setDefaultDrainageMark([
          drainageDictionary.find(
            (obj) => obj.label === state.soilData.Drainage_Class[0]
          ).value,
          drainageDictionary.find(
            (obj) =>
              obj.label ===
              state.soilData.Drainage_Class[
                state.soilData.Drainage_Class.length - 1
              ]
          ).value,
        ]);
        setDrainageValueCopy({
          initial: drainageDictionary.find(
            (obj) => obj.label === state.soilData.Drainage_Class[0]
          ).value,
          final: drainageDictionary.find(
            (obj) =>
              obj.label ===
              state.soilData.Drainage_Class[
                state.soilData.Drainage_Class.length - 1
              ]
          ).value,
        });
        // if (drainageChange) {
        getDrainageText();
        // }
      }
    } else {
      getDrainageText();
    }

    return () => {
      setDrainageChange(false);
      getDrainageText();
    };
  }, [props, drainageChange]);

  const floodingMarks = [
    {
      value: 0,
      label: "Good",
    },
    {
      value: 50,
      label: "Moderate",
    },
    {
      value: 100,
      label: "Poor",
    },
  ];

  return state.markers.length > 1 ? (
    <div className="row">
      <div className="col-lg-12">
        <h1>Soil Conditions?</h1>
      </div>
      <div className="col-lg-12 mt-2">
        <h6 className="font-weight-bold text-uppercase text-left">
          <TerrainIcon /> &nbsp;&nbsp;SOILS COMPOSITION &nbsp;{" "}
          <ReferenceTooltip source={"SSURGO"} url={"#"} />
        </h6>
        {caller === "greenbar" ? (
          <p className="col-lg-12 text-left">
            {state.isSoilDataLoading
              ? "Loading.."
              : state.soilData.Map_Unit_Name}
          </p>
        ) : (
          <p className="offset-lg-1 col-lg-12">
            {state.isSoilDataLoading
              ? "Loading.."
              : state.soilData.Map_Unit_Name}
          </p>
        )}
      </div>
      <div className="col-lg-12 mt-2 row">
        <h6 className="font-weight-bold text-uppercase text-left col-lg-12 pr-0">
          <LocalDrink /> &nbsp;&nbsp;DRAINAGE CLASS &nbsp;
          <ReferenceTooltip source={"SSURGO"} url={"#"} />
        </h6>
        <div className="col-lg-12">
          {drainageChange ? (
            defaultDrainageMark[0] !== drainageValueCopy.initial ||
            defaultDrainageMark[1] !== drainageValueCopy.final ? (
              <Fragment>
                <LocalDrink style={{ color: "transparent" }} /> &nbsp;&nbsp;
                <Typography
                  variant="button"
                  className="font-weight-bold text-danger text-uppercase text-left"
                  onClick={() => {
                    setDefaultDrainageMark([
                      drainageValueCopy.initial,
                      drainageValueCopy.final,
                    ]);
                    setDrainageChange(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Values changed, Reset ?
                </Typography>
              </Fragment>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {caller === "greenbar" ? (
          //    <Slider
          //    value={value}
          //    onChange={handleChange}
          //    valueLabelDisplay="auto"
          //    aria-labelledby="range-slider"
          //    getAriaValueText={valuetext}
          //  />
          <div className="drainageSlider col-lg-12">
            <Slider
              color="secondary"
              valueLabelDisplay={"off"}
              onChangeCommitted={(e, mark) => {
                // console.log(mark);

                setDrainageChange(true);
                setDefaultDrainageMark(mark);
              }}
              aria-labelledby="drainange-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultDrainageMark}
              marks={drainageMarks}
              min={drainageMarks[0].value}
              max={drainageMarks[7].value}
              step={null}
            />
            <span>{drainageMarkText}</span>
            {/* <Slider
              defaultValue={50}
              // getAriaValueText={}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={25}
              marks
              min={0}
              max={100}
            /> */}
            {/* <p className="text-center text-uppercase">WELL DRAINED</p> */}
          </div>
        ) : (
          <div className="drainageSlider col-lg-11 offset-lg-1">
            <Slider
              color="secondary"
              valueLabelDisplay="off"
              onChangeCommitted={(e, mark) => {
                // console.log(mark);

                setDrainageChange(true);
                setDefaultDrainageMark(mark);
              }}
              aria-labelledby="drainange-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultDrainageMark}
              marks={drainageMarks}
              min={drainageMarks[0].value}
              max={drainageMarks[drainageMarks.length - 1].value}
              step={null}
            />
            <span>{drainageMarkText}</span>
          </div>
        )}
      </div>
      <div className="col-lg-12 mt-2 row">
        <h6 className="font-weight-bold text-uppercase text-left col-lg-4 pr-0">
          <Waves /> &nbsp;&nbsp;FLOODING &nbsp;{" "}
          <ReferenceTooltip source={"SSURGO"} url={"#"} />
        </h6>
        <div className="col-lg-12">
          {floodingChange ? (
            defaultFloodingMark[0] !== floodingValueCopy.initial ||
            defaultFloodingMark[1] !== floodingValueCopy.final ? (
              <Fragment>
                <LocalDrink style={{ color: "transparent" }} /> &nbsp;&nbsp;
                <Typography
                  variant="button"
                  className="font-weight-bold text-danger text-uppercase text-left"
                  onClick={() => {
                    // setDefaultFloodingMark([
                    //   floodingValueCopy.initial,
                    //   floodingValueCopy.final
                    // ]);
                    // TODO: get this data from state
                    setDefaultFloodingMark([50, 100]);

                    setFloodingChange(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Values changed, Reset ?
                </Typography>
              </Fragment>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {caller === "greenbar" ? (
          <div className="floodingSlider col-lg-12">
            {/*TODO: invert doesnt work */}
            <Slider
              color="secondary"
              valueLabelDisplay="off"
              onChangeCommitted={(e, mark) => {
                console.log(mark);
                setFloodingChange(true);
                setDefaultFloodingMark(mark);
              }}
              aria-labelledby="flooding-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={[1, 2]}
              marks={floodingMarks}
              // min={drainageMarks[0].value}
              // max={drainageMarks[7].value}
              step={null}
              min={0}
              max={2}
            />
            {/* <p className="text-center text-uppercase">NONE</p> */}
          </div>
        ) : (
          <div className="floodingSlider col-lg-11 offset-lg-1">
            <Slider
              color="secondary"
              valueLabelDisplay="off"
              onChangeCommitted={(e, mark) => {
                console.log(mark);
                setFloodingChange(true);
                setDefaultFloodingMark(mark);
              }}
              aria-labelledby="flooding-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultFloodingMark}
              marks={floodingMarks}
              // min={drainageMarks[0].value}
              // max={drainageMarks[7].value}
              step={50}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-lg-12">
        <h1>Soil Conditions?</h1>
      </div>
      <div className="col-lg-12 mt-2">
        <h6 className="font-weight-bold text-uppercase text-left">
          <TerrainIcon /> &nbsp;&nbsp;SOILS COMPOSITION
        </h6>
        {caller === "greenbar" ? (
          <p className="col-lg-12 text-left">
            Please specify your Soil Conditions. For pre-populated soil
            conditions, go back to the location screen to click a point or draw
            a polygon on the map, or specify a full address.
          </p>
        ) : (
          <p className="offset-lg-1 col-lg-12">
            Please specify your Soil Conditions. For pre-populated soil
            conditions, go back to the location screen to click a point or draw
            a polygon on the map, or specify a full address.
          </p>
        )}
      </div>
      <div className="col-lg-12 mt-2 row">
        <h6 className="font-weight-bold text-uppercase text-left col-lg-4 pr-0">
          <LocalDrink /> &nbsp;&nbsp;DRAINAGE CLASS
        </h6>
        <div className="col-lg-12">
          {drainageChange ? (
            defaultDrainageMark[0] !== drainageValueCopy.initial ||
            defaultDrainageMark[1] !== drainageValueCopy.final ? (
              <Fragment>
                <LocalDrink style={{ color: "transparent" }} /> &nbsp;&nbsp;
                <Typography
                  variant="button"
                  className="font-weight-bold text-danger text-uppercase text-left"
                  onClick={() => {
                    setDefaultDrainageMark([
                      drainageValueCopy.initial,
                      drainageValueCopy.final,
                    ]);
                    setDrainageChange(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Values changed, Reset ?
                </Typography>
              </Fragment>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {caller === "greenbar" ? (
          <div className="drainageSlider col-lg-12">
            <Slider
              color="secondary"
              valueLabelDisplay="auto"
              onChangeCommitted={(e, mark) => {
                // console.log(mark);

                setDrainageChange(true);
                setDefaultDrainageMark(mark);
              }}
              aria-labelledby="drainange-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultDrainageMark}
              marks={drainageMarks}
              min={drainageMarks[0].value}
              max={drainageMarks[7].value}
              step={null}
            />
            <span>{drainageMarkText}</span>
          </div>
        ) : (
          <div className="drainageSlider col-lg-11 offset-lg-1">
            <Slider
              color="secondary"
              valueLabelDisplay="auto"
              onChangeCommitted={(e, mark) => {
                console.log(mark);

                setDrainageChange(true);
                setDefaultDrainageMark(mark);
                getDrainageText();
              }}
              aria-labelledby="drainange-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultDrainageMark}
              marks={drainageMarks}
              min={drainageMarks[0].value}
              max={drainageMarks[7].value}
              step={null}
            />
            <span>{drainageMarkText}</span>
          </div>
        )}
      </div>
      <div className="col-lg-12 mt-2 row">
        <h6 className="font-weight-bold text-uppercase text-left col-lg-4 pr-0">
          <Waves /> &nbsp;&nbsp;FLOODING
        </h6>
        <div className="col-lg-12">
          {floodingChange ? (
            defaultFloodingMark[0] !== floodingValueCopy.initial ||
            defaultFloodingMark[1] !== floodingValueCopy.final ? (
              <Fragment>
                <LocalDrink style={{ color: "transparent" }} /> &nbsp;&nbsp;
                <Typography
                  variant="button"
                  className="font-weight-bold text-danger text-uppercase text-left"
                  onClick={() => {
                    // setDefaultFloodingMark([
                    //   floodingValueCopy.initial,
                    //   floodingValueCopy.final
                    // ]);
                    // TODO: get this data from state
                    setDefaultFloodingMark([50, 100]);

                    setFloodingChange(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Values changed, Reset ?
                </Typography>
              </Fragment>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {caller === "greenbar" ? (
          <div className="floodingSlider col-lg-12">
            {/*TODO: invert doesnt work */}
            <Slider
              color="secondary"
              valueLabelDisplay="auto"
              onChangeCommitted={(e, mark) => {
                console.log(mark);
                setFloodingChange(true);
                setDefaultFloodingMark(mark);
              }}
              aria-labelledby="flooding-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={[1, 2]}
              marks={floodingMarks}
              // min={drainageMarks[0].value}
              // max={drainageMarks[7].value}
              step={null}
              min={0}
              max={2}
            />
            {/* <p className="text-center text-uppercase">NONE</p> */}
          </div>
        ) : (
          <div className="floodingSlider col-lg-11 offset-lg-1">
            <Slider
              color="secondary"
              valueLabelDisplay="auto"
              onChangeCommitted={(e, mark) => {
                console.log(mark);
                setFloodingChange(true);
                setDefaultFloodingMark(mark);
              }}
              aria-labelledby="flooding-slider"
              // getAriaValueText={state.soilData.Drainage_Class[0]}
              value={defaultFloodingMark}
              marks={floodingMarks}
              // min={drainageMarks[0].value}
              // max={drainageMarks[7].value}
              step={50}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilConditions;
