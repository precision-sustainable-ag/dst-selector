/*
  This file contains the ForecastComponent component, helper functions
  The ForecastComponent shows the forecast in the header
*/

import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloudIcon, ReferenceTooltip, reverseGEO } from '../../../shared/constants';
import { openWeatherApiKey } from '../../../shared/keys';
import { changeAddress } from '../../../reduxStore/addressSlice';

const apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather';

const ForecastComponent = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  // useState vars
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
    const callWeatherApi = async (latlng) => {
      const fetchData = await fetch(makeURLString(apiBaseURL, latlng));
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

        const apiCall = callWeatherApi(latlng);

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

              if (address) {
                // FIXME: this line send an action on initial load on Landing page
                dispatchRedux(changeAddress({ address }));
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
  }, [dispatchRedux, addressRedux, markersRedux, progressRedux]);

  if (progressRedux >= 1) {
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
        <ReferenceTooltip source="openweathermap.org" url="https://openweathermap.org/" />
      </>
    );
  }

  return null;
};

export default ForecastComponent;
