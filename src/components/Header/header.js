import React, { useEffect, useContext } from "react";
import { Context } from "../../store/Store";
import "../../styles/header.scss";
import DateComponent from "./DateComponent";
import Greenbar from "./Greenbar/Greenbar";
import { abbrRegion, airtableAPIURL } from "../../shared/constants";
import {
  MDBNavbar,
  MDBContainer,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
} from "mdbreact";
import { Button, Badge } from "@material-ui/core";
import { Redirect, Link, useHistory, NavLink } from "react-router-dom";
import ForecastComponent from "./ForecastComponent";
import Axios from "axios";
import moment from "moment";
import { AirtableBearerKey } from "../../shared/keys";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cropData from "../../shared/crop-data.json";
// var sentimentAnalysis = require("sentiment-analysis");
// import { Link, Button } from "@material-ui/core";
const Header = () => {
  const theme = useTheme();
  const matchesLGUp = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMDBelow = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [collapse, setCollapse] = React.useState(false);
  const [isRoot, setIsRoot] = React.useState(false);
  const [redirectToRoot, setRedirectToRoot] = React.useState(false);
  let isActive = {};

  const getAddressFromMarkers = async (lat, lon) => {
    return (await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)).json();
  };

  const getAverageFrostDates = async (url) => {
    await Axios.get(url).then((resp) => {
      // console.log(resp.data);
      try {
        let totalYears = resp.data.length;
        // get last years value
        // TODO: Take all years data into account
        let mostRecentYearData = resp.data[totalYears - 1];
        // console.log(mostRecentYearData);
        let maxDate = mostRecentYearData["max(date)"];
        let minDate = mostRecentYearData["min(date)"];
        // console.log(maxDate);
        // console.log();
        // console.log();
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
        // firstFrostDate: {
        //   month: "October",
        //   day: 21
        // },
        // lastFrostDate: {
        //   month: "April",
        //   day: 20
        // }
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
    console.log("---Header.js---");
    let { markers } = state;

    if (state.progress === 0) {
      // landing page

      // get user ip

      //NOTE: SSL Unavailabe for free version
      // maybe https://ip-location.icu/ ?
      Axios.get("http://ip-api.com/json").then((resp) => {
        // console.log(resp.data);
        let ipData = resp.data;
        let addressObjectPromise = getAddressFromMarkers(
          ipData.lat,
          ipData.lon
        );
        addressObjectPromise.then((data) => {
          console.log("addressObject", data);
        });
      });
    }

    // update address on marker change
    // ref forecastComponent

    let lat = markers[0][0];
    let lon = markers[0][1];

    // let addressObjectPromise = getAddressFromMarkers(lat, lon);
    // addressObjectPromise.then(data => {
    //   console.log("addressObject", data);
    // });
    // since this updates with state; ideally, weather and soil info should be updated here

    // get current lat long and get county, state and city
    // if (isRoot && state.progress < 4 && state.progress > 1) {
    if (state.progress >= 2 && state.markers.length > 0) {
      let Map_Unit_Name, Drainage_Class, Flooding_Frequency, Ponding_Frequency;

      let markersCopy = markers;
      console.log("Inital: ", markers);

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
      // console.log(longLatString);

      // let soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, muag.pondfreqprs AS Ponding_Frequency, mp.mupolygonkey as MPKEY FROM mapunit AS mu INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))')) AND mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
      let soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, mp.mupolygonkey as MPKEY
     FROM mapunit AS mu 
     INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
     INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
     WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
     AND
     mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
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
      if (markers.length > 1) {
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
            console.log("SSURGO: ", result);

            if (result !== {}) {
              // TODO: Sentiment check
              // console.log(
              //   "Sentiment for drainage_class",
              //   sentimentAnalysis(Drainage_Class)
              // );
              Map_Unit_Name = result["Table"][1][1];
              Drainage_Class = result["Table"][1][2];
              Flooding_Frequency = result["Table"][1][3];
              Ponding_Frequency = result["Table"][1][4];
              let mapUnitString = "";
              // result["Table"].forEach(element => {
              //   console.log("From foreach: ", element);

              // });

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
              console.log(drainageClasses);

              dispatch({
                type: "UPDATE_SOIL_DATA",
                data: {
                  Map_Unit_Name: mapUnitString,
                  Drainage_Class: drainageClasses,
                  Flooding_Frequency: Flooding_Frequency,
                  Ponding_Frequency: Ponding_Frequency,
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
          .catch((error) => console.log("SSURGO ERROR", error));
      }

      let revAPIURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

      // console.log(revAPIURL);
      // if(!state.ajaxInProgress)
      // {

      // }
      Axios.get(revAPIURL)
        .then(async (resp) => {
          let city = resp.data.locality.toLowerCase();
          let zip = resp.data.postcode;
          let state = abbrRegion(
            resp.data.principalSubdivision,
            "abbr"
          ).toLowerCase();

          // call weather API to fetch details

          // Get: Frost Free Days
          // Dynamic Dates not set!
          let frostFreeDaysURL = `http://128.192.142.200:3000/hourly?location=${city}%20${state}&start=2015-01-01&end=2019-12-31&stats=count(date)/24/5&where=air_temperature%3e0&output=json`;
          let frostFreeDatesURL = `http://128.192.142.200:3000/hourly?lat=${lat}&lon=${lon}&start=2014-07-01&end=2019-07-01&stats=min(date),max(date)&where=frost&group=growingyear&options=nomrms&output=json`;
          // let frostFreeDaysURL = `http://128.192.142.200:3000/hourly?lat=${lat}&lon=${lon}&start=2014-07-01&end=2019-07-01&stats=min(date),max(date)&where=frost&group=growingyear&options=nomrms`;
          let frostFreeDays = 0;

          await Axios.get(frostFreeDaysURL)
            .then((resp) => {
              // console.log(resp);
              getAverageFrostDates(frostFreeDatesURL);
              let frostFreeDaysObject = resp.data[0];
              for (var key in frostFreeDaysObject) {
                if (frostFreeDaysObject.hasOwnProperty(key)) {
                  // alert(key);
                  frostFreeDays = frostFreeDaysObject[key];
                }
              }
              return { frostFreeDays: frostFreeDays, city: city, state: state };
            })
            .then((obj) => {
              // console.log(obj.frostFreeDays);
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
              let averageRainForAMonthURL = `http://128.192.142.200:3000/hourly?location=${obj.city}%20${obj.state}&start=2015-01-01&end=2019-12-31&stats=sum(precipitation)/5&where=month=${currentMonthInt}&output=json`;
              // console.log(averageRainForAMonthURL);
              // What was the 5-year average annual rainfall for city st?
              let fiveYearAvgRainURL = `http://128.192.142.200:3000/hourly?location=${obj.city}%20${obj.state}&start=2015-01-01&end=2019-12-31&stats=sum(precipitation)/5&output=json`;
              if (!state.ajaxInProgress) {
                dispatch({
                  type: "SET_AJAX_IN_PROGRESS",
                  data: true,
                });
                await Axios.get(averageRainForAMonthURL)
                  .then((resp) => {
                    // console.log(resp);
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

    if (window.location.pathname === "/") {
      setIsRoot(true);
      // setRedirectToRoot(true);
    } else {
      setIsRoot(false);
    }
    // check value of progress state

    switch (state.progress) {
      case 0:
        isActive["val"] = 0;
    }

    // document.getElementsByClassName('.nav-toggle')[0].addEventListener

    if (state.progress > 4) {
      if (state.cropData.length === 0) {
        // load local json
        dispatch({
          type: "PULL_CROP_DATA",
          data: cropData,
        });
        // const headers = new Headers();
        // let airtableUrl = "";
        // let zone = parseInt(state.zone);

        // if (zone === 7) airtableUrl = airtableAPIURL.Z7;
        // else if (zone === 6) airtableUrl = airtableAPIURL.Z6;
        // else if (zone === 5) airtableUrl = airtableAPIURL.Z5;
        // else airtableUrl = airtableAPIURL.Z7;
        // console.log(`Zone ${zone} data loaded`);
        // // example of airtable 'and+or' logic
        // // IF(AND({Attending?} = 1, OR({Dietary Restrictions} = "Vegan", {Dietary Restrictions} = "Vegetarian")), "true")
        // // sort[0][field]=Cover+Crop+Name&sort[0][direction]=asc
        // // Cover%20Crop%20Goals?sort%5B0%5D%5Bfield%5D=Lasting+Residue&sort%5B0%5D%5Bdirection%5D=asc&sort%5B1%5D%5Bfield%5D=Shade+Tolerance&sort%5B1%5D%5Bdirection%5D=asc
        // if (state.selectedGoals.length !== 0) {
        //   if (state.selectedGoals.length !== 1) {
        //     if (state.selectedGoals.length == 2) {
        //       airtableUrl = `${airtableUrl}/Cover%20Crops%20Data?sort%5B0%5D%5Bfield%5D=${state.selectedGoals[0]
        //         .split(" ")
        //         .join(
        //           "+"
        //         )}&sort%5B0%5D%5Bdirection%5D=desc&sort%5B1%5D%5Bfield%5D=${state.selectedGoals[1]
        //         .split(" ")
        //         .join(
        //           "+"
        //         )}&sort%5B1%5D%5Bdirection%5D=desc&filterByFormula=NOT(%7BZone+Decision%7D+%3D+'Exclude')`;
        //     } else {
        //       airtableUrl = `${airtableUrl}/Cover%20Crops%20Data?sort%5B0%5D%5Bfield%5D=${state.selectedGoals[0]
        //         .split(" ")
        //         .join(
        //           "+"
        //         )}&sort%5B0%5D%5Bdirection%5D=desc&sort%5B1%5D%5Bfield%5D=${state.selectedGoals[1]
        //         .split(" ")
        //         .join(
        //           "+"
        //         )}&sort%5B1%5D%5Bdirection%5D=desc&sort%5B2%5D%5Bfield%5D=${state.selectedGoals[2]
        //         .split(" ")
        //         .join(
        //           "+"
        //         )}&sort%5B2%5D%5Bdirection%5D=desc&filterByFormula=NOT(%7BZone+Decision%7D+%3D+'Exclude')`;
        //     }
        //   } else {
        //     airtableUrl = `${airtableUrl}/Cover%20Crops%20Data?sort%5B0%5D%5Bfield%5D=${state.selectedGoals[0]
        //       .split(" ")
        //       .join(
        //         "+"
        //       )}&sort%5B0%5D%5Bdirection%5D=desc&filterByFormula=NOT(%7BZone+Decision%7D+%3D+'Exclude')`;
        //   }
        // } else {
        //   airtableUrl = `${airtableUrl}/Cover%20Crops%20Data?filterByFormula=NOT(%7BZone+Decision%7D+%3D+'Exclude')`;
        // }
        // console.log(airtableUrl);
        // headers.append("Authorization", `Bearer ${AirtableBearerKey}`);
        // headers.append("Content-Type", "application/json");

        // if (!state.ajaxInProgress) {
        //   dispatch({
        //     type: "SET_AJAX_IN_PROGRESS",
        //     data: true,
        //   });

        //   fetch(airtableUrl, {
        //     headers: headers,
        //   })
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((data) => {
        //       dispatch({
        //         type: "PULL_CROP_DATA",
        //         data: data.records,
        //       });
        //       dispatch({
        //         type: "SET_AJAX_IN_PROGRESS",
        //         data: false,
        //       });
        //       // checkCropsAddedToCart();
        //     });
        // }
      }
    }

    // header contentWrapper padding for state.progess > 0

    if (state.progress !== 0) {
      document
        .getElementsByClassName("contentWrapper")[0]
        .classList.add("pb-5");
    } else {
      document
        .getElementsByClassName("contentWrapper")[0]
        .classList.remove("pb-5");
    }
  }, [state.markers, state.progress, state.zone, state.weatherDataReset]);

  const toggleClass = (el, className) => el.classList.toggle(className);

  const burgurClick = () => {
    toggleClass(document.querySelector("body"), "nav-open");
  };

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };
  const setmyCoverCropActivationFlag = () => {
    if (window.location.pathname === "/") {
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
    // if (state.progress) {
    if (window.location.pathname === "/") {
      console.log("pathname", "/");
      dispatch({
        type: "ACTIVATE_SPECIES_SELECTOR_TILE",
        data: {
          speciesSelectorActivationFlag: true,
          myCoverCropActivationFlag: false,
        },
      });
    } else {
      // console.log("pathname", window.location.pathname);
      history.push("/");
      // return <Redirect to="/" />;
    }

    // console.log(window.location.pathname);
    // if (window.location.pathname !== "/") {
    //   setIsRoot(false);
    //   setRedirectToRoot(true);
    //   // return <Redirect to="/" />;
    // } else {
    //   setIsRoot(true);
    //   setRedirectToRoot(false);
    // }
    // }
  };

  return redirectToRoot ? (
    <Redirect to="/" />
  ) : (
    <header>
      <div className="topHeader">
        <Link to="/about" style={{ color: "black" }}>
          {" "}
          <div>ABOUT</div>
        </Link>
        <div onClick={() => window.open("http://northeastcovercrops.com")}>
          NECCC
        </div>
        <div
          onClick={() =>
            window.open(
              "http://www.nrcs.usda.gov/wps/portal/nrcs/site/national/home/"
            )
          }
        >
          USDA NRCS
        </div>
        <div onClick={() => window.open("http://www.northeastsare.org/")}>
          NE SARE
        </div>
        <div>HELP</div>
        <div>FEEDBACK</div>
      </div>
      <div className="midHeader container-fluid">
        <div
          className="logoContainer"
          onClick={() => window.open("http://northeastcovercrops.com")}
          style={{ cursor: "pointer" }}
        >
          {/* NECCCLOGO */}
          {/* <img src={"/images/neccc_wide_logo_color_web.jpg"} /> */}
        </div>
        <div className="dataComponents">
          <div>
            <DateComponent />
          </div>
          <div>
            <ForecastComponent />
          </div>
          {/* <div></div> */}
        </div>
      </div>
      <div className="bottomHeader">
        <Button
          size="large"
          component={NavLink}
          exact
          to={"/cover-crop-explorer"}
          activeClassName="active"
        >
          COVER CROP EXPLORER
        </Button>
        <Button
          // className={state.speciesSelectorActivationFlag ? "active" : ""}
          className={
            isRoot ? (state.speciesSelectorActivationFlag ? "active" : "") : ""
          }
          onClick={setSpeciesSelectorActivationFlag}
          size="large"
        >
          SPECIES SELECTOR
        </Button>
        {/* <Button
          size="large"
          exact
          component={NavLink}
          to={"/mix-maker"}
          activeClassName="active"
        >
          MIX MAKER
        </Button> */}
        {/* <Button className={state.progress === 3 ? "active" : ""}> */}
        {/* <Button
          size="large"
          exact
          component={NavLink}
          to={"/seeding-rate-calculator"}
          activeClassName="active"
        >
          SEEDING RATE CALCULATOR
        </Button> */}
        <Badge
          badgeContent={
            state.selectedCrops.length > 0 ? state.selectedCrops.length : 0
          }
          color={"secondary"}
        >
          <Button
            size="large"
            className={state.myCoverCropActivationFlag ? "active" : ""}
            onClick={setmyCoverCropActivationFlag}
          >
            MY COVER CROP LIST
          </Button>
        </Badge>
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
                SPECIES SELECTOR
              </MDBNavItem>
              {/* <MDBNavItem>MIX MAKER</MDBNavItem>
              <MDBNavItem>SEED RATE CALCULATOR</MDBNavItem> */}
              <MDBNavItem
                onClick={setmyCoverCropActivationFlag}
                active={state.myCoverCropActivationFlag ? true : false}
              >
                MY COVER CROP LIST
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {/* </MDBContainer> */}
      <Greenbar />

      {window.location.pathname === "/" ? (
        state.progress === 0 ? (
          <div className="topBar"></div>
        ) : (
          <div className="topBarMuted"></div>
        )
      ) : (
        <div className="topBar"></div>
      )}
    </header>
  );
};

export default Header;
