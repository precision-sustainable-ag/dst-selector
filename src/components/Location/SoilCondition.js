/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import {
  Button,
  Chip,
  Switch,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  InvertColors,
  LocalDrinkOutlined,
  Terrain,
  WavesOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { ReferenceTooltip } from "../../shared/constants";
import { Context } from "../../store/Store";
import "../../styles/soilConditions.scss";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
const SoilCondition = (props) => {
  const [state, dispatch] = useContext(Context);
  const { soilData, soilDataOriginal, markers } = state;
  const [tilingCheck, setTilingCheck] = useState(false);

  useEffect(() => {
    // console.log("from soil file");
    let lat = markers[0][0];
    let lon = markers[0][1];

    if (soilDataOriginal.for) {
      if (
        soilDataOriginal.for.lat === lat &&
        soilDataOriginal.for.lon === lon
      ) {
        // console.log("soil data exists");
      } else {
        // console.log("markers changed");
        getSSURGOData(lat, lon);
      }
    } else {
      //   console.log("no previous data");
      getSSURGOData(lat, lon);
    }
  }, [markers]);

  const getSSURGOData = (lat, lon) => {
    let markersCopy = markers;
    // console.log("Inital: ", markers);

    let longLatString = "";

    markersCopy.map((val, i) => {
      // get long lat formatted as requested by SSURGO (long lat, long lat, ...)
      // saved as longLatString

      if (i === markersCopy.length - 1) {
        longLatString +=
          markersCopy[i][1] + " " + markersCopy[i][0] + "," + lon + " " + lat;
      } else {
        longLatString += markersCopy[i][1] + " " + markersCopy[i][0] + ",";
      }
    });
    let soilDataQuery = "";

    if (markersCopy.length > 1) {
      soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, mp.mupolygonkey as MPKEY
    FROM mapunit AS mu 
    INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
    INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
    WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
    AND
    mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
    } else {
      // point
      soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, mp.mupolygonkey as MPKEY
      FROM mapunit AS mu 
      INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
      INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
      WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))
      AND
      mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))`;
    }

    // console.log(soilDataQuery);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("query", soilDataQuery);
    urlencoded.append("format", "json+columnname");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    dispatch({
      type: "TOGGLE_SOIL_LOADER",
      data: {
        isSoilDataLoading: true,
      },
    });

    fetch(
      "https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // success
        // console.log("SSURGO: ", result);

        if (result !== {}) {
          //   let Map_Unit_Name = result["Table"][1][1];
          //   let Drainage_Class = result["Table"][1][2];
          // if(result["Table"][1] !)
          let Flooding_Frequency = result["Table"][1][3];
          let Ponding_Frequency = result["Table"][1][4];
          let mapUnitString = "";

          let stringSplit = [];

          result["Table"].map((el, index) => {
            if (index !== 0) {
              // if (index < result["Table"].length) {
              // mapUnitString += el[1].split(",") + ",";
              // } else {
              if (stringSplit.indexOf(el[1].split(",")[0]) === -1) {
                stringSplit.push(el[1].split(",")[0]);
              }
            }
            // }
          });

          // console.log(stringSplit);
          const filteredArr = stringSplit.filter((elm) => elm);
          mapUnitString = filteredArr.join(", ");

          let floodingClasses = [];
          result["Table"].map((el, index) => {
            if (index === 0 || el.indexOf("Water") === 1) {
            } else {
              if (floodingClasses.indexOf(el[3]) === -1) {
                floodingClasses.push(el[3]);
              }
            }
          });

          let drainageClasses = [];
          result["Table"].map((el, index) => {
            if (index !== 0) {
              if (drainageClasses.indexOf(el[2]) === -1) {
                drainageClasses.push(el[2]);
              }
            }
          });
          drainageClasses = drainageClasses.filter(function (el) {
            return el != null;
          });
          // console.log(drainageClasses);

          dispatch({
            type: "UPDATE_SOIL_DATA",
            data: {
              Map_Unit_Name: mapUnitString,
              Drainage_Class: drainageClasses,
              Flooding_Frequency: floodingClasses,
              Ponding_Frequency: Ponding_Frequency,
              for: { lat: lat, lon: lon },
            },
          });
          dispatch({
            type: "UPDATE_SOIL_DATA_ORIGINAL",
            data: {
              Map_Unit_Name: mapUnitString,
              Drainage_Class: drainageClasses,
              Flooding_Frequency: floodingClasses,
              Ponding_Frequency: Ponding_Frequency,
              for: { lat: lat, lon: lon },
            },
          });
        }

        dispatch({
          type: "TOGGLE_SOIL_LOADER",
          data: {
            isSoilDataLoading: false,
          },
        });
      })
      .catch((error) => console.error("SSURGO FETCH ERROR", error));
  };

  const updateDrainageClass = (label = "") => {
    let drainages = [...state.soilData.Drainage_Class];
    if (drainages.indexOf(label) === -1) {
      // does not exist, dispatch to state
      drainages.push(label);
      dispatch({
        type: "UPDATE_DRAINAGE_CLASS",
        data: drainages,
      });
    } else {
      // exists, remove it from state
      let index = drainages.indexOf(label);
      drainages.splice(index, 1);

      dispatch({
        type: "UPDATE_DRAINAGE_CLASS",
        data: drainages,
      });
    }
  };

  const updateFloodingFrequency = (label = "") => {
    let floodings = [...state.soilData.Flooding_Frequency];
    if (floodings.indexOf(label) === -1) {
      // does not exist, dispatch to state
      floodings.push(label);
      dispatch({
        type: "UPDATE_FLOODING_FREQUENCY",
        data: floodings,
      });
    } else {
      // exists, remove it from state
      let index = floodings.indexOf(label);
      floodings.splice(index, 1);

      dispatch({
        type: "UPDATE_FLOODING_FREQUENCY",
        data: floodings,
      });
    }
  };

  const resetFloodingOptions = () => {
    dispatch({
      type: "UPDATE_FLOODING_FREQUENCY",
      data: soilDataOriginal.Flooding_Frequency,
    });
  };

  const resetDrainageClasses = () => {
    dispatch({
      type: "UPDATE_DRAINAGE_CLASS",
      data: soilDataOriginal.Drainage_Class,
    });
    window.localStorage.setItem(
      "drainage",
      JSON.stringify(soilDataOriginal.Drainage_Class)
    );
    setTilingCheck(false);
  };
  const RenderFloodingOptions = ({ flooding = [""] }) => {
    return (
      <div className="text-left">
        <Chip
          label="None"
          color={flooding.includes("None") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("None");
          }}
        />
        <Chip
          label="Very Rare"
          color={flooding.includes("Very rare") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("Very rare");
          }}
        />
        <Chip
          label="Rare"
          color={flooding.includes("Rare") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("Rare");
          }}
        />
        <Chip
          label="Occasional"
          color={flooding.includes("Occasional") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("Occasional");
          }}
        />
        <Chip
          label="Frequent"
          color={flooding.includes("Frequent") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("Frequent");
          }}
        />
        <Chip
          label="Very Frequent"
          color={flooding.includes("Very frequent") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateFloodingFrequency("Very frequent");
          }}
        />
      </div>
    );
  };
  const RenderDrainageClasses = ({ drainage = [""] }) => {
    return (
      <div className="text-left">
        <Chip
          label="Very Poorly Drained"
          color={
            drainage.includes("Very poorly drained") ? "primary" : "secondary"
          }
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Very poorly drained");
          }}
        />
        <Chip
          label="Poorly Drained"
          color={drainage.includes("Poorly drained") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Poorly drained");
          }}
        />
        <Chip
          label="Somewhat Poorly Drained"
          color={
            drainage.includes("Somewhat poorly drained")
              ? "primary"
              : "secondary"
          }
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Somewhat poorly drained");
          }}
        />
        <Chip
          label="Moderately Well Drained"
          color={
            drainage.includes("Moderately well drained")
              ? "primary"
              : "secondary"
          }
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Moderately well drained");
          }}
        />
        <Chip
          label="Well Drained"
          color={drainage.includes("Well drained") ? "primary" : "secondary"}
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Well drained");
          }}
        />
        <Chip
          label="Somewhat Excessively Drained"
          color={
            drainage.includes("Somewhat excessively drained")
              ? "primary"
              : "secondary"
          }
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Somewhat excessively drained");
          }}
        />
        <Chip
          label="Excessively Drained"
          color={
            drainage.includes("Excessively drained") ? "primary" : "secondary"
          }
          className="m-2 drainageTag"
          onClick={() => {
            updateDrainageClass("Excessively drained");
          }}
        />
      </div>
    );
  };

  const [showTiling, setShowTiling] = useState(false);
  useEffect(() => {
    const checkArray = [
      "Very poorly drained",
      "Poorly drained",
      "Somewhat poorly drained",
    ];
    if (checkArray.some((e) => soilData.Drainage_Class.includes(e))) {
      setShowTiling(true);

      // setTilingCheck(false);
    }
    window.localStorage.setItem(
      "drainage",
      JSON.stringify(soilData.Drainage_Class)
    );
  }, [soilData.Drainage_Class]);
  return (
    <div className="row">
      <div className="col-12">
        <Typography variant="h4" align="left">
          Soil Conditions?
        </Typography>
      </div>
      <div className="col-12 pt-2 row">
        <div className="col-12">
          <Typography variant="body1" className="soilConditionSubHeader">
            <Terrain />
            &nbsp;SOILS COMPOSITION &nbsp;
            <ReferenceTooltip
              type="text"
              hasLink
              title={
                <div>
                  <Typography variant="body1">
                    {" "}
                    The tool auto-completes your soil composition based on
                    location and the{" "}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                    >
                      USDA NRCS Web Soil Survey
                    </a>
                    .
                  </Typography>
                </div>
              }
            />
          </Typography>
        </div>
        <div className="col-12 pt-2 row">
          <div className="col-12">
            <Typography
              variant="body1"
              className="font-weight-bold"
              style={{ color: "rgb(89, 132, 69)" }}
              align="left"
            >
              {soilData.Map_Unit_Name}
            </Typography>
          </div>
        </div>
      </div>

      <div className="col-12 pt-2 mt-2 row">
        <div className="col-12">
          <Typography variant="body1" className="soilConditionSubHeader">
            <LocalDrinkOutlined />
            &nbsp;DRAINAGE CLASS &nbsp;
            <ReferenceTooltip
              type="text"
              hasLink
              title={
                <div>
                  <Typography variant="body1">
                    {" "}
                    Indicates your soil drainage based on the{" "}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                    >
                      USDA NRCS Web Soil Survey
                    </a>{" "}
                    drainage classes; you may modify your soil drainage by
                    clicking below.{" "}
                    <a
                      href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/soils/ref/?cid=nrcs142p2_054253"
                      target="_blank"
                    >
                      {" "}
                      Definitions of values found here
                    </a>
                    .
                  </Typography>
                </div>
              }
            />
          </Typography>
        </div>
        {arrayEquals(
          soilDataOriginal.Drainage_Class,
          soilData.Drainage_Class
        ) ? (
          ""
        ) : (
          <div className="col-12 pt-2">
            <div className="col-12 row">
              <div className="col text-left">
                <Button
                  size="small"
                  onClick={() => {
                    resetDrainageClasses();
                  }}
                >
                  <Typography
                    className="text-danger text-uppercase font-weight-bold"
                    variant="button"
                  >
                    Values changed, reset?
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="col-12">
          <RenderDrainageClasses drainage={soilData.Drainage_Class} />
        </div>
      </div>

      {showTiling ? (
        <div className="col-12 pt-2 mt-2 row">
          <div className="col-12">
            <Typography variant="body1" className="soilConditionSubHeader">
              <InvertColors />
              &nbsp;TILING &nbsp;
              <ReferenceTooltip
                type="text"
                content={
                  "Indicate if the field of interest has tile installed. If you have selected very poorly to somewhat poorly drained soils, selecting “yes” will increase your drainage class by one factor."
                }
              />
            </Typography>
          </div>
          <div className="col-12 pt-2">
            <div className="pl-1 text-left">
              <Typography variant="body1" display="inline">
                NO
              </Typography>
              <Switch
                checked={tilingCheck}
                onChange={(e) => {
                  let soilDrainCopy = soilData.Drainage_Class;

                  let drainSet = new Set(soilDrainCopy);
                  // console.log(e.target.checked);
                  if (e.target.checked) {
                    // if(drainSet.has('Very poorly drained')) {
                    //   drainSet.delete('Very poorly drained');
                    //   drainSet.add('Poorly drained');
                    // }
                    // if(drainSet.has(''))
                    if (
                      drainSet.has("Very poorly drained") &&
                      drainSet.has("Poorly drained") &&
                      drainSet.has("Somewhat poorly drained")
                    ) {
                      drainSet.delete("Very poorly drained");
                      drainSet.add("Moderately well drained");
                    } else {
                      if (
                        drainSet.has("Very poorly drained") &&
                        drainSet.has("Poorly drained")
                      ) {
                        drainSet.delete("Very poorly drained");
                        drainSet.add("Somewhat poorly drained");
                      } else if (
                        drainSet.has("Poorly drained") &&
                        drainSet.has("Somewhat poorly drained")
                      ) {
                        drainSet.delete("Poorly drained");
                        drainSet.add("Moderately well drained");
                      } else if (
                        drainSet.has("Very poorly drained") &&
                        drainSet.has("Somewhat poorly drained")
                      ) {
                        drainSet.delete("Very poorly drained");
                        drainSet.delete("Somewhat poorly drained");
                        drainSet.add("Poorly drained");
                        drainSet.add("Moderately well drained");
                      } else if (drainSet.has("Very poorly drained")) {
                        drainSet.delete("Very poorly drained");
                        drainSet.add("Poorly drained");
                      } else if (drainSet.has("Poorly drained")) {
                        drainSet.delete("Poorly drained");
                        drainSet.add("Somewhat poorly drained");
                      } else if (drainSet.has("Somewhat poorly drained")) {
                        drainSet.delete("Somewhat poorly drained");
                        drainSet.add("Moderately well drained");
                      } else {
                        drainSet.delete("Very poorly drained");
                        drainSet.delete("Poorly drained");
                        drainSet.delete("Somewhat poorly drained");
                        drainSet.add("Moderately well drained");
                      }
                    }
                    // console.log(drainSet);
                    // dispatch({
                    //   type: "UPDATE_DRAINAGE_CLASS",
                    //   data: [...drainSet],
                    // });
                    window.localStorage.setItem(
                      "drainage",
                      JSON.stringify([...drainSet])
                    );
                  } else {
                    // dispatch({
                    //   type: "UPDATE_DRAINAGE_CLASS",
                    //   data: soilDataOriginal.Drainage_Class,
                    // });
                    window.localStorage.setItem(
                      "drainage",
                      JSON.stringify(soilDataOriginal.Drainage_Class)
                    );
                  }

                  setTilingCheck(!tilingCheck);
                }}
                name="checkedC"
              />
              <Typography variant="body1" display="inline">
                YES
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="col-12 pt-2 mt-2 row">
        <div className="col-12">
          <Typography variant="body1" className="soilConditionSubHeader">
            <WavesOutlined />
            &nbsp;FLOODING FREQUENCY &nbsp;
            <ReferenceTooltip
              type="text"
              hasLink
              title={
                <div>
                  <Typography variant="body1">
                    The annual probability of a flood event based on the{" "}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                    >
                      USDA NRCS Web Soil Survey
                    </a>
                    , where “flood” refers to the temporary inundation of an
                    area caused by overflowing streams, by runoff from adjacent
                    slopes, or by tides. You may modify your flooding frequency
                    by clicking below.{" "}
                    <a
                      href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/soils/ref/?cid=nrcs142p2_054253"
                      target="_blank"
                    >
                      {" "}
                      Definitions of values found here
                    </a>
                    .
                  </Typography>
                </div>
              }
            />
          </Typography>
        </div>

        {arrayEquals(
          soilData.Flooding_Frequency,
          soilDataOriginal.Flooding_Frequency
        ) ? (
          ""
        ) : (
          <div className="col-12 pt-2">
            <div className="col-12 row">
              <div className="col text-left">
                <Button
                  size="small"
                  onClick={() => {
                    resetFloodingOptions();
                  }}
                >
                  <Typography
                    className="text-danger text-uppercase font-weight-bold"
                    variant="button"
                  >
                    Values changed, reset?
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="col-12">
          <RenderFloodingOptions flooding={soilData.Flooding_Frequency} />
        </div>
      </div>
    </div>
  );
};

export default SoilCondition;

const arrayEquals = (a = [], b = []) => {
  a.sort();
  b.sort();
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};
