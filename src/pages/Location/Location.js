/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import '../../styles/location.scss';
import {
  Typography,
} from '@mui/material';
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import moment from 'moment';
import { Map } from '@psa/dst.ui.map';
// import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
import statesLatLongDict from '../../shared/stateslatlongdict';
import {
  abbrRegion, reverseGEO, callCoverCropApi,
} from '../../shared/constants';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import {
  changeAddressViaMap, updateLocation,
} from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { snackHandler } from '../../reduxStore/sharedSlice';
import {
  updateAvgFrostDates, updateAvgPrecipAnnual, updateAvgPrecipCurrentMonth, updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const LocationComponent = () => {
  const dispatchRedux = useDispatch();
  const [selectedZone, setselectedZone] = useState();
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [locZipCode, setLocZipCode] = useState();
  const countyRedux = useSelector((stateRedux) => stateRedux.addressData.county);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);

  const getLatLng = useCallback(() => {
    if (stateLabelRedux) {
      return [statesLatLongDict[stateLabelRedux][0], statesLatLongDict[stateLabelRedux][1]];
    }
    return [47, -122];
  }, [stateLabelRedux]);

  useEffect(() => {
    if (selectedCropsRedux.length > 0) {
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, myCoverCropListLocationRedux]);

  const updateReg = (region) => {
    if (region !== undefined) {
      dispatchRedux(updateRegion({
        regionId: region.id ?? '',
        regionLabel: region.label ?? '',
        regionShorthand: region.shorthand ?? '',
      }));
    }
  };

  useEffect(() => {
    updateReg(regionsRedux[0]);
  }, [regionsRedux]);

  const handleMapChange = () => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = regionsRedux.filter((region) => region.shorthand == selectedZone);

    updateReg(regionInfo[0]);
  };

  useEffect(() => {
    if (councilLabelRedux !== 'Midwest Cover Crop Council') {
      setselectedZone(zoneRedux);
    } else {
      setselectedZone(countyRedux?.replace(' County', ''));
    }
  }, [zoneRedux, countyRedux]);

  useEffect(() => {
    const {
      latitude,
      longitude,
      address,
      zipCode,
      county,
    } = selectedToEditSite;

    if (latitude === markersRedux[0][0] && longitude === markersRedux[0][1]) { return; }

    if (Object.keys(selectedToEditSite).length > 0) {
      setLocZipCode(zipCode);
      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
        },
      ));
      dispatchRedux(snackHandler({
        snackOpen: true,
        snackMessage: 'Your location has been saved.',
      }));

      if (selectedToEditSite.address) {
        dispatchRedux(changeAddressViaMap(
          {
            address,
            county,
          },
        ));
      }
      if (selectedZone) {
        handleMapChange();
      }
    }
  }, [selectedToEditSite]);

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

  useEffect(() => {
    if (!locZipCode) {
      return;
    }

    callCoverCropApi(`https://phzmapi.org/${locZipCode}.json`)
      .then((response) => {
        let { zone } = response;

        let regionId = null;

        if (zone !== '8a' && zone !== '8b') {
          zone = zone.slice(0, -1);
        }

        if (regionsRedux?.length > 0) {
          regionsRedux.forEach((region) => {
            if (region.shorthand === zone) {
              regionId = region.id;
            }
          });
        }
        if (councilShorthandRedux !== 'MCCC') {
          dispatchRedux(updateRegion({
            regionId: regionId ?? '',
            regionShorthand: zone ?? '',
          }));
        }
      });
  }, [locZipCode]);

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow mx-0 px-0 mx-lg-3 px-lg-3" style={{ minHeight: '520px' }}>
        <div className="col-xl-4 col-sm-12">
          <div className="container-fluid">
            <Typography variant="h4" align="left">
              Where is your field located?
            </Typography>
            {councilLabelRedux === 'Midwest Cover Crop Council'
              ? (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Please Select A County.
                </Typography>
              )
              : (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Find your address or ZIP code using the search bar on the map and hit
                  <Search fontSize="inherit" />
                  to determine your location. If needed, adjust your USDA Plant Hardiness Zone in the dropdown.
                </Typography>
              )}
            <div className="row py-3 my-4 ">
              <div className="col-md-5 col-lg-6 col-sm-12 col-12">
                <PlantHardinessZone updateReg={updateReg} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-sm-12">
          <div className="container-fluid">
            <Map
              setAddress={setSelectedToEditSite}
              initWidth="100%"
              initHeight="600px"
              initLat={getLatLng()[0]}
              initLon={getLatLng()[1]}
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
          </div>
        </div>
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} from="selector" />
    </div>
  );
};

export default LocationComponent;
