import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  cloudIcon,
  referenceTooltip,
  ReferenceTooltip,
} from "../../shared/constants";
import { Context } from "../../store/Store";
import { InfoRounded, Info } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiBaseURL_weather_gov =
  "https://api.weather.gov/points/39.7456,-97.0892";
const apiKey = "***REMOVED***";

const geocodeAuth = "***REMOVED***";

// TODO: look at https://agromonitoring.com/ api

const ForecastComponent = () => {
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState({
    min: 0,
    max: 0,
    unit: "F",
    iconURL: `https://placehold.it/20x20`,
    iconDescription: "No Data",
  });
  // const [loading, setLoading] = useState

  useEffect(() => {
    console.log("---forecastComponent---");

    setShowFeatures();
    // state.progress >= 1 ? setShowFeatures(true) : setShow(false);
    // fetchOldApi().then(data => {
    //   console.log(data);
    //   let url = data.properties.forecast;
    //   fetchOldApiRecords(url).then(data => {
    //     console.log("forecast", data);
    //   });
    // });
  }, [state.markers || state.progress]);

  //   const fetchOldApi = async () => {
  //     return (await fetch(apiBaseURL_weather_gov)).json();
  //   };

  //   const fetchOldApiRecords = async url => {
  //     return (await fetch(url, { cache: "no-cache", mode: "no-cors" })).json();
  //   };

  const setShowFeatures = () => {
    // get lat long
    let latlng = [];
    try {
      latlng = state.markers[0];
    } catch (e) {
      console.trace("Forecast Component", e);

      latlng = [];
    }

    let apiCall = callWeatherApi(apiBaseURL, latlng);

    apiCall.then((data) => {
      let iconId = data.weather[0].icon;
      let iconDescription = new String(data.weather[0].description);

      let tempObj = {
        min: data.main.temp_min,
        max: data.main.temp_max,
        unit: "F",
        iconURL: `https://openweathermap.org/img/w/${iconId}.png`,
        iconDescription: iconDescription,
      };
      setTemp(tempObj);
    });

    let data = reverseGEO(latlng[0], latlng[1]);
    data
      .then((data) => {
        if (data.success === false) {
          console.log(data);
          if (data.error.code === "006") {
            let delayInMs = 4000;
            setTimeout(function () {
              let data = reverseGEO(latlng[0], latlng[1]);
              data
                .then((data) => {
                  console.log(data);
                  let addressString = ``;
                  if (data.staddress) {
                    addressString = `${data.staddress}, ${data.state}`;
                  }
                  dispatch({
                    type: "CHANGE_ADDRESS",
                    data: {
                      address: addressString,
                      addressVerified: true,
                    },
                  });
                })
                .catch((e) => {
                  console.log("recursive error", e);
                });
            }, delayInMs);
          }
        } else {
          let addressString = ``;
          if (data.staddress) {
            addressString = `${data.staddress}, ${data.state}`;
          }
          dispatch({
            type: "CHANGE_ADDRESS",
            data: {
              address: addressString,
              addressVerified: true,
            },
          });
        }
      })
      .catch((e) => {
        console.log("Geocode.xyz Catch", e);
      });
  };

  const callWeatherApi = async (url, latlng) => {
    let fetchData = await fetch(makeURLString(url, latlng));
    let jsonData = await fetchData.json();
    return jsonData;
  };

  const makeURLString = (url, params) => {
    return `${url}?lat=${params[0]}&lon=${params[1]}&appid=${apiKey}&units=imperial`;
  };

  const reverseGEO = async (lat, lng) => {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    let data = await fetch(url);
    data = data.json();

    return data;
    // let ltlng =
  };

  return state.progress >= 1 ? (
    <Fragment>
      Forecast:
      {/* <span>{cloudIcon(14, 20)}</span> */}
      <img
        width="50"
        height="50"
        src={temp.iconURL}
        alt={temp.iconDescription}
        title={temp.iconDescription}
      />
      {Number(temp.max.toFixed(1))} | {Number(temp.min.toFixed(1))}&nbsp;
      {temp.unit}
      <span className="ml-2">
        <ReferenceTooltip
          source={"openweathermap.org"}
          url={"https://openweathermap.org/"}
        />
      </span>
    </Fragment>
  ) : (
    ""
  );
};

export default ForecastComponent;
