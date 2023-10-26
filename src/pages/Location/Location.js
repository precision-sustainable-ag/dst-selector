/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import {
  Typography, Grid, Container,
} from '@mui/material';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
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
import { setSelectFieldId, updateField } from '../../reduxStore/userSlice';
import UserFieldList from './UserFieldList/UserFieldList';
import UserFieldDialog, { initFieldDialogState } from './UserFieldDialog/UserFieldDialog';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const LocationComponent = () => {
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

  // useState vars
  const [regionShorthand, setRegionShorthand] = useState('');
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
  const regionShorthandRef = useRef(regionShorthand);

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
    setMapFeatures(getFeatures());
    selectedUserFieldRef.current = selectedUserField;
  }, [selectedUserField]);

  // update regionShorthandRef
  useEffect(() => {
    regionShorthandRef.current = regionShorthand;
  }, [regionShorthand]);

  // set map initial lat lng
  const getLatLng = useCallback(() => {
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
      if (Object.keys(selectedUserField) > 0) return getFieldLatLng(selectedUserField);
    }
    if (userFieldRedux && userFieldRedux.data.length > 0) {
      const currentField = userFieldRedux.data[userFieldRedux.data.length - 1];
      return getFieldLatLng(currentField);
    }
    if (stateLabelRedux) {
      return [statesLatLongDict[stateLabelRedux][0], statesLatLongDict[stateLabelRedux][1]];
    }
    return [47, -122];
  }, [stateLabelRedux]);

  // when map marker changes, set addressRedux, update regionRedux based on zipcode
  useEffect(() => {
    const {
      latitude,
      longitude,
      address,
      zipCode,
      county,
    } = selectedToEditSite;

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

    if (Object.keys(selectedToEditSite).length > 0) {
      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
          county,
        },
      ));
      dispatchRedux(snackHandler({
        snackOpen: true,
        snackMessage: 'Your location has been saved.',
      }));
      callCoverCropApi(`https://phzmapi.org/${zipCode}.json`)
        .then((response) => {
          let { zone } = response;

          if (zone !== '8a' && zone !== '8b') {
            zone = zone.slice(0, -1);
          }

          if (selectedFieldIdRedux && selectedUserField.id === selectedFieldIdRedux && regionShorthandRedux) {
            // if there exists available region from user history api, set it as user history value
            setRegionShorthand(regionShorthandRedux);
          } else if (councilShorthandRedux !== 'MCCC') {
            setRegionShorthand(zone);
          } else {
            // if council is MCCC, change selectedRegion based on county
            setRegionShorthand(county.replace(' County', ''));
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          // for places where api didn't work, set region to default.
          setRegionShorthand(regionsRedux[0].shorthand);
        });
    }
  }, [selectedToEditSite]);

  // call cover crop api based on marker change
  useEffect(() => {
    // const { markers } = state;
    const weatherApiURL = 'https://weather.covercrop-data.org';

    // update address on marker change
    // ref forecastComponent
    const lat = markersRedux[0][0];
    const lon = markersRedux[0][1];

    // since this updates with state; ideally, weather and soil info should be updated here
    // get current lat long and get county, state and city
    if (progressRedux >= 1 && markersRedux.length > 0) {
      reverseGEO(lat, lon)
        .then(async (resp) => {
          const abbrState = abbrRegion(
            resp?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text,
            'abbr',
          ).toLowerCase();

          const city = resp?.features?.filter((feature) => feature?.place_type?.includes('place'))[0]?.text?.toLowerCase();

          const currentMonthInt = moment().month() + 1;
          // frost url
          const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}`;
          // What was the 5-year average rainfall for city st during the month of currentMonthInt?
          //  Dynamic dates ?
          const averageRainUrl = `${weatherApiURL}/hourly?location=${city}%20${abbrState}&start=2015-01-01&end=2019-12-31`;
          const averageRainForAMonthURL = `${averageRainUrl}&stats=sum(precipitation)/5&where=month=${currentMonthInt}&output=json`;
          // What was the 5-year average annual rainfall for city st?
          const fiveYearAvgRainURL = `${averageRainUrl}&stats=sum(precipitation)/5&output=json`;
          // added "/" and do %100 to get them into correct format (want frost dates to look like 01/01/23)
          const currYear = `/${(new Date().getFullYear() % 100).toString()}`;
          const prevYear = `/${((new Date().getFullYear() % 100) - 1).toString()}`;
          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

          // call the frost url and then set frostFreeDays, averageFrostObject in store
          callCoverCropApi(frostUrl)
            .then(((frostResp) => {
              const firstFrost = new Date(frostResp.firstfrost + prevYear);
              const lastFrost = new Date(frostResp.lastfrost + currYear);
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
            })).catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });

          // call the frost url and then set averagePrecipitationForCurrentMonth in store
          // TODO annual and monthly are the same
          callCoverCropApi(averageRainForAMonthURL)
            .then((rainResp) => {
              let averagePrecipitationForCurrentMonth = rainResp[0]['sum(precipitation)/5'];

              averagePrecipitationForCurrentMonth = parseFloat(
                averagePrecipitationForCurrentMonth * 0.03937,
              ).toFixed(2);

              dispatchRedux(updateAvgPrecipCurrentMonth(averagePrecipitationForCurrentMonth));
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });

          // call the frost url and then set fiveYearAvgRainAnnual in store
          callCoverCropApi(fiveYearAvgRainURL)
            .then((rainResp) => {
              let fiveYearAvgRainAnnual = rainResp[0]['sum(precipitation)/5'];
              fiveYearAvgRainAnnual = parseFloat(fiveYearAvgRainAnnual * 0.03937).toFixed(
                2,
              );
              dispatchRedux(updateAvgPrecipAnnual(fiveYearAvgRainAnnual));
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });
        });
    }
  }, [markersRedux]);

  // update region and userFieldRedux when component will unmount
  useEffect(() => () => {
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === regionShorthandRef.current)[0];
    dispatchRedux(updateRegion({
      regionId: selectedRegion.id,
      regionShorthand: selectedRegion.shorthand,
    }));
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
    <Grid container spacing={2}>
      <Grid container item md={3} xs={12} justifyContent="center">
        <Grid item>
          <Typography variant="h4">
            Field Location
          </Typography>
        </Grid>

        <Grid item>
          {councilLabelRedux === 'Midwest Cover Crop Council'
            ? (
              <Typography variant="body1">
                Please Select A County.
              </Typography>
            )
            : (
              <Typography variant="body1">
                Find your address or ZIP code using the search bar on the map and hit
                <Search fontSize="inherit" />
                to determine your location. If needed, adjust your USDA Plant Hardiness Zone in the dropdown.
              </Typography>
            )}
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
          {isAuthenticated && (
            <UserFieldList
              userFields={userFields}
              field={selectedUserField}
              setField={setSelectedUserField}
              setFieldDialogState={setFieldDialogState}
            />
          )}
        </Grid>
      </Grid>
      <Grid item md={9} xs={12}>
        <Container maxWidth="md">
          <Map
            setAddress={setSelectedToEditSite}
            setFeatures={setCurrentGeometry}
            onDraw={onDraw}
            initWidth="100%"
            initHeight="500px"
            initLat={getLatLng()[0]}
            initLon={getLatLng()[1]}
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

  );
};

export default LocationComponent;
