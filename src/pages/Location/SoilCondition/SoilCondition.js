/* eslint-disable max-len */
/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import { Grid, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SoilDrainage from './SoilDrainage/SoilDrainage';
import SoilFloodingFrequency from './SoilFloodingFrequency/SoilFloodingFrequency';
import { updateSoilData, updateSoilDataOriginal } from '../../../reduxStore/soilSlice';

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
  const userSelectRegionRedux = useSelector((stateRedux) => stateRedux.userData.userSelectRegion);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);

  // useState vars
  const [floodingOptions, setFloodingOptions] = useState([]);
  const [drainageOptions, setDrainageOptions] = useState([]);
  const query1 = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
  const query2 = `${encodeURIComponent('regions')}=${encodeURIComponent(stateIdRedux)}`;

  useEffect(() => {
    fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v2/attribute?filtered=false&slug=flooding_frequency&${query2}&${query1}`)
      .then((res) => res.json())
      .then((data) => {
        setFloodingOptions(data.data.values);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
    fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v2/attribute?filtered=false&slug=soil_drainage&${query2}&${query1}`)
      .then((res) => res.json())
      .then((data) => {
        setDrainageOptions(data.data.values);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const getSSURGOData = (lat, lon) => {
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

    // if the user selected another region, not run the function
    if (userSelectRegionRedux) return;
    if (stateLabelRedux === 'Ontario') return;

    const lat = markersRedux[0][0];
    const lon = markersRedux[0][1];

    if (soilDataOriginalRedux?.latLong) {
      if (
        !(soilDataOriginalRedux.latLong?.lat === lat && soilDataOriginalRedux.latLong?.lon === lon)
      ) {
        getSSURGOData(lat, lon);
      }
    } else {
      getSSURGOData(lat, lon);
    }
  }, [markersRedux, soilDataOriginalRedux?.latLong, floodingOptions]);

  return (
    <Grid item container justifyContent={isLargeScreen ? 'flex-start' : 'center'}>
      <Grid item xs={12} md={10} sx={{ mb: '1rem' }}>
        {drainageOptions.length > 0 && <SoilDrainage drainageOptions={drainageOptions} />}
      </Grid>
      <Grid item xs={12} md={10}>
        {floodingOptions.length > 0 && <SoilFloodingFrequency floodingOptions={floodingOptions} /> }
      </Grid>
    </Grid>
  );
};

export default SoilCondition;
