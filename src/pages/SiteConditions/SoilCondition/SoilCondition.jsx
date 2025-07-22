/* eslint-disable max-len */
/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import { Grid, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import SoilDrainage from './SoilDrainage/SoilDrainage';
import SoilFloodingFrequency from './SoilFloodingFrequency/SoilFloodingFrequency';
import { updateSoilData, updateSoilDataOriginal } from '../../../reduxStore/soilSlice';
import { historyState } from '../../../reduxStore/userSlice';

const SoilCondition = () => {
  // theme
  const uiTheme = useTheme();
  const isLargeScreen = useMediaQuery(uiTheme.breakpoints.up('lg'));

  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // useState vars
  const [floodingOptions, setFloodingOptions] = useState([]);
  const [drainageOptions, setDrainageOptions] = useState([]);
  const query1 = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
  const query2 = `${encodeURIComponent('regions')}=${encodeURIComponent(stateIdRedux)}`;

  // retrieving flooding frequency values(not exact value)
  useEffect(() => {
    const query = councilShorthandRedux === 'WCCC' ? `${queryStringRedux}` : `${query2}&${query1}`;
    fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v2/attribute?filtered=false&slug=flooding_frequency&${query}`)
      .then((res) => res.json())
      .then((data) => {
        setFloodingOptions(data.data.values);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });

    fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/attribute-values?slug=soil_drainage&${queryStringRedux}`)
      .then((res) => res.json())
      .then((data) => {
        setDrainageOptions(data.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);

  // retrieving drainage class and flooding frequency
  useEffect(() => {
    const [lat, lon] = markersRedux[0];
    const { lat: latOriginal, lon: lonOriginal } = soilDataOriginalRedux.latLong;
    if (
      floodingOptions.length === 0
      || (lat === latOriginal && lon === lonOriginal)
      || historyStateRedux === historyState.imported
      || stateLabelRedux === 'Ontario'
      || window.Cypress
    ) return;
    const getSSURGOData = () => {
      const markersCopy = markersRedux;

      let longLatString = '';

      markersCopy.forEach((val, i) => {
        // get long lat formatted as requested by SSURGO (long lat, long lat, ...)
        // saved as longLatString
        if (i === markersCopy.length - 1) {
          longLatString += `${markersCopy[i][1]} ${markersCopy[i][0]},${lon} ${lat}`;
        } else {
          longLatString += `${markersCopy[i][1]} ${markersCopy[i][0]},`;
        }
      });
      let soilDataQuery = '';

      if (markersCopy.length > 1) {
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS mapUnitName, muag.drclassdcd AS drainageClass, muag.flodfreqdcd AS floodingFrequency, mp.mupolygonkey as MPKEY
      FROM mapunit AS mu 
      INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
      INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
      WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
      AND
      mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
      } else {
        // point
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS mapUnitName, muag.drclassdcd AS drainageClass, muag.flodfreqdcd AS floodingFrequency, mp.mupolygonkey as MPKEY
        FROM mapunit AS mu 
        INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
        INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
        WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))
        AND
        mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))`;
      }

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('query', soilDataQuery);
      urlencoded.append('format', 'json+columnname');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      };

      fetch('https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let mapUnitString = '';
          const stringSplit = [];

          result.Table.forEach((el, index) => {
            if (index !== 0) {
              if (stringSplit.indexOf(el[1].split(',')[0]) === -1) {
                stringSplit.push(el[1].split(',')[0]);
              }
            }
          });

          const filteredArr = stringSplit.filter((elm) => elm);
          mapUnitString = filteredArr.join(', ');

          const floodingClasses = [];
          result.Table.forEach((el, index) => {
            // eslint-disable-next-line no-empty
            if (index === 0 || el.indexOf('Water') === 1) {
            } else if (floodingClasses.indexOf(el[3]) === -1) {
              floodingClasses.push(el[3]);
            }
          });

          let drainageClasses = [];
          result.Table.forEach((el, index) => {
            if (index !== 0) {
              if (drainageClasses.indexOf(el[2]) === -1) {
                drainageClasses.push(el[2]);
              }
            }
          });
          drainageClasses = drainageClasses.filter((el) => el != null);
          const floodingOptionsList = floodingOptions.map((option) => option.label);
          let selectedOption;
          floodingOptions.forEach((opt) => {
            if (opt.label === floodingClasses[0]) {
              selectedOption = [opt.value.toString()];
            }
          });
          const payload = {
            mapUnitName: mapUnitString,
            drainageClass: drainageClasses,
            floodingFrequency: floodingOptionsList.includes(floodingClasses[0]) ? selectedOption : [],
            latLong: { lat, lon },
          };

          dispatchRedux(
            updateSoilData(payload),
          );
          dispatchRedux(
            updateSoilDataOriginal(payload),
          );
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error('SSURGO FETCH ERROR', error));
    };

    getSSURGOData();
  }, [floodingOptions]);

  return (
    <Grid item container justifyContent={isLargeScreen ? 'flex-start' : 'center'}>
      <Grid item xs={12} md={10} sx={{ mb: '1rem' }}>
        {drainageOptions.length > 0 ? (
          <SoilDrainage drainageOptions={drainageOptions} />
        ) : (
          <PSALoadingSpinner />
        )}
      </Grid>
      <Grid item xs={12} md={10}>
        {floodingOptions.length > 0 ? (
          <SoilFloodingFrequency floodingOptions={floodingOptions} />
        ) : (
          <PSALoadingSpinner />
        )}
      </Grid>
    </Grid>
  );
};

export default SoilCondition;
