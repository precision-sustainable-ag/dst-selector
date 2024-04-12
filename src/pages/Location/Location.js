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
  useRef,
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
  buildPoint, drawAreaFromGeoCollection,
} from '../../shared/constants';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import { updateLocation } from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { snackHandler } from '../../reduxStore/sharedSlice';
import {
  updateAvgFrostDates, updateAvgPrecipAnnual, updateAvgPrecipCurrentMonth, updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';
import { setSelectFieldId, updateField, userSelectRegion } from '../../reduxStore/userSlice';
import UserFieldList from './UserFieldList/UserFieldList';
import UserFieldDialog, { initFieldDialogState } from './UserFieldDialog/UserFieldDialog';

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
  const accessTokenRedux = useSelector((stateRedux) => stateRedux.userData.accessToken);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const selectedFieldIdRedux = useSelector((stateRedux) => stateRedux.userData.selectedFieldId);
  const userSelectRegionRedux = useSelector((stateRedux) => stateRedux.userData.userSelectRegion);

  // useState vars
  const [regionShorthand, setRegionShorthand] = useState(regionShorthandRedux);
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [currentGeometry, setCurrentGeometry] = useState([]);
  const [fieldDialogState, setFieldDialogState] = useState(initFieldDialogState);
  const [selectedUserField, setSelectedUserField] = useState(
    userFieldRedux?.data.filter((field) => field.id === selectedFieldIdRedux)[0]
     || (userFieldRedux && userFieldRedux.data.length
       ? userFieldRedux.data[userFieldRedux.data.length - 1]
       : {}),
  );
  // use a state to control if currently is adding a point
  const [isAddingPoint, setIsAddingPoint] = useState(true);
  const [mapFeatures, setMapFeatures] = useState([]);
  const [userFields, setUserFields] = useState(userFieldRedux ? [...userFieldRedux.data] : []);

  const selectedUserFieldRef = useRef(selectedUserField);

  const { isAuthenticated } = useAuth0();
  // calculate features shown on map
  const getFeatures = () => {
    if (userFields.length > 0 && Object.keys(selectedUserField).length !== 0) {
      if (selectedUserField.geometry.type === 'Point') return [selectedUserField];
      if (selectedUserField.geometry.type === 'GeometryCollection') return drawAreaFromGeoCollection(selectedUserField);
    }
    // reset default field to state capitol
    return [buildPoint(statesLatLongDict[stateLabelRedux][1], statesLatLongDict[stateLabelRedux][0])];
  };

  // set map features, update selectedFieldIdRedux
  useEffect(() => {
    if (isAuthenticated) {
      setMapFeatures(getFeatures());
      selectedUserFieldRef.current = selectedUserField;
    }
  }, [selectedUserField]);

  // update regionShorthandRef
  useEffect(() => {
    localStorage.setItem('regionId', regionsRedux.filter((region) => region.shorthand === regionShorthand)[0]?.id);
    dispatchRedux(updateRegion({
      regionId: regionsRedux.filter((region) => region.shorthand === regionShorthand)[0]?.id,
      regionShorthand,
    }));

    // if userSelectRegionRedux = true, remove weather redux value
    if (userSelectRegionRedux) {
      dispatchRedux(updateFrostFreeDays(0));
      dispatchRedux(updateAvgFrostDates(
        { firstFrostDate: { month: '', day: '' }, lastFrostDate: { month: '', day: '' } },
      ));
      dispatchRedux(updateAvgPrecipCurrentMonth(0));
      dispatchRedux(updateAvgPrecipAnnual(0));
    }
  }, [regionShorthand]);

  // set map initial lat lng
  const getLatLng = useMemo(() => {
    const getFieldLatLng = (field) => {
      if (field.geometry.type === 'Point') {
        return [field.geometry.coordinates[1], field.geometry.coordinates[0]];
      }
      if (field.geometry.type === 'GeometryCollection') {
        const { coordinates } = field.geometry.geometries[0];
        return [coordinates[1], coordinates[0]];
      }
      return undefined;
    };
    if (selectedFieldIdRedux !== null) {
      if (Object.keys(selectedUserField).length > 0) return getFieldLatLng(selectedUserField);
    }
    if (userFieldRedux && userFieldRedux.data.length > 0) {
      const currentField = userFieldRedux.data[userFieldRedux.data.length - 1];
      return getFieldLatLng(currentField);
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

      if (markersRedux && latitude === markersRedux[0][0] && longitude === markersRedux[0][1]) return;

      // if user address differenct than capitol, set userSelectRegion to false
      if (latitude !== statesLatLongDict[stateLabelRedux][0]
         || longitude !== statesLatLongDict[stateLabelRedux][1]) {
        dispatchRedux(userSelectRegion(false));
      }

      // if is adding a new point, open dialog
      if (isAuthenticated && isAddingPoint && latitude) {
        const currentSelectedField = selectedUserField?.geometry;
        if ((!currentSelectedField && latitude !== statesLatLongDict[stateLabelRedux][0])
            || (currentSelectedField?.type === 'Point' && latitude !== currentSelectedField?.coordinates[1])
            || (currentSelectedField?.type === 'GeometryCollection' && latitude !== currentSelectedField?.geometries[0].coordinates[1])
        ) {
          setFieldDialogState({
            ...fieldDialogState, open: true, actionType: 'add', areaType: 'Point',
          });
        }
      }

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
          setRegionShorthand(county.replace(' County', ''));
        }
      } else {
        callCoverCropApi(`https://weather.covercrop-data.org/hardinesszone?lat=${latitude}&lon=${longitude}`)
          .then((response) => {
            let { zone } = response;

            zone = zone.slice(0, -1);

            if (councilShorthandRedux !== 'MCCC') {
              setRegionShorthand(zone);
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
    if (markersRedux && !userSelectRegionRedux) {
      getDetails();
    }
  }, [markersRedux]);

  // update userFieldRedux and selectedField when component will unmount
  useEffect(() => () => {
    if (isAuthenticated) {
      getFields(accessTokenRedux).then((fields) => dispatchRedux(updateField(fields)));
      if (Object.keys(selectedUserFieldRef.current).length > 0) {
        dispatchRedux(setSelectFieldId(selectedUserFieldRef.current.id));
      } else {
        dispatchRedux(setSelectFieldId(null));
      }
    }
  }, []);

  // map onDraw function
  const onDraw = (draw) => {
    if (isAuthenticated && draw.mode !== 'select') {
      setIsAddingPoint(false);
      setFieldDialogState({
        ...fieldDialogState, open: true, actionType: draw.mode, areaType: 'Polygon',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid lg={10} container spacing={2}>
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
            <PlantHardinessZone
              regionShorthand={regionShorthand}
              setRegionShorthand={setRegionShorthand}
              regionsRedux={regionsRedux}
              councilLabelRedux={councilLabelRedux}
            />
          </Grid>

          <Grid item xs={12}>
            {(isAuthenticated && stateLabelRedux !== 'Ontario') && (
            <UserFieldList
              userFields={userFields}
              field={selectedUserField}
              setField={setSelectedUserField}
              setFieldDialogState={setFieldDialogState}
            />
            )}
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

        <UserFieldDialog
          fieldDialogState={fieldDialogState}
          setFieldDialogState={setFieldDialogState}
          userFields={userFields}
          selectedToEditSite={selectedToEditSite}
          currentGeometry={currentGeometry}
          selectedUserField={selectedUserField}
          setUserFields={setUserFields}
          setSelectedUserField={setSelectedUserField}
          setMapFeatures={setMapFeatures}
          getFeatures={getFeatures}
          setIsAddingPoint={setIsAddingPoint}
        />
      </Grid>
    </Box>
  );
};

export default Location;
