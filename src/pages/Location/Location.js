// TODO: debug use
/* eslint-disable no-unused-vars */
// /* eslint-disable */

/* eslint-disable no-alert */
/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import {
  Typography, Grid, Container, Box,
} from '@mui/material';
import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import moment from 'moment';
import { Map } from '@psa/dst.ui.map';
import mapboxgl from 'mapbox-gl';
import { useAuth0 } from '@auth0/auth0-react';
import statesLatLongDict from '../../shared/stateslatlongdict';
import {
  abbrRegion, reverseGEO, callCoverCropApi, getFields,
  buildPoint, drawAreaFromGeoCollection, buildGeometryCollection,
} from '../../shared/constants';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import { updateLocation } from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { snackHandler } from '../../reduxStore/sharedSlice';
import {
  updateAvgFrostDates, updateAvgPrecipAnnual, updateAvgPrecipCurrentMonth, updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';
import { updateField } from '../../reduxStore/userSlice';
import { getAuthToken } from '../../shared/authToken';
import { saveHistory } from '../../shared/api';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Location = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);

  const mapData = useSelector((state) => state.mapData);
  const consent = useSelector((state) => state.userData.consent);
  const addressData = useSelector((state) => state.addressData);

  // useState vars
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [currentGeometry, setCurrentGeometry] = useState({});
  const [mapFeatures, setMapFeatures] = useState([]);

  const { isAuthenticated } = useAuth0();

  // if user field exists, return field, else return state capitol
  const getFeatures = () => {
    if (userFieldRedux !== null) {
      const { geometry } = userFieldRedux;
      if (geometry.type === 'Point') return [userFieldRedux];
      if (geometry.type === 'GeometryCollection') return drawAreaFromGeoCollection(userFieldRedux);
    }
    return [buildPoint(statesLatLongDict[stateLabelRedux][1], statesLatLongDict[stateLabelRedux][0])];
  };

  // set map features, update selectedFieldIdRedux
  useEffect(() => {
    // load map features here
    setMapFeatures(getFeatures());
  }, []);

  const updateRegionRedux = (regionName) => {
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === regionName)[0];
    localStorage.setItem('regionId', selectedRegion.id);
    dispatchRedux(updateRegion({
      regionId: selectedRegion.id ?? '',
      regionShorthand: selectedRegion.shorthand ?? '',
    }));
  };

  // set map initial lat lng
  const getLatLng = useMemo(() => {
    if (userFieldRedux !== null) {
      const { type, coordinates, geometries } = userFieldRedux.geometry;
      if (type === 'Point') return [coordinates[1], coordinates[0]];
      if (type === 'GeometryCollection') return [geometries[0].coordinates[1], geometries[0].coordinates[0]];
    }
    if (markersRedux) {
      return [markersRedux[0][0], markersRedux[0][1]];
    }
    if (stateLabelRedux) {
      return [statesLatLongDict[stateLabelRedux][0], statesLatLongDict[stateLabelRedux][1]];
    }
    return [47, -122];
  }, [stateLabelRedux]);

  // when map marker changes, set addressRedux, update regionRedux based on zipcode
  useEffect(() => {
    if (Object.keys(selectedToEditSite).length > 0) {
      const {
        latitude,
        longitude,
        address,
        // zipCode,
        county,
      } = selectedToEditSite;
      console.log('selectedToEditSite', selectedToEditSite);

      if (markersRedux && latitude === markersRedux[0][0] && longitude === markersRedux[0][1]) return;

      // save field in redux
      const point = buildPoint(longitude, latitude);
      let geoCollection = null;
      if (Object.keys(currentGeometry).length > 0) {
        const polygon = currentGeometry.features?.slice(-1)[0];
        geoCollection = buildGeometryCollection(point.geometry, polygon?.geometry);
        dispatchRedux(updateField(geoCollection));
      } else { dispatchRedux(updateField(point)); }

      // if is adding a new point, open dialog
      // if (isAuthenticated && isAddingPoint && latitude) {
      // const currentSelectedField = selectedUserField?.geometry;
      // if ((!currentSelectedField && latitude !== statesLatLongDict[stateLabelRedux][0])
      //     || (currentSelectedField?.type === 'Point' && latitude !== currentSelectedField?.coordinates[1])
      //     || (currentSelectedField?.type === 'GeometryCollection' && latitude !== currentSelectedField?.geometries[0].coordinates[1])
      // ) {
      //   setFieldDialogState({
      //     ...fieldDialogState, open: true, actionType: 'add', areaType: 'Point',
      //   });
      // }
      // }

      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
          county,
        },
      ));

      if (councilShorthandRedux === 'MCCC') {
        // if council is MCCC, change selectedRegion based on county
        if (county && county.includes(' County')) {
          updateRegionRedux(county.replace(' County', ''));
        }
      } else {
        callCoverCropApi(`https://weather.covercrop-data.org/hardinesszone?lat=${latitude}&lon=${longitude}`)
          .then((response) => {
            let { zone } = response;

            zone = zone.slice(0, -1);

            if (councilShorthandRedux !== 'MCCC') {
              updateRegionRedux(zone);
            }
            dispatchRedux(snackHandler({
              snackOpen: true,
              snackMessage: 'Your location has been saved.',
            }));
          })
          .catch((err) => {
            dispatchRedux(snackHandler({
              snackOpen: true,
              snackMessage: 'No data available for your location, Please try again.',
            }));
            localStorage.setItem('regionId', '');
            dispatchRedux(updateRegion({
              regionId: '',
              regionShorthand: '',
            }));
            // eslint-disable-next-line no-console
            console.log(err);
            // for places where api didn't work, set region to default.
          });
      }
    }
  }, [selectedToEditSite]);

  // call cover crop api based on marker change
  useEffect(() => {
    // FIXME: this useEffect will also run if click next and click back to return to this page
    // TODO: possible solution: move this into above, since the dependency also applies when selectedToEditSite changes
    const getDetails = async () => {
      // const { markers } = state;
      const weatherApiURL = 'https://weather.covercrop-data.org';

      // update address on marker change
      // ref forecastComponent
      const lat = markersRedux[0][0];
      const lon = markersRedux[0][1];

      // since this updates with state; ideally, weather and soil info should be updated here
      // get current lat long and get county, state and city
      if (progressRedux >= 1 && markersRedux.length > 0) {
        const reverseGEOresult = await reverseGEO(lat, lon);
        const abbrState = abbrRegion(
          reverseGEOresult?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text,
          'abbr',
        ).toLowerCase();

        const city = reverseGEOresult?.features?.filter((feature) => feature?.place_type?.includes('place'))[0]?.text?.toLowerCase();

        const currentMonthInt = moment().month() + 1;

        // frost url
        const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}`;
        // What was the 5-year average rainfall for city st during the month of currentMonthInt?
        //  Dynamic dates ?
        const averageRainUrl = `${weatherApiURL}/hourly?location=${city} ${abbrState}&start=2015-01-01&end=2019-12-31`;
        const averageRainForAMonthURL = `${averageRainUrl}&where=month=${currentMonthInt}&stats=sum(precipitation)/5&output=json`;
        // What was the 5-year average annual rainfall for city st?
        const fiveYearAvgRainURL = `${averageRainUrl}&stats=sum(precipitation)/5&output=json`;
        // added "/" and do %100 to get them into correct format (want frost dates to look like 01/01/23)
        const currYear = `/${(new Date().getFullYear() % 100).toString()}`;
        const prevYear = `/${((new Date().getFullYear() % 100) - 1).toString()}`;
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

        // call the frost url and then set frostFreeDays, averageFrostObject in store
        try {
          const frostResponse = await callCoverCropApi(frostUrl);
          const firstFrost = new Date(frostResponse.firstfrost + prevYear);
          const lastFrost = new Date(frostResponse.lastfrost + currYear);
          const frostFreeDays = Math.round(Math.abs((firstFrost.valueOf() - lastFrost.valueOf()) / oneDay));
          dispatchRedux(updateFrostFreeDays(frostFreeDays));
          dispatchRedux(updateAvgFrostDates({
            firstFrostDate: {
              month: firstFrost.toLocaleString('en-US', { month: 'long' }),
              day: firstFrost.getDate().toString(),
            },
            lastFrostDate: {
              month: lastFrost.toLocaleString('en-US', { month: 'long' }),
              day: lastFrost.getDate().toString(),
            },
          }));
        } catch (error) {
          // eslint-disable-next-line
          console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
        }

        // call the frost url and then set averagePrecipitationForCurrentMonth in store
        // TODO annual and monthly are the same
        try {
          const rainForAMonthResponse = await callCoverCropApi(averageRainForAMonthURL);
          let averagePrecipitationForCurrentMonth = rainForAMonthResponse[0]['sum(precipitation)/5'];
          averagePrecipitationForCurrentMonth = parseFloat(
            averagePrecipitationForCurrentMonth * 0.03937,
          ).toFixed(2);

          dispatchRedux(updateAvgPrecipCurrentMonth(averagePrecipitationForCurrentMonth));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
        }

        // call the frost url and then set fiveYearAvgRainAnnual in store
        try {
          const fiveYearAvgRainResponse = await callCoverCropApi(fiveYearAvgRainURL);
          let fiveYearAvgRainAnnual = fiveYearAvgRainResponse[0]['sum(precipitation)/5'];
          fiveYearAvgRainAnnual = parseFloat(fiveYearAvgRainAnnual * 0.03937).toFixed(2);
          dispatchRedux(updateAvgPrecipAnnual(fiveYearAvgRainAnnual));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
        }
      }
    };
    // if user select another region, do not call weather api
    if (markersRedux) {
      getDetails();
    }
  }, [markersRedux]);

  // map onDraw function
  const onDraw = (draw) => {
    console.log('draw', draw);
    if (isAuthenticated && draw.mode !== 'select') {
      // setFieldDialogState({
      //   ...fieldDialogState, open: true, actionType: draw.mode, areaType: 'Polygon',
      // });
    }
    // TODO: temporary change for unlogged user, build a field obj and save it to redux
    if (!isAuthenticated && draw.mode !== 'select') {
      // FIXME: the following code doesn't work, maybe still need a state like fieldDialogState to deal with types

    }
  };

  const handleSave = () => {
    const token = getAuthToken();

    const { longitude, latitude } = selectedToEditSite;
    const point = buildPoint(longitude, latitude, 'test');
    let geoCollection = null;
    const polygon = currentGeometry.features?.slice(-1)[0];
    geoCollection = buildGeometryCollection(point.geometry, polygon?.geometry, 'test');
    console.log(point);

    const data = {
      mapData,
      userData: { consent },
      field: point,
    };
    console.log(data, token);
    // saveHistory('test1', data, token);
  };
  // console.log('currentGeometry', currentGeometry);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid container item md={stateLabelRedux === 'Ontario' ? 12 : 3} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Field Location
            </Typography>
            <Typography variant="body1">
              Find your address or ZIP code using the search bar on the map and hit
              <Search fontSize="inherit" />
              to determine your location. If needed, adjust your
              {' '}
              {councilShorthandRedux === 'MCCC' ? 'county' : 'USDA Plant Hardiness Zone'}
              {' '}
              in the dropdown.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PlantHardinessZone />
          </Grid>

          <Grid item xs={12}>
            {/* {(isAuthenticated && stateLabelRedux !== 'Ontario') && (
            <UserFieldList
              userFields={userFields}
              field={selectedUserField}
              setField={setSelectedUserField}
              setFieldDialogState={setFieldDialogState}
            />
            )} */}
            <button type="button" onClick={handleSave}>save</button>
          </Grid>
        </Grid>
        {stateLabelRedux !== 'Ontario' && (
        <Grid item md={9} xs={12}>
          <Container maxWidth="md">
            <Map
              setAddress={setSelectedToEditSite}
              setFeatures={setCurrentGeometry}
              onDraw={onDraw}
              initWidth="100%"
              initHeight="500px"
              initLat={getLatLng[0]}
              initLon={getLatLng[1]}
              initFeatures={mapFeatures}
              initStartZoom={12}
              initMinZoom={4}
              initMaxZoom={18}
              hasSearchBar
              hasMarker
              hasNavigation
              hasCoordBar
              hasDrawing
              hasGeolocate
              hasFullScreen
              hasMarkerPopup
              hasMarkerMovable
            />
          </Container>

        </Grid>
        )}

      </Grid>
    </Box>
  );
};

export default Location;
