/*
  This file contains the ForecastComponent component, helper functions
  The ForecastComponent shows the forecast in the header
*/

import React, {
  Fragment, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloudIcon, ReferenceTooltip } from '../../../shared/constants';
import { openWeatherApiKey } from '../../../shared/keys';
import { Context } from '../../../store/Store';
import { changeAddress, updateZipCode } from '../../../reduxStore/addressSlice';

const apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather';

const ForecastComponent = () => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const addressRedux  = useSelector((stateRedux) => stateRedux.addressData.address);
  const [showTempIcon, setShowTempIcon] = useState(true);
  const [temp, setTemp] = useState({
    min: 0,
    max: 0,
    unit: 'F',
    iconURL: 'https://placehold.it/20x20',
    iconDescription: 'No Data',
  });

  const makeURLString = (url, params) => `${url}?lat=${params[0]}&lon=${params[1]}&appid=${openWeatherApiKey}&units=imperial`;

  const reverseGEO = async (lat, lng) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    let data = await fetch(url);
    data = data.json();

    return data;
  };

  useEffect(() => {
    const callWeatherApi = async (url, latlng) => {
      const fetchData = await fetch(makeURLString(url, latlng));
      const jsonData = await fetchData.json();
      return jsonData;
    };

    const setShowFeatures = () => {
      if (markersRedux.length > 0) {
        let latlng = [];
        try {
          // eslint-disable-next-line
          latlng = markersRedux[0];
        } catch (e) {
          // eslint-disable-next-line no-console
          console.trace('Forecast Component', e);

          latlng = [];
        }

        const apiCall = callWeatherApi(apiBaseURL, latlng);

        apiCall
          .then((data) => {
            const iconId = data.weather[0].icon;
            const iconDescription = data.weather[0].description;

            const tempObj = {
              min: data.main.temp_min,
              max: data.main.temp_max,
              unit: 'F',
              iconURL: `https://openweathermap.org/img/w/${iconId}.png`,
              iconDescription,
            };
            setTemp(tempObj);
            setShowTempIcon(false);
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
          });

        if (addressRedux === '') {
          const data = reverseGEO(latlng[0], latlng[1]);
          data
            .then((res) => {
              if (res.localityInfo.informative) {
                const lastInfo = res.localityInfo.informative[res.localityInfo.informative.length - 1];
                const addressString = `${lastInfo.name}, ${res.city}`;
                dispatchRedux(changeAddress({address: addressString, addressVerified: true}));
                // dispatch({
                //   type: 'CHANGE_ADDRESS',
                //   data: {
                //     address: addressString,
                //     addressVerified: true,
                //   },
                // });
              }
              if (res.postcode) {
                dispatchRedux(updateZipCode(res.postcode));
                // dispatch({
                //   type: 'UPDATE_ZIP_CODE',
                //   data: {
                //     zipCode: res.postcode,
                //   },
                // });
              }
            })
            .catch((e) => {
              // eslint-disable-next-line no-console
              console.error('Geocode.xyz:', e);
            });
        }
      }
    };

    if (markersRedux[0].length > 0) {
      setShowFeatures();
    }
  }, [dispatch, addressRedux, markersRedux, state.progress]);

  if (state.progress >= 1) {
    if (showTempIcon) {
      return (
        <>
          Forecast:&nbsp;
          {cloudIcon(14, 20)}
          &nbsp; Loading..
        </>
      );
    }

    return (
      <>
        Forecast:
        <img
          width="50"
          height="50"
          src={temp.iconURL}
          alt={temp.iconDescription}
          title={temp.iconDescription}
        />
        {Number(temp.max.toFixed(1))}
        {' '}
        |
        {Number(temp.min.toFixed(1))}
        &nbsp;
        {temp.unit}
        <span className="ml-2">
          <ReferenceTooltip source="openweathermap.org" url="https://openweathermap.org/" />
        </span>
      </>
    );
  }

  return null;
};

export default ForecastComponent;
