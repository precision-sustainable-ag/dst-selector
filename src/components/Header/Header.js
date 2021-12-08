/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { Badge, Button, Typography } from "@material-ui/core";
import Axios from "axios";
import {
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
} from "mdbreact";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { abbrRegion, weatherApiURL } from "../../shared/constants";
import zone4DataDictionary from "../../shared/json/zone4/data-dictionary.json";
import zone5DataDictionary from "../../shared/json/zone5/data-dictionary.json";
import zone6DataDictionary from "../../shared/json/zone6/data-dictionary.json";
import zone7DataDictionary from "../../shared/json/zone7/data-dictionary.json";
import { Context } from "../../store/Store";
import "../../styles/header.scss";
import DateComponent from "./DateComponent";
import ForecastComponent from "./ForecastComponent";
import Greenbar from "./Greenbar/Greenbar";

const Header = () => {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [collapse, setCollapse] = React.useState(false);
  const [isRoot, setIsRoot] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let isActive = {};

  const getUSDAZone = async (zip) => {
    return await fetch(`//covercrop.tools/zone.php?zip=` + zip);
  };

  useEffect(() => {
    if (state.zipCode !== 0) {
      getUSDAZone(state.zipCode)
        .then((response) => {
          if (response.ok) {
            let data = response.json();
            data.then((data) => {
              let zipCode = data.zip;
              let zone = data.zone;

              if (state.zipCode === parseInt(zipCode)) {
                if (zone <= 7 && zone >= 4) {
                  dispatch({
                    type: "UPDATE_ZONE",
                    data: {
                      zoneText: `Zone ${zone}`,
                      zone: parseInt(zone),
                    },
                  });
                } else {
                  enqueueSnackbar(
                    "Error: Zones 8-11 do not occur in the Northeast US and so are not supported by this tool. If you wish to explore the data, we suggest loading Zone 7.",
                    {
                      persist: true,
                      action: (
                        <Button
                          style={{ color: "white" }}
                          onClick={() => {
                            closeSnackbar();
                          }}
                        >
                          Close
                        </Button>
                      ),
                    }
                  );
                }
              }
            });
          } else {
            console.error(response);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [state.zipCode, state.fullAddress]);

  const getAverageFrostDates = async (url) => {
    await Axios.get(url).then((resp) => {
      try {
        let totalYears = resp.data.length;
        // get last years value
        // TODO: Take all years data into account
        let mostRecentYearData = resp.data[totalYears - 1];

        let maxDate = mostRecentYearData["max(date)"];
        let minDate = mostRecentYearData["min(date)"];

        let averageFrostObject = {
          firstFrostDate: {
            month: moment(minDate).format("MMMM"),
            day: parseInt(moment(minDate).format("D")),
          },
          lastFrostDate: {
            month: moment(maxDate).format("MMMM"),
            day: parseInt(moment(maxDate).format("D")),
          },
        };
        dispatch({
          type: "UPDATE_AVERAGE_FROST_DATES",
          data: {
            averageFrost: averageFrostObject,
          },
        });
      } catch (e) {
        console.error("Average Frost Dates API::", e);
      }
    });
  };

  useEffect(() => {
    let { markers } = state;

    // update address on marker change
    // ref forecastComponent

    let lat = markers[0][0];
    let lon = markers[0][1];

    // since this updates with state; ideally, weather and soil info should be updated here

    // get current lat long and get county, state and city

    if (state.progress >= 2 && state.markers.length > 0) {
      let revAPIURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

      Axios.get(revAPIURL)
        .then(async (resp) => {
          let city = resp.data.locality.toLowerCase();
          let zip = resp.data.postcode;
          let state = abbrRegion(
            resp.data.principalSubdivision,
            "abbr"
          ).toLowerCase();

          if (resp.data.postcode) {
            dispatch({
              type: "UPDATE_ZIP_CODE",
              data: {
                zipCode: parseInt(zip),
              },
            });
          }

          // call weather API to fetch details

          // Get: Frost Free Days
          // Dynamic Dates not set!
          let frostFreeDaysURL = `${weatherApiURL}/hourly?location=${city}%20${state}&start=2015-01-01&end=2019-12-31&stats=count(date)/24/5&where=air_temperature%3e0&output=json`;
          let frostFreeDatesURL = `${weatherApiURL}/hourly?lat=${lat}&lon=${lon}&start=2014-07-01&end=2019-07-01&stats=min(date),max(date)&where=frost&group=growingyear&options=nomrms&output=json`;
          let frostFreeDays = 0;

          await Axios.get(frostFreeDaysURL)
            .then((resp) => {
              getAverageFrostDates(frostFreeDatesURL);
              let frostFreeDaysObject = resp.data[0];
              for (var key in frostFreeDaysObject) {
                if (frostFreeDaysObject.hasOwnProperty(key)) {
                  frostFreeDays = frostFreeDaysObject[key];
                }
              }
              return { frostFreeDays: frostFreeDays, city: city, state: state };
            })
            .then((obj) => {
              dispatch({
                type: "UPDATE_FROST_FREE_DAYS",
                data: { frostFreeDays: obj.frostFreeDays },
              });

              return obj;
            })
            .then(async (obj) => {
              let currentMonthInt = moment().month() + 1;

              // What was the 5-year average rainfall for city st during the month of currentMonthInt?
              //  Dynamic dates ?
              let averageRainForAMonthURL = `${weatherApiURL}/hourly?location=${obj.city}%20${obj.state}&start=2015-01-01&end=2019-12-31&stats=sum(precipitation)/5&where=month=${currentMonthInt}&output=json`;
              // What was the 5-year average annual rainfall for city st?
              let fiveYearAvgRainURL = `${weatherApiURL}/hourly?location=${obj.city}%20${obj.state}&start=2015-01-01&end=2019-12-31&stats=sum(precipitation)/5&output=json`;
              if (!state.ajaxInProgress) {
                dispatch({
                  type: "SET_AJAX_IN_PROGRESS",
                  data: true,
                });
                await Axios.get(averageRainForAMonthURL)
                  .then((resp) => {
                    let averagePrecipitationForCurrentMonth =
                      resp.data[0]["sum(precipitation)/5"];
                    averagePrecipitationForCurrentMonth = parseFloat(
                      averagePrecipitationForCurrentMonth
                    ).toFixed(2);
                    averagePrecipitationForCurrentMonth = parseFloat(
                      averagePrecipitationForCurrentMonth * 0.03937
                    ).toFixed(2);
                    dispatch({
                      type: "UPDATE_AVERAGE_PRECIP_CURRENT_MONTH",
                      data: { thisMonth: averagePrecipitationForCurrentMonth },
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      type: "SNACK",
                      data: {
                        snackOpen: true,
                        snackMessage: `Weather API error code: ${error.response.status} for getting 5 year average rainfall for this month`,
                      },
                    });
                  });

                if (!state.ajaxInProgress) {
                  dispatch({
                    type: "SET_AJAX_IN_PROGRESS",
                    data: true,
                  });
                  await Axios.get(fiveYearAvgRainURL)
                    .then((resp) => {
                      let fiveYearAvgRainAnnual =
                        resp.data[0]["sum(precipitation)/5"];
                      fiveYearAvgRainAnnual = parseFloat(
                        fiveYearAvgRainAnnual
                      ).toFixed(2);
                      fiveYearAvgRainAnnual = parseFloat(
                        fiveYearAvgRainAnnual * 0.03937
                      ).toFixed(2);
                      dispatch({
                        type: "UPDATE_AVERAGE_PRECIP_ANNUAL",
                        data: { annual: fiveYearAvgRainAnnual },
                      });
                      dispatch({
                        type: "SET_AJAX_IN_PROGRESS",
                        data: false,
                      });
                    })
                    .then(() => {})
                    .catch((error) => {
                      dispatch({
                        type: "SNACK",
                        data: {
                          snackOpen: true,
                          snackMessage: `Weather API error code: ${
                            error.response.status
                          } for getting 5 year average rainfall for ${obj.city.toUpperCase()}, ${obj.state.toUpperCase()}`,
                        },
                      });
                      dispatch({
                        type: "SET_AJAX_IN_PROGRESS",
                        data: false,
                      });
                    });
                }
              }
            });
        })
        .then(() => {
          dispatch({
            type: "SET_AJAX_IN_PROGRESS",
            data: false,
          });
        });
    }
    // check if isRoot

    if (window.location.pathname === "/species-selector") {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }
    // check value of progress state

    switch (state.progress) {
      case 0:
        isActive["val"] = 0;
        break;
      default:
        break;
    }
  }, [state.markers, state.zone, state.weatherDataReset]);

  useEffect(() => {
    let z7Formattedgoal = zone7DataDictionary.filter(
      (data) => data.Category === "Goals" && data.Variable !== "Notes: Goals"
    );
    let z6Formattedgoal = zone6DataDictionary.filter(
      (data) => data.Category === "Goals" && data.Variable !== "Notes: Goals"
    );
    let z5Formattedgoal = zone5DataDictionary.filter(
      (data) => data.Category === "Goals" && data.Variable !== "Notes: Goals"
    );
    let z4Formattedgoal = zone4DataDictionary.filter(
      (data) => data.Category === "Goals" && data.Variable !== "Notes: Goals"
    );

    z7Formattedgoal = z7Formattedgoal.map((goal) => {
      return { fields: goal };
    });
    z6Formattedgoal = z6Formattedgoal.map((goal) => {
      return { fields: goal };
    });
    z5Formattedgoal = z5Formattedgoal.map((goal) => {
      return { fields: goal };
    });
    z4Formattedgoal = z4Formattedgoal.map((goal) => {
      return { fields: goal };
    });

    switch (parseInt(state.zone)) {
      case 7: {
        dispatch({
          type: "PULL_CROP_DATA",
          data: state.zone7CropData,
        });
        dispatch({
          type: "ADD_GOALS",
          data: z7Formattedgoal,
        });
        console.log("z7 data dispatched");
        break;
      }
      case 6: {
        dispatch({
          type: "PULL_CROP_DATA",
          data: state.zone6CropData,
        });
        console.log(state.zone6CropData.length);
        dispatch({
          type: "ADD_GOALS",
          data: z6Formattedgoal,
        });
        console.log("z6 data dispatched");
        break;
      }
      case 5: {
        dispatch({
          type: "PULL_CROP_DATA",
          data: state.zone5CropData,
        });
        dispatch({
          type: "ADD_GOALS",
          data: z5Formattedgoal,
        });
        console.log("z5 data dispatched");
        break;
      }
      case 4: {
        console.log(z4Formattedgoal);
        dispatch({
          type: "PULL_CROP_DATA",
          data: state.zone4CropData,
        });
        dispatch({
          type: "ADD_GOALS",
          data: z4Formattedgoal,
        });
        console.log("z4 data dispatched");
        break;
      }
      default: {
        break;
      }
    }
  }, [
    state.zone,
    state.zone4CropData,
    state.zone5CropData,
    state.zone6CropData,
    state.zone7CropData,
    dispatch,
  ]);

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };
  const setmyCoverCropActivationFlag = () => {
    if (window.location.pathname === "/species-selector") {
      if (state.progress > 4) {
        dispatch({
          type: "ACTIVATE_MY_COVER_CROP_LIST_TILE",
          data: {
            myCoverCropActivationFlag: true,
            speciesSelectorActivationFlag: false,
          },
        });
      }
    } else {
      history.push("/");
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    dispatch({
      type: "ACTIVATE_SPECIES_SELECTOR_TILE",
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      },
    });
    if (window.location.pathname !== "/species-selector") {
      history.push("/species-selector");
    }
  };
  const RenderMyCoverCropListButtons = () => {
    return (
      <Badge
        badgeContent={
          state.selectedCrops.length > 0 ? state.selectedCrops.length : 0
        }
        color={"error"}
      >
        <Button
          className={
            window.location.pathname === "/my-cover-crop-list" ? "active" : ""
          }
          onClick={() => history.push("/my-cover-crop-list")}
        >
          My Cover Crop List
        </Button>
      </Badge>
    );
  };
  return (
    <header className="d-print-none">
      <div className="topHeader">
        <NavLink to="/about" activeClassName={`active`}>
          ABOUT
        </NavLink>
        <span className="line"></span>
        <NavLink to="/help" activeClassName={`active`}>
          HELP
        </NavLink>
        <span className="line"></span>
        <NavLink to="/feedback" activeClassName={`active`}>
          FEEDBACK
        </NavLink>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-12">
            <img
              className="img-fluid"
              src="/images/neccc_wide_logo_color_web.jpg"
              alt="NECCC Logo"
              width="100%"
              onContextMenu={() => {
                return false;
              }}
              onClick={() => {
                dispatch({
                  type: "UPDATE_PROGRESS",
                  data: {
                    type: "HOME",
                  },
                });
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="col-12 col-lg-10 col-sm-12 row">
            <div className="col-lg-4 col-12 d-flex align-items-center text-left">
              <div>
                <Typography variant="body1" className="font-weight-bold">
                  Cover Crop Decision Support Tools
                </Typography>

                <Typography variant="body1">
                  <DateComponent />
                </Typography>
              </div>
            </div>
            <div className="col-lg-8 col-12 d-flex align-items-center">
              <div>
                <ForecastComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomHeader">
        <Button
          size="large"
          component={NavLink}
          exact
          to={"/"}
          activeClassName="active"
        >
          COVER CROP EXPLORER
        </Button>
        <Button
          className={
            isRoot ? (state.speciesSelectorActivationFlag ? "active" : "") : ""
          }
          onClick={setSpeciesSelectorActivationFlag}
          size="large"
        >
          SPECIES SELECTOR TOOL
        </Button>

        {window.location.pathname === "/species-selector" &&
        state.selectedCrops.length > 0 &&
        state.progress >= 5 ? (
          <Badge
            badgeContent={
              state.selectedCrops.length > 0 ? state.selectedCrops.length : 0
            }
            color={"error"}
          >
            <Button
              size="large"
              className={
                state.myCoverCropActivationFlag &&
                window.location.pathname === "/species-selector"
                  ? "active"
                  : ""
              }
              onClick={setmyCoverCropActivationFlag}
            >
              MY COVER CROP LIST
            </Button>
          </Badge>
        ) : (
          ""
        )}
        {/* My Cover Crop List As A Separate Component/Route  */}
        {window.location.pathname !== "/species-selector" ? (
          state.progress.length < 5 ? (
            state.selectedCrops.length > 0 ? (
              <RenderMyCoverCropListButtons />
            ) : (
              ""
            )
          ) : state.selectedCrops.length > 0 ? (
            <RenderMyCoverCropListButtons />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>

      <MDBNavbar light className="ham-navWrapper">
        <MDBContainer fluid>
          <MDBHamburgerToggler
            color="#598443"
            id="hamburger1"
            onClick={() => toggleSingleCollapse()}
          />
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav className="ham-nav">
              <MDBNavItem>COVER CROP EXPLORER</MDBNavItem>
              <MDBNavItem
                onClick={setSpeciesSelectorActivationFlag}
                active={
                  isRoot
                    ? state.speciesSelectorActivationFlag
                      ? true
                      : false
                    : false
                }
              >
                SPECIES SELECTOR TOOL
              </MDBNavItem>
              {state.progress >= 5 ? (
                <MDBNavItem
                  onClick={setmyCoverCropActivationFlag}
                  active={
                    state.myCoverCropActivationFlag &&
                    window.location.pathname === "/"
                      ? true
                      : false
                  }
                >
                  MY COVER CROP LIST
                </MDBNavItem>
              ) : (
                ""
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <Greenbar />

      {window.location.pathname === "/about" ||
      window.location.pathname === "/help" ||
      (window.location.pathname === "/feedback" &&
        window.location.pathname !== "/cover-crop-explorer") ||
      state.progress < 0 ? (
        <div className="topBar"></div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
