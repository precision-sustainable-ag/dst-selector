/*
  This file contains the ForecastComponent component, helper functions
  The ForecastComponent shows the forecast in the header
*/

import React, { Fragment, useContext, useEffect, useState } from "react";
import { cloudIcon, ReferenceTooltip } from "../../shared/constants";
import { Context } from "../../store/Store";

const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiBaseURL_weather_gov =
  "https://api.weather.gov/points/39.7456,-97.0892";
const apiKey = "***REMOVED***";

const geocodeAuth = "***REMOVED***";

// TODO: look at https://agromonitoring.com/ api

const ForecastComponent = () => {
  const [state, dispatch] = useContext(Context);
  const [showTempIcon, setShowTempIcon] = useState(true);
  const [temp, setTemp] = useState({
    min: 0,
    max: 0,
    unit: "F",
    iconURL: `https://placehold.it/20x20`,
    iconDescription: "No Data",
  });
  // const [loading, setLoading] = useState

  useEffect(() => {
    // console.log("---forecastComponent---");
    // console.log("new features");
    if (state.markers[0].length > 0) {
      setShowFeatures();
    }
    // state.progress >= 1 ? setShowFeatures(true) : setShow(false);
    // fetchOldApi().then(data => {
    //   console.log(data);
    //   let url = data.properties.forecast;
    //   fetchOldApiRecords(url).then(data => {
    //     console.log("forecast", data);
    //   });
    // });
  }, [state.markers, state.progress]);

  //   const fetchOldApi = async () => {
  //     return (await fetch(apiBaseURL_weather_gov)).json();
  //   };

  //   const fetchOldApiRecords = async url => {
  //     return (await fetch(url, { cache: "no-cache", mode: "no-cors" })).json();
  //   };

  const setShowFeatures = () => {
    if (state.markers.length > 0) {
      let latlng = [];
      try {
        latlng = state.markers[0];
      } catch (e) {
        console.trace("Forecast Component", e);

        latlng = [];
      }

      let apiCall = callWeatherApi(apiBaseURL, latlng);

      apiCall
        .then((data) => {
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
          setShowTempIcon(false);
        })
        .catch((e) => {
          console.error(e);
        });

      if (state.address === "") {
        let data = reverseGEO(latlng[0], latlng[1]);
        data
          .then((data) => {
            if (data.localityInfo.informative) {
              let lastInfo =
                data.localityInfo.informative[
                  data.localityInfo.informative.length - 1
                ];
              // console.log(lastInfo);
              // let addressString = ``;
              let addressString = `${lastInfo.name}, ${data.city}`;
              dispatch({
                type: "CHANGE_ADDRESS",
                data: {
                  address: addressString,
                  addressVerified: true,
                },
              });
            }
            if (data.postcode) {
              dispatch({
                type: "UPDATE_ZIP_CODE",
                data: {
                  zipCode: parseInt(data.postcode),
                },
              });
            }
          })
          // }
          // )
          .catch((e) => {
            console.error("Geocode.xyz:", e);
          });
      }
    }
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
    // let url = `https://geocode.xyz/${lat},${lng}?json=1;
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    let data = await fetch(url);
    data = data.json();

    return data;
    // let ltlng =
  };

  return state.progress >= 1 ? (
    showTempIcon ? (
      <Fragment>
        Forecast:&nbsp;
        {cloudIcon(14, 20)}&nbsp; Loading..
      </Fragment>
    ) : (
      <Fragment>
        Forecast:
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
    )
  ) : (
    ""
  );
};

export default ForecastComponent;
