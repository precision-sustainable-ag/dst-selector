/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { Button } from '@mui/material';
import Axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { abbrRegion } from '../../shared/constants';
import zone4DataDictionary from '../../shared/json/zone4/data-dictionary.json';
import zone5DataDictionary from '../../shared/json/zone5/data-dictionary.json';
import zone6DataDictionary from '../../shared/json/zone6/data-dictionary.json';
import zone7DataDictionary from '../../shared/json/zone7/data-dictionary.json';
import { Context, cropDataFormatter } from '../../store/Store';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import Navbar from './Navbar/Navbar';

const Header = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [isRoot, setIsRoot] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isActive = {};

  const weatherApiURL = 'https://weather.aesl.ces.uga.edu';
  const getUSDAZone = async (zip) => fetch(`https://phzmapi.org/${zip}.json`);

  useEffect(() => {
    if (!state.zipCode) {
      return;
    }

    if (state.zipCode !== state.lastZipCode) {
      dispatch({
        type: 'LAST_ZIP_CODE',
        data: {
          value: state.zipCode,
        },
      });

      getUSDAZone(state.zipCode)
        .then((response) => {
          if (response.ok) {
            const dataJson = response.json();
            dataJson.then((data) => {
              // eslint-disable-next-line
              let zone = window.location.search.match(/zone=([^\^]+)/); // for automating Information Sheet PDFs

              zone = zone ? zone[1] : data.zone[0];

              if (zone <= 7 && zone >= 4) {
                dispatch({
                  type: 'UPDATE_ZONE',
                  data: {
                    zoneText: `Zone ${zone}`,
                    zone: parseInt(zone, 10),
                  },
                });
              } else {
                enqueueSnackbar(
                  `Error: Zones 8-11 do not occur in the Northeast US and so are not supported by this tool. 
                    If you wish to explore the data, we suggest loading Zone 7.`,
                  {
                    persist: true,
                    action: (
                      <Button
                        style={{ color: 'white' }}
                        onClick={() => {
                          closeSnackbar();
                        }}
                      >
                        Close
                      </Button>
                    ),
                  },
                );
              }
            });
          }
        });
    }
  }, [state.zipCode, state.lastZipCode, dispatch, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    const getAverageFrostDates = async (url) => {
      await Axios.get(url).then((resp) => {
        try {
          const totalYears = resp.data.length;
          // get last years value
          // TODO: Take all years data into account
          const mostRecentYearData = resp.data[totalYears - 1];

          const maxDate = mostRecentYearData['max(date)'];
          const minDate = mostRecentYearData['min(date)'];

          const averageFrostObject = {
            firstFrostDate: {
              month: moment(minDate).format('MMMM'),
              day: parseInt(moment(minDate).format('D'), 10),
            },
            lastFrostDate: {
              month: moment(maxDate).format('MMMM'),
              day: parseInt(moment(maxDate).format('D'), 10),
            },
          };
          dispatch({
            type: 'UPDATE_AVERAGE_FROST_DATES',
            data: {
              averageFrost: averageFrostObject,
            },
          });
        } catch (e) {
          // eslint-disable-next-line
          console.error('Average Frost Dates API::', e);
        }
      });
    };

    const { markers } = state;

    // update address on marker change
    // ref forecastComponent

    const lat = markers[0][0];
    const lon = markers[0][1];

    // since this updates with state; ideally, weather and soil info should be updated here

    // get current lat long and get county, state and city

    if (state.progress >= 2 && state.markers.length > 0) {
      const revAPIURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

      Axios.get(revAPIURL)
        .then(async (resp) => {
          const city = resp.data.locality.toLowerCase();
          const zipCode = resp.data.postcode;
          const abbrState = abbrRegion(resp.data.principalSubdivision, 'abbr').toLowerCase();

          if (resp.data.postcode) {
            dispatch({
              type: 'UPDATE_ZIP_CODE',
              data: {
                zipCode,
              },
            });
          }

          // call weather API to fetch details

          // Get: Frost Free Days
          // Dynamic Dates not set!
          const frostFreeDaysURL = `${weatherApiURL}/hourly?location=${city}%20${abbrState}&start=2015-01-01&end=2019-12-31
                                    &stats=count(date)/24/5&where=air_temperature%3e0&output=json`;
          const frostFreeDatesURL = `${weatherApiURL}/hourly?lat=${lat}&lon=${lon}&start=2014-07-01&end=2019-07-01
                                    &stats=min(date),max(date)&where=frost&group=growingyear&options=nomrms&output=json`;
          let frostFreeDays = 0;

          await Axios.get(frostFreeDaysURL)
            .then((frostResp) => {
              getAverageFrostDates(frostFreeDatesURL);
              const frostFreeDaysObject = frostResp.data[0];
              frostFreeDaysObject.keys().forEach((key) => {
                frostFreeDays = frostFreeDaysObject[key];
              });
              return { frostFreeDays, city, abbrState };
            })
            .then((obj) => {
              dispatch({
                type: 'UPDATE_FROST_FREE_DAYS',
                data: { frostFreeDays: obj.frostFreeDays },
              });

              return obj;
            })
            .then(async (obj) => {
              const currentMonthInt = moment().month() + 1;

              // What was the 5-year average rainfall for city st during the month of currentMonthInt?
              //  Dynamic dates ?
              const averageRainUrl = `${weatherApiURL}/hourly?location=${obj.city}%20${obj.state}&start=2015-01-01&end=2019-12-31`;
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
                    .then(() => {})
                    .catch((error) => {
                      dispatch({
                        type: 'SNACK',
                        data: {
                          snackOpen: true,
                          snackMessage: `Weather API error code: ${
                            error.response.status
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
            });
        })
        .then(() => {
          dispatch({
            type: 'SET_AJAX_IN_PROGRESS',
            data: false,
          });
        });
    }
    // check if isRoot

    if (window.location.pathname === '/species-selector') {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }
    // check value of progress state

    switch (state.progress) {
      case 0:
        isActive.val = 0;
        break;
      default:
        break;
    }
  }, [state.markers, sfilters.zone, state.weatherDataReset]);

  async function getCropData(formattedGoal, zone = 4) {
    await fetch(`https://api.covercrop-selector.org/crop-data?zoneId=${zone}`)
      .then((res) => res.json())
      .then((data) => {
        cropDataFormatter(data.data);
        dispatch({
          type: 'PULL_CROP_DATA',
          data: data.data,
        });
        dispatch({
          type: 'ADD_GOALS',
          data: formattedGoal,
        });
      })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (sfilters.zone === state.lastZone) {
      return;
    }

    state.lastZone = sfilters.zone; // TODO

    let z7Formattedgoal = zone7DataDictionary.filter(
      (data) => data.Category === 'Goals' && data.Variable !== 'Notes: Goals',
    );
    let z6Formattedgoal = zone6DataDictionary.filter(
      (data) => data.Category === 'Goals' && data.Variable !== 'Notes: Goals',
    );
    let z5Formattedgoal = zone5DataDictionary.filter(
      (data) => data.Category === 'Goals' && data.Variable !== 'Notes: Goals',
    );
    let z4Formattedgoal = zone4DataDictionary.filter(
      (data) => data.Category === 'Goals' && data.Variable !== 'Notes: Goals',
    );
    z7Formattedgoal = z7Formattedgoal.map((goal) => ({ fields: goal }));
    z6Formattedgoal = z6Formattedgoal.map((goal) => ({ fields: goal }));
    z5Formattedgoal = z5Formattedgoal.map((goal) => ({ fields: goal }));
    z4Formattedgoal = z4Formattedgoal.map((goal) => ({ fields: goal }));

    getCropData([], sfilters.zone);

    switch (parseInt(sfilters.zone, 10)) {
      case 7: {
        getCropData(z7Formattedgoal, 4);
        break;
      }
      case 6: {
        getCropData(z6Formattedgoal, 3);
        break;
      }
      case 5: {
        getCropData(z5Formattedgoal, 2);
        break;
      }
      case 4: {
        getCropData(z4Formattedgoal, 1);
        break;
      }
      default: {
        break;
      }
    }
  }, [
    sfilters.zone,
    state.zone4CropData,
    state.zone5CropData,
    state.zone6CropData,
    state.zone7CropData,
    dispatch,
  ]);

  const setmyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    if (window.location.pathname === '/species-selector') {
      if (state.progress > 4) {
        dispatch({
          type: 'ACTIVATE_MY_COVER_CROP_LIST_TILE',
          data: {
            myCoverCropActivationFlag: true,
            speciesSelectorActivationFlag: false,
          },
        });
      }
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    dispatch({
      type: 'ACTIVATE_SPECIES_SELECTOR_TILE',
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      },
    });
    if (window.location.pathname !== '/species-selector') {
      history.push('/species-selector');
    }
  };

  return (
    <header className="d-print-none">
      <div className="topHeader">
        <NavLink to="/about" activeClassName="active">
          ABOUT
        </NavLink>
        <span className="line" />
        <NavLink to="/help" activeClassName="active">
          HELP
        </NavLink>
        <span className="line" />
        <NavLink to="/feedback" activeClassName="active">
          FEEDBACK
        </NavLink>
      </div>

      <div className="container-fluid">
        <HeaderLogoInfo />
      </div>
      <div className="bottomHeader">
        <ToggleOptions
          isRoot={isRoot}
          setSpeciesSelectorActivationFlag={setSpeciesSelectorActivationFlag}
          setmyCoverCropActivationFlag={setmyCoverCropActivationFlag}
        />
      </div>

      {/* TODO: Is Navbar actually used? */}
      <Navbar
        isRoot={isRoot}
        setSpeciesSelectorActivationFlag={setSpeciesSelectorActivationFlag}
        setmyCoverCropActivationFlag={setmyCoverCropActivationFlag}
      />

      <InformationBar />

      {window.location.pathname === '/about'
      || window.location.pathname === '/help'
      || (window.location.pathname === '/feedback'
        && window.location.pathname !== '/cover-crop-explorer')
      || (state.progress < 0 && (
        <div className="topBar" />
      ))}
    </header>
  );
};

export default Header;
