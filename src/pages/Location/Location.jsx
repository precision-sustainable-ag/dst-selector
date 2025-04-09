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
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import moment from 'moment';
import { PSAReduxMap } from 'shared-react-components/src';
import statesLatLongDict from '../../shared/stateslatlongdict';
import { abbrRegion, reverseGEO, callCoverCropApi } from '../../shared/constants';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import { updateLocation } from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { setQueryString, snackHandler } from '../../reduxStore/sharedSlice';
import {
  updateAvgFrostDates, updateAvgPrecipAnnual, updateAvgPrecipCurrentMonth, updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';
import { historyState, setHistoryDialogState, updateField } from '../../reduxStore/userSlice';
import pirschAnalytics from '../../shared/analytics';
import { mapboxToken } from '../../shared/keys';

const Location = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  // useState vars
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [mapFeatures, setMapFeatures] = useState(userFieldRedux);
  // eslint-disable-next-line no-nested-ternary
  const [latLon, setLatLon] = useState(markersRedux ? markersRedux[0] : stateLabelRedux ? statesLatLongDict[stateLabelRedux] : [47, -122]);

  const updateMapFeatures = (newFeatures) => {
    if (JSON.stringify(mapFeatures) === JSON.stringify(newFeatures)) return;

    // if user imported a history, this will prevent the user from changing the polygons
    if (historyStateRedux === historyState.imported) {
      setMapFeatures([...mapFeatures]);
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
      return;
    }

    // update redux state variable with new features
    setMapFeatures(newFeatures);
    dispatchRedux(updateField(newFeatures));
  };

  // call back function that is passed to shared map to update local state variables
  const updateProperties = (properties) => {
    setSelectedToEditSite(properties?.address);
    setLatLon([properties?.lat, properties?.lon]);
    updateMapFeatures(properties?.features);
  };

  useEffect(() => {
    // analytics
    pirschAnalytics('Visited Page', { meta: { visited: 'Location' } });
  }, []);

  const updateRegionRedux = (regionName) => {
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === regionName)[0];
    localStorage.setItem('regionId', selectedRegion.id);
    dispatchRedux(updateRegion({
      regionId: selectedRegion.id ?? '',
      regionShorthand: selectedRegion.shorthand ?? '',
    }));
    pirschAnalytics('Location', { meta: { mapUpdate: true } });
  };

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

      if (councilShorthandRedux === 'WCCC') {
        callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/regions?lat=${latitude}&lon=${longitude}`).then((data) => {
          const query = data.data.filter((i) => i?.id !== null && i?.id !== undefined).map((i) => `regions=${i.id}`).join('&');
          dispatchRedux(setQueryString(query));
        });
      }

      if (markersRedux && latitude === markersRedux[0][0] && longitude === markersRedux[0][1]) return;

      // if user imported a history, this will prevent the user from changing the marker location
      if (historyStateRedux === historyState.imported) {
        dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
        setLatLon(markersRedux[0]);
        return;
      }

      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
          county,
        },
      ));

      // no need to set region in WCCC(will work with queryStringRedux)
      if (councilShorthandRedux === 'WCCC') return;
      if (councilShorthandRedux === 'MCCC') {
        // if council is MCCC, change selectedRegion based on county
        if (county && county.includes(' County')) {
          updateRegionRedux(county.replace(' County', ''));
        }
      } else {
        callCoverCropApi(`https://weather.covercrop-data.org/hardinesszone?lat=${latitude}&lon=${longitude}&email=selector@psa.org`)
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
    const getDetails = async () => {
      const weatherApiURL = 'https://weather.covercrop-data.org';

      // update address on marker change
      // ref forecastComponent
      const lat = markersRedux[0][0];
      const lon = markersRedux[0][1];

      // since this updates with state; ideally, weather and soil info should be updated here
      // get current lat long and get county, state and city
      if (progressRedux >= 1 && markersRedux.length > 0) {
        const reverseGEOresult = await reverseGEO(lat, lon);
        if (reverseGEOresult?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text === undefined) return;
        const abbrState = abbrRegion(
          reverseGEOresult?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text,
          'abbr',
        ).toLowerCase();

        const city = reverseGEOresult?.features?.filter((feature) => feature?.place_type?.includes('place'))[0]?.text?.toLowerCase();

        const currentMonthInt = moment().month() + 1;

        // frost url
        const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}&email=selector@psa.org`;
        // What was the 5-year average rainfall for city st during the month of currentMonthInt?
        //  Dynamic dates ?
        const averageRainUrl = `${weatherApiURL}/hourly?location=${city} ${abbrState}&start=2015-01-01&end=2019-12-31&email=selector@psa.org`;
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
    if (historyStateRedux === historyState.imported) {
      // not load weather data if a history is already imported
      return;
    }
    // if user select another region, do not call weather api
    if (markersRedux) {
      getDetails();
    }
  }, [markersRedux]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" data-test="field-location-title">
            Field Location
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">
            Find your address or ZIP code using the search bar on the map and hit
            <Search fontSize="inherit" />
            to determine your location.
            {councilShorthandRedux !== 'WCCC' && (
            <>
              If needed, adjust your
              {' '}
              {councilShorthandRedux === 'MCCC' ? 'county' : 'USDA Plant Hardiness Zone'}
              {' '}
              in the dropdown.
            </>
            )}

          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {councilShorthandRedux !== 'WCCC' && <PlantHardinessZone from="Location" />}
        </Grid>

        {stateLabelRedux !== 'Ontario' && (
          <Grid container>
            <Container maxWidth="md">
              <PSAReduxMap
                setProperties={updateProperties}
                initWidth="100%"
                initHeight="450px"
                initLat={latLon[0]}
                initLon={latLon[1]}
                initFeatures={mapFeatures}
                initStartZoom={12}
                initMinZoom={4}
                initMaxZoom={18}
                hasSearchBar
                hasMarker
                hasNavigation
                hasCoordBar
                hasDrawing
                hasFreehand
                hasGeolocate
                hasFullScreen
                hasMarkerPopup
                hasMarkerMovable
                hasHelp
                mapboxToken={mapboxToken}
              />
            </Container>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Location;
