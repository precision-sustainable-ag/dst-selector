import React, { Fragment, useContext, useEffect, useState } from "react";
import { cloudIcon } from "../../shared/constants";
import { Context } from "../../store/Store";

const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiBaseURL_weather_gov =
  "https://api.weather.gov/points/39.7456,-97.0892";
const apiKey = "99297824ab4835160bbe26208cff1d38";

const geocodeAuth = "105463363432726e15946815x4512";

// TODO: look at https://agromonitoring.com/ api

const ForecastComponent = () => {
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState({});
  // const [loading, setLoading] = useState

  useEffect(() => {
    state.progress >= 2 ? setShowFeatures(true) : setShow(false);
    // fetchOldApi().then(data => {
    //   console.log(data);
    //   let url = data.properties.forecast;
    //   fetchOldApiRecords(url).then(data => {
    //     console.log("forecast", data);
    //   });
    // });
  }, [state.progress]);

  //   const fetchOldApi = async () => {
  //     return (await fetch(apiBaseURL_weather_gov)).json();
  //   };

  //   const fetchOldApiRecords = async url => {
  //     return (await fetch(url, { cache: "no-cache", mode: "no-cors" })).json();
  //   };

  const setShowFeatures = () => {
    setShow(true);

    // get lat long
    let latlng = [];
    try {
      latlng = state.markers[0];
    } catch (e) {
      setShow(false);
      latlng = [];
    }

    let apiCall = callWeatherApi(apiBaseURL, latlng);

    apiCall.then(data => {
      //   console.log(data);
      // icon:   http://openweathermap.org/img/w/04d.png
      let iconId = data.weather[0].icon;

      let tempObj = {
        min: data.main.temp_min,
        max: data.main.temp_max,
        unit: "F",
        iconURL: `http://openweathermap.org/img/w/${iconId}.png`
      };
      setTemp(tempObj);
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

  const reverseGEO = () => {
    let url = "https://geocode.xyz/41.3189957000,2.0746469000?json=1";
    // let ltlng =
  };

  return show ? (
    <Fragment>
      Forecast:
      {/* <span>{cloudIcon(14, 20)}</span> */}
      <img width="50" height="50" src={temp.iconURL} />
      {temp.max} | {temp.min}&nbsp;{temp.unit}
      {/* <span
        style={{
          width: "14px",
          height: "20px",
          background: `url(${temp.iconURL})`
        }}
      > */}
      {/* <i className="fas fa-cloud-rain pl-2"></i> */}
      {/* {temp.iconURL ? <img src={temp.iconURL} /> : ""}{" "} */}
      {/* </span> */}
      {/* <span>0.25in</span> */}
    </Fragment>
  ) : (
    ""
  );
};

export default ForecastComponent;
