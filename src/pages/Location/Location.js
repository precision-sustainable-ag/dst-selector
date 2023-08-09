/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import '../../styles/location.scss';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import Axios from 'axios';
import moment from 'moment';
import { Map } from '@psa/dst.ui.map';
// import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
import statesLatLongDict from '../../shared/stateslatlongdict';
import { abbrRegion, reverseGEO, BinaryButton } from '../../shared/constants';
import { Context } from '../../store/Store';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import {
  changeAddressViaMap, updateLocation, updateZone as updateZoneRedux, updateZipCode,
} from '../../reduxStore/addressSlice';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const LocationComponent = ({
  closeExpansionPanel,
}) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const [selectedZone, setselectedZone] = useState();
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  // const [selectedRegion, setSelectedRegion] = useState({});
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];
  const countyRedux = useSelector((stateRedux) => stateRedux.addressData.county);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);

  const getLatLng = useCallback(() => {
    if (state.state) {
      return [statesLatLongDict[state.state][0], statesLatLongDict[state.state][1]];
    }
    return [47, -122];
  }, [state]);

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && state.selectedCrops.length > 0) {
      setHandleConfirm(true);
    }
  }, [state.selectedCrops, state.myCoverCropListLocation]);

  const updateZone = (region) => {
    if (region !== undefined) {
      // setSelectedRegion(region);
      dispatchRedux(updateZoneRedux(
        {
          zoneText: region.label,
          zone: region.shorthand,
          zoneId: region.id,
        },
      ));
      // dispatch({
      //   type: 'UPDATE_ZONE',
      //   data: {
      //     zoneText: region.label,
      //     zone: region.shorthand,
      //     zoneId: region.id,
      //   },
      // });
      dispatch({
        type: 'UPDATE_REGION',
        data: {
          regionId: region.id ?? '',
          regionLabel: region.label ?? '',
          regionShorthand: region.shorthand ?? '',
        },
      });
    }
  };

  useEffect(() => {
    updateZone(state.regions[0]);
  }, [state.regions]);

  const handleConfirmationChoice = (choice) => {
    if (choice !== null) {
      if (choice) {
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: [],
          },
        });
      } else {
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: state.selectedCrops,
          },
        });
      }
      closeExpansionPanel();
    }
    setShowRestartPrompt(false);
  };

  const handleMapChange = () => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = state.regions.filter((region) => region.shorthand == selectedZone);

    updateZone(regionInfo[0]);
  };

  useEffect(() => {
    if (state.councilLabel !== 'Midwest Cover Crop Council') {
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
      fullAddress,
      zipCode,
      county,
    } = selectedToEditSite;

    if (Object.keys(selectedToEditSite).length > 0) {
      // dispatch({
      //   type: 'UPDATE_LOCATION',
      //   data: {
      //     address,
      //     markers: [[latitude, longitude]],
      //     zipCode,
      //   },
      // });
      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
          zipCode,
        },
      ));

      dispatch({
        type: 'SNACK',
        data: {
          snackOpen: true,
          snackMessage: 'Your location has been saved.',
        },
      });

      if (selectedToEditSite.address) {
        dispatchRedux(changeAddressViaMap(
          {
            address,
            fullAddress,
            zipCode,
            county,
            addressVerified: true,
          },
        ));
        // dispatch({
        //   type: 'CHANGE_ADDRESS_VIA_MAP',
        //   data: {
        //     address,
        //     fullAddress,
        //     zipCode,
        //     county,
        //     addressVerified: true,
        //   },
        // });
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
    if (state.progress >= 1 && markersRedux.length > 0) {
      reverseGEO(lat, lon)
        .then(async (resp) => {
          const abbrState = abbrRegion(
            resp?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text,
            'abbr',
          ).toLowerCase();

          const city = resp?.features?.filter((feature) => feature?.place_type?.includes('place'))[0]?.text?.toLowerCase();
          const zip = resp?.features?.filter((feature) => feature?.place_type?.includes('postcode'))[0]?.text;

          if (zip) {
            dispatchRedux(updateZipCode(zip));
          }

          const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}`;
          await Axios.get(frostUrl)
            .then(((frostResp) => {
              // added "/" and do %100 to get them into correct format (want frost dates to look like 01/01/23)
              const currYear = `/${(new Date().getFullYear() % 100).toString()}`;
              const prevYear = `/${((new Date().getFullYear() % 100) - 1).toString()}`;
              const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
              const firstFrost = new Date(frostResp.data.firstfrost + prevYear);
              const lastFrost = new Date(frostResp.data.lastfrost + currYear);

              const frostFreeDaysObj = Math.round(Math.abs((firstFrost.valueOf() - lastFrost.valueOf()) / oneDay));
              const averageFrostObject = {
                firstFrostDate: {
                  month: firstFrost.toLocaleString('en-US', { month: 'long' }),
                  day: firstFrost.getDate().toString(),
                },
                lastFrostDate: {
                  month: lastFrost.toLocaleString('en-US', { month: 'long' }),
                  day: lastFrost.getDate().toString(),
                },
              };

              return {
                frostFreeDaysObj, city, abbrState, averageFrostObject,
              };
            }))
            .then((obj) => {
              dispatch({
                type: 'UPDATE_FROST_FREE_DAYS',
                data: { frostFreeDays: obj.frostFreeDaysObj },
              });
              dispatch({
                type: 'UPDATE_AVERAGE_FROST_DATES',
                data: {
                  averageFrost: obj.averageFrostObject,
                },
              });
              return obj;
            })
            .then(async (obj) => {
              const currentMonthInt = moment().month() + 1;

              // What was the 5-year average rainfall for city st during the month of currentMonthInt?
              //  Dynamic dates ?
              const averageRainUrl = `${weatherApiURL}/hourly?location=${obj.city}%20${obj.abbrState}&start=2015-01-01&end=2019-12-31`;
              const averageRainForAMonthURL = `${averageRainUrl}&stats=sum(precipitation)/5&where=month=${currentMonthInt}&output=json`;
              // What was the 5-year average annual rainfall for city st?
              const fiveYearAvgRainURL = `${averageRainUrl}&stats=sum(precipitation)/5&output=json`;
              if (!abbrState.ajaxInProgress) {
                dispatch({
                  type: 'SET_AJAX_IN_PROGRESS',
                  data: true,
                });
                await Axios.get(averageRainForAMonthURL)
                  .then((rainResp) => {
                    let averagePrecipitationForCurrentMonth = rainResp.data[0]['sum(precipitation)/5'];
                    averagePrecipitationForCurrentMonth = parseFloat(
                      averagePrecipitationForCurrentMonth,
                    ).toFixed(2);
                    averagePrecipitationForCurrentMonth = parseFloat(
                      averagePrecipitationForCurrentMonth * 0.03937,
                    ).toFixed(2);
                    dispatch({
                      type: 'UPDATE_AVERAGE_PRECIP_CURRENT_MONTH',
                      data: { thisMonth: averagePrecipitationForCurrentMonth },
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      type: 'SNACK',
                      data: {
                        snackOpen: true,
                        snackMessage: `Weather API error code: ${error.response.status} for getting 5 year average rainfall for this month`,
                      },
                    });
                  });

                if (!abbrState.ajaxInProgress) {
                  dispatch({
                    type: 'SET_AJAX_IN_PROGRESS',
                    data: true,
                  });
                  await Axios.get(fiveYearAvgRainURL)
                    .then((rainResp) => {
                      let fiveYearAvgRainAnnual = rainResp.data[0]['sum(precipitation)/5'];
                      fiveYearAvgRainAnnual = parseFloat(fiveYearAvgRainAnnual).toFixed(2);
                      fiveYearAvgRainAnnual = parseFloat(fiveYearAvgRainAnnual * 0.03937).toFixed(
                        2,
                      );
                      dispatch({
                        type: 'UPDATE_AVERAGE_PRECIP_ANNUAL',
                        data: { annual: fiveYearAvgRainAnnual },
                      });
                      dispatch({
                        type: 'SET_AJAX_IN_PROGRESS',
                        data: false,
                      });
                    })
                    .then(() => { })
                    .catch((error) => {
                      dispatch({
                        type: 'SNACK',
                        data: {
                          snackOpen: true,
                          snackMessage: `Weather API error code: ${error.response.status
                          } for getting 5 year average rainfall for ${obj.city.toUpperCase()}, ${obj.state.toUpperCase()}`,
                        },
                      });
                      dispatch({
                        type: 'SET_AJAX_IN_PROGRESS',
                        data: false,
                      });
                    });
                }
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.error(`Failed to fetch frost data: ${err}`);
            });
        })
        .then(() => {
          dispatch({
            type: 'SET_AJAX_IN_PROGRESS',
            data: false,
          });
        });
    }
  }, [markersRedux]);

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow mx-0 px-0 mx-lg-3 px-lg-3" style={{ minHeight: '520px' }}>
        <div className="col-xl-4 col-sm-12">
          <div className="container-fluid">
            <Typography variant="h4" align="left">
              Where is your field located?
            </Typography>
            {state.councilLabel === 'Midwest Cover Crop Council'
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
                <PlantHardinessZone updateZone={updateZone} />
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
      <Dialog disableEscapeKeyDown open={showRestartPrompt}>
        <DialogContent dividers>
          <Typography variant="body1">
            This will trigger a restart. Would you also like to clear My Cover Crop List?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton action={handleConfirmationChoice} />
        </DialogActions>
      </Dialog>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} from="selector" />
    </div>
  );
};

export default LocationComponent;
