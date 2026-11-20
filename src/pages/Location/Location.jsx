/* eslint-disable no-console */
// /* eslint-disable */

/* eslint-disable no-alert */
/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import { Search } from '@mui/icons-material';
import { Box, Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAReduxMap } from 'shared-react-components/src';
import { updateLocation } from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { setMyCoverCropReset, setQueryString } from '../../reduxStore/sharedSlice';
import { resetSoilData } from '../../reduxStore/soilSlice';
import { historyState, setHistoryDialogState, updateField } from '../../reduxStore/userSlice';
import {
  updateAvgFrostDates,
  updateAvgPrecipAnnual,
  updateAvgPrecipCurrentMonth,
  updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';
import pirschAnalytics from '../../shared/analytics';
import { callCoverCropApi } from '../../shared/constants';
import { mapboxToken } from '../../shared/keys';
import { fetchSSURGOData, isSoilFarmable } from '../../shared/ssurgo';
import statesLatLongDict from '../../shared/stateslatlongdict';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import StateChangeAlertDialog from './StateChangeAlertDialog/StateChangeAlertDialog';

const Location = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const resetStatusRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset.status,
  );

  // useState vars
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [pendingLocation, setPendingLocation] = useState(null);
  const [pendingFeatures, setPendingFeatures] = useState(null);
  const [mapFeatures, setMapFeatures] = useState(userFieldRedux);
  // eslint-disable-next-line no-nested-ternary
  const [latLon, setLatLon] = useState(
    markersRedux
      ? markersRedux[0]
      : stateLabelRedux
        ? statesLatLongDict[stateLabelRedux]
        : [47, -122],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [mapKey, setMapKey] = useState(1);
  const [isFarmable, setIsFarmable] = useState(true);

  const NOT_FARMABLE_HTML =
    '<div style="color: red; font-weight: bold; margin-top: 8 px;">The selected land is not farmable</div>';

  const { enqueueSnackbar } = useSnackbar();

  // call back function that is passed to shared map to update local state variables
  const updateProperties = (properties) => {
    const newStateName = properties?.state?.STATE_NAME;
    // allow DC and MD locations interchangeable since DC uses MD data
    const isDcOrMd =
      (stateLabelRedux === 'District of Columbia' &&
        (newStateName === 'District of Columbia' || newStateName === 'Maryland')) ||
      (stateLabelRedux === 'Maryland' && newStateName === 'District of Columbia');
    if (newStateName && newStateName !== stateLabelRedux && !isDcOrMd) {
      // reset location if selected location is out of state
      setIsOpen(true);
      setLatLon(markersRedux ? markersRedux[0] : statesLatLongDict[stateLabelRedux]);
      setMapFeatures(userFieldRedux || []);
      setPendingFeatures(null);
      setMapKey((prev) => prev + 1);
      return;
    }

    setSelectedToEditSite(properties?.address);
    setLatLon([properties?.lat, properties?.lon]);

    const newFeatures = properties?.features;
    if (JSON.stringify(mapFeatures) === JSON.stringify(newFeatures)) return;

    // if user imported a history, this will prevent the user from changing the polygons
    if (historyStateRedux === historyState.imported) {
      setMapFeatures([...mapFeatures]);
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
      return;
    }

    // update redux state variable with new features
    setMapFeatures(newFeatures);

    if (selectedCropIdsRedux.length > 0) {
      setPendingFeatures(newFeatures);
    } else {
      dispatchRedux(updateField(newFeatures));
    }
  };

  // analytics
  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Location' } });
  }, []);

  const updateRegionRedux = (regionName) => {
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === regionName)[0];
    if (!selectedRegion?.id || !selectedRegion?.shorthand) {
      console.error('Unavailable region.');
      return;
    }
    localStorage.setItem('regionId', selectedRegion.id);
    dispatchRedux(
      updateRegion({
        regionId: selectedRegion.id,
        regionShorthand: selectedRegion.shorthand,
      }),
    );
    dispatchRedux(setQueryString(`regions=${selectedRegion.id}`));
    pirschAnalytics('Location', { meta: { mapUpdate: true } });
  };

  const applyLocation = (loc) => {
    dispatchRedux(
      updateLocation({
        address: loc.address,
        markers: [[loc.latitude, loc.longitude]],
        county: loc.county,
      }),
    );
    dispatchRedux(resetSoilData());
    if (pendingFeatures) {
      dispatchRedux(updateField(pendingFeatures));
      setPendingFeatures(null);
    }
    enqueueSnackbar('Your location has been saved.');
  };

  // handle reset crop dialog
  useEffect(() => {
    if (!pendingLocation || resetStatusRedux === null) return;

    if (resetStatusRedux === true) {
      applyLocation(pendingLocation);
      if (pendingLocation.query) {
        dispatchRedux(setQueryString(pendingLocation.query));
      }
      if (pendingLocation.zone) {
        updateRegionRedux(pendingLocation.zone);
      }
    } else if (resetStatusRedux === false) {
      if (markersRedux) setLatLon(markersRedux[0]);
      setMapFeatures(userFieldRedux || []);
      setMapKey((prev) => prev + 1);
    }
    setPendingLocation(null);
    setPendingFeatures(null);
    dispatchRedux(setMyCoverCropReset(false, false, null));
  }, [resetStatusRedux, pendingLocation, pendingFeatures]);

  // Fetches ssurgo data and checks if the soil composition is farmable
  const getSSURGOData = (lat, lon) => {
    fetchSSURGOData(lat, lon, ['mapunit'])
      .then((result) => {
        const farmable = isSoilFarmable(result);
        setIsFarmable(farmable);
      })
      .catch((error) => console.error('SSURGO API FETCH ERROR', error));
  };

  // when map marker changes, set addressRedux, update regionRedux based on zipcode
  // biome-ignore lint/correctness/useExhaustiveDependencies: <updateRegionRedux changes on every re-render and should not be used as a hook dependency.>
  useEffect(() => {
    if (Object.keys(selectedToEditSite).length > 0) {
      const {
        latitude,
        longitude,
        address,
        // zipCode,
        county,
      } = selectedToEditSite;

      if (markersRedux && latitude === markersRedux[0][0] && longitude === markersRedux[0][1])
        return;

      // if user imported a history, this will prevent the user from changing the marker location
      if (historyStateRedux === historyState.imported) {
        dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
        setLatLon(markersRedux[0]);
        return;
      }

      if (councilShorthandRedux === 'WCCC') {
        callCoverCropApi(
          `https://${apiBaseUrlRedux}.covercrop-selector.org/v3/regions?lat=${latitude}&lon=${longitude}`,
        )
          .then((data) => {
            const query = data.data
              .filter((i) => i?.id !== null && i?.id !== undefined)
              .map((i) => `regions=${i.id}`)
              .join('&');
            // if selected crops exist and query string changed, show reset dialog
            if (selectedCropIdsRedux.length > 0 && queryStringRedux && query !== queryStringRedux) {
              setPendingLocation({ address, latitude, longitude, county, query });
              dispatchRedux(setMyCoverCropReset(true, true));
              return;
            }
            applyLocation({ address, latitude, longitude, county });
            dispatchRedux(setQueryString(query));
          })
          .catch((err) => {
            enqueueSnackbar('No data available for your location, Please try again.');
            if (markersRedux) setLatLon(markersRedux[0]);
            console.error(err);
          });
        return;
      }

      if (councilShorthandRedux === 'MCCC') {
        applyLocation({ address, latitude, longitude, county });
        // if council is MCCC, change selectedRegion based on county
        if (county?.includes(' County')) {
          updateRegionRedux(county.replace(' County', ''));
        }
        return;
      }

      // NECCC & SCCC
      callCoverCropApi(
        `https://weather.covercrop-data.org/hardinesszone?lat=${latitude}&lon=${longitude}&email=selector@psa.org`,
      )
        .then((response) => {
          let { zone } = response;

          zone = zone.slice(0, -1);
          let selectedRegion = regionsRedux.filter((region) => region.shorthand === zone)[0];

          // if zone is not found, use closest zone (+1 or -1) instead
          if (!selectedRegion) {
            const zoneNum = parseInt(zone, 10);
            selectedRegion = regionsRedux?.find(
              (region) =>
                region.shorthand === `${zoneNum - 1}` || region.shorthand === `${zoneNum + 1}`,
            );
            zone = selectedRegion?.shorthand;
          }
          // if selected crops exist and PHZ changed, show reset dialog
          if (
            selectedCropIdsRedux.length > 0 &&
            regionIdRedux &&
            selectedRegion?.id &&
            selectedRegion.id !== regionIdRedux
          ) {
            setPendingLocation({ address, latitude, longitude, county, zone });
            dispatchRedux(setMyCoverCropReset(true, true));
            return;
          }

          applyLocation({ address, latitude, longitude, county });
          updateRegionRedux(zone);
        })
        .catch((err) => {
          enqueueSnackbar('No data available for your location, Please try again.');
          localStorage.setItem('regionId', '');
          dispatchRedux(
            updateRegion({
              regionId: '',
              regionShorthand: '',
            }),
          );
          // eslint-disable-next-line no-console
          console.log(err);
          // for places where api didn't work, set region to default.
        });
    }
  }, [selectedToEditSite]);

  // call cover crop api based on marker change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <getSSURGOData changes on every re-render and should not be used as a hook dependency.>
  useEffect(() => {
    const getDetails = async () => {
      const weatherApiURL = 'https://weather.covercrop-data.org';
      const [lat, lon] = markersRedux[0];

      if (progressRedux >= 1 && markersRedux.length > 0) {
        const currentMonthInt = moment().month() + 1;
        const currentYear = moment().year();

        const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}&email=selector@psa.org`;
        const averageRainUrl = `${weatherApiURL}/hourly?lat=${lat}&lon=${lon}&start=${currentYear - 5}-01-01&end=${currentYear - 1}-12-31&email=selector@psa.org`;
        const averageRainForAMonthURL = `${averageRainUrl}&where=month=${currentMonthInt}&stats=sum(precipitation)/(5*25.4)&output=json`;
        const yearlyPrecipitationURL = `${weatherApiURL}/yearlyprecipitation?lat=${lat}&lon=${lon}`;

        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

        // call the frost url and then set frostFreeDays, averageFrostObject in store
        try {
          const frostResponse = await callCoverCropApi(frostUrl);
          const firstFrost = new Date(frostResponse.firstfrost);
          const lastFrost = new Date(frostResponse.lastfrost);
          const frostFreeDays = Math.round(
            Math.abs((firstFrost.valueOf() - lastFrost.valueOf()) / oneDay),
          );
          dispatchRedux(updateFrostFreeDays(frostFreeDays));
          dispatchRedux(
            updateAvgFrostDates({
              firstFrostDate: {
                month: firstFrost.toLocaleString('en-US', { month: 'long' }),
                day: firstFrost.getDate().toString(),
              },
              lastFrostDate: {
                month: lastFrost.toLocaleString('en-US', { month: 'long' }),
                day: lastFrost.getDate().toString(),
              },
            }),
          );
        } catch (error) {
          // eslint-disable-next-line
          console.log(
            `Weather API error code: ${error?.response?.status} for getting frost dates.`,
          );
        }

        // call the frost url and then set averagePrecipitationForCurrentMonth in store
        // TODO annual and monthly are the same
        try {
          const rainForAMonthResponse = await callCoverCropApi(averageRainForAMonthURL);
          let averagePrecipitationForCurrentMonth =
            rainForAMonthResponse[0]['sum(precipitation)/(5*25.4)'];
          averagePrecipitationForCurrentMonth = parseFloat(
            averagePrecipitationForCurrentMonth,
          ).toFixed(2);

          dispatchRedux(updateAvgPrecipCurrentMonth(averagePrecipitationForCurrentMonth));
        } catch (error) {
          console.log(
            `Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`,
          );
          dispatchRedux(updateAvgPrecipCurrentMonth(null));
        }

        // call the yearly precipitation API and then set annual precipitation in store
        try {
          const yearlyPrecipitationResponse = await callCoverCropApi(yearlyPrecipitationURL);
          let annualPrecipitation = yearlyPrecipitationResponse.rain;
          annualPrecipitation = parseFloat(annualPrecipitation).toFixed(2);
          dispatchRedux(updateAvgPrecipAnnual(annualPrecipitation));
        } catch (error) {
          console.log(
            `Weather API error code: ${error?.response?.status} for getting 15 year average annual rainfall`,
          );
          dispatchRedux(updateAvgPrecipAnnual(null));
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

    // If WCCC, check is the land is farmable
    if (councilShorthandRedux === 'WCCC' && markersRedux) {
      getSSURGOData(markersRedux[0][0], markersRedux[0][1]);
    }
  }, [markersRedux]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 1,
      }}
    >
      <Grid container>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size={12}
        >
          <Typography variant="h4" data-test="field-location-title">
            Field Location
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size={12}
        >
          <Typography variant="body1">
            Enter your address or ZIP code using the search bar on the map and hit
            <Search fontSize="inherit" />
            to determine your location.
            {councilShorthandRedux !== 'WCCC' && (
              <>
                If needed, adjust your{' '}
                {councilShorthandRedux === 'MCCC' ? 'county' : 'USDA Plant Hardiness Zone'} in the
                dropdown.
              </>
            )}
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size={12}
        >
          {councilShorthandRedux !== 'WCCC' && <PlantHardinessZone from="Location" />}
        </Grid>

        {stateLabelRedux !== 'Ontario' && (
          <Box sx={{ width: '100%' }}>
            <Container className="MapBox" maxWidth="md">
              <PSAReduxMap
                key={mapKey}
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
                hasSinglePolygon
                hasGeolocate
                hasFullScreen
                hasMarkerPopup
                hasMarkerMovable
                popupContent={!isFarmable ? NOT_FARMABLE_HTML : ''}
                hasHelp
                mapboxToken={mapboxToken}
              />
            </Container>
            <StateChangeAlertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Location;
