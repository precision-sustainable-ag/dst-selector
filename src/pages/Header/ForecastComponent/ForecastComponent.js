/*
  This file contains the ForecastComponent component, helper functions
  The ForecastComponent shows the forecast in the header
*/

import React, {
  Fragment, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloudIcon, ReferenceTooltip, reverseGEO } from '../../../shared/constants';
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
              const address = res?.features?.filter((feature) => feature?.place_type?.includes('address'))[0]?.place_name;
              const zip = res?.features?.filter((feature) => feature?.place_type?.includes('postcode'))[0]?.text;
              if (address) {
                dispatchRedux(changeAddress({address: addressString, addressVerified: true}));
                // dispatch({
                //   type: 'CHANGE_ADDRESS',
                //   data: {
                //     address,
                //     addressVerified: true,
                //   },
                // });
              }
              if (zip) {
                dispatchRedux(updateZipCode(zip));
                // dispatch({
                //   type: 'UPDATE_ZIP_CODE',
                //   data: {
                //     zipCode: zip,
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
