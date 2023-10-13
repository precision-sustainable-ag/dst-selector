/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, Grid, Box } from '@mui/material';
import { Map } from '@psa/dst.ui.map';
import { CustomStyles } from '../../../shared/constants';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const LocationConfirmation = () => {
  // redux vars
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  return (
    <Box mt={2} mb={2} mr={2} ml={2}>
      <Grid container spacing={2}>
        <Grid item md={6}>

          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Location Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Your cover crop recommendations will come from the
                {` ${councilShorthandRedux} dataset`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                className="pt-2 font-weight-bold"
                style={{
                  color: CustomStyles().lighterGreen,
                }}
              >
                {addressRedux?.length > 0
                  ? `${addressRedux.toString().substring(0, 35)}...`
                  : 'Loading...'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Map
              initWidth="50%"
              initHeight="200px"
              initLon={markersRedux && markersRedux.length > 0 ? markersRedux[0][1] : -122}
              initLat={markersRedux && markersRedux.length > 0 ? markersRedux[0][0] : 47}
              initMinZoom={4}
              initMaxZoom={18}
              initStartZoom={12}
              hasSearchBar={false}
              hasMarker
              hasNavigation={false}
              hasCoordBar={false}
              hasDrawing={false}
              hasGeolocate={false}
              hasFullScreen={false}
              hasMarkerPopup={false}
              hasMarkerMovable={false}
              scrollZoom={false}
              dragRotate={false}
              dragPan={false}
              keyboard={false}
              doubleClickZoom={false}
              touchZoomRotate={false}
            />
          </Grid>
        </Grid>
        <Grid item md={6}>
          {progressRedux === 2 && <SoilCondition />}
          {progressRedux === 3 && <WeatherConditions />}
        </Grid>
      </Grid>
    </Box>

  );
};

export default LocationConfirmation;
