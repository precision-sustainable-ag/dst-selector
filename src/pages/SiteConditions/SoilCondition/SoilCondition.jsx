/* eslint-disable max-len */
/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import { updateSoilData, updateSoilDataOriginal } from '../../../reduxStore/soilSlice';
import { historyState } from '../../../reduxStore/userSlice';
import { fetchSSURGOData, formatSSURGOData } from '../../../shared/ssurgo';
import SoilDrainage from './SoilDrainage/SoilDrainage';
import SoilFloodingFrequency from './SoilFloodingFrequency/SoilFloodingFrequency';

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
    // use 'ponding' for MCCC, 'flooding_frequency' for others
    const floodingSlug = councilShorthandRedux === 'MCCC' ? 'ponding' : 'flooding_frequency';
    fetch(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v2/attribute?filtered=false&slug=${floodingSlug}&${query}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setFloodingOptions(data.data.values);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });

    fetch(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/attribute-values?slug=soil_drainage&${queryStringRedux}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setDrainageOptions(data.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, [apiBaseUrlRedux, queryStringRedux, councilShorthandRedux, query1, query2]);

  // retrieving drainage class and flooding frequency
  useEffect(() => {
    if (stateLabelRedux === 'Ontario' || !markersRedux?.[0]) return;

    const [lat, lon] = markersRedux[0];
    const { lat: latOriginal, lon: lonOriginal } = soilDataOriginalRedux.latLong;
    if (
      floodingOptions.length === 0 ||
      (lat === latOriginal && lon === lonOriginal) ||
      historyStateRedux === historyState.imported ||
      window.Cypress
    )
      return;

    fetchSSURGOData(lat, lon)
      .then((result) => {
        const payload = formatSSURGOData(result, floodingOptions, { lat, lon });
        dispatchRedux(updateSoilData(payload));
        dispatchRedux(updateSoilDataOriginal(payload));
      })
      .catch((error) => console.error('SSURGO API FETCH ERROR', error));
  }, [
    floodingOptions,
    markersRedux,
    soilDataOriginalRedux.latLong,
    historyStateRedux,
    stateLabelRedux,
    dispatchRedux,
  ]);

  return (
    <Grid container sx={{ justifyContent: isLargeScreen ? 'flex-start' : 'center' }}>
      <Grid
        sx={{ mb: '1rem' }}
        size={{
          xs: 12,
          md: 10,
        }}
      >
        {drainageOptions.length > 0 ? (
          <SoilDrainage drainageOptions={drainageOptions} />
        ) : (
          <PSALoadingSpinner />
        )}
      </Grid>
      {councilShorthandRedux !== 'WCCC' && (
        <Grid
          size={{
            xs: 12,
            md: 10,
          }}
        >
          {floodingOptions.length > 0 ? (
            <SoilFloodingFrequency floodingOptions={floodingOptions} />
          ) : (
            <PSALoadingSpinner />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default SoilCondition;
