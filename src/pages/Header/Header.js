/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import Axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { abbrRegion } from '../../shared/constants';
import { Context, cropDataFormatter } from '../../store/Store';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import Navbar from './Navbar/Navbar';

const Header = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(Context);
  const [isRoot, setIsRoot] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isActive = {};

  const weatherApiURL = 'https://weather.covercrop-data.org';
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
              // let zone = window.location.search.match(/zone=([^\^]+)/); // for automating Information Sheet PDFs
              const { zone } = data;
              let match = false;

              if (state.regions?.length > 0) {
                state.regions.forEach((region) => {
                  if (region.shorthand === zone) {
                    match = true;
                  }
                });
              }

              dispatch({
                type: 'UPDATE_ZONE',
                data: {
                  zoneText: state.councilShorthand === 'NECCC' || !match ? `Zone ${zone.slice(0, -1)}` : `Zone ${zone}`,
                  zone: (state.councilShorthand === 'NECCC') || !match ? zone.slice(0, -1) : zone,
                  zoneId: zone,
                },
              });
            });
          }
        });
    }
  }, [state.zipCode, state.lastZipCode, dispatch, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    const { markers } = state;

    // update address on marker change
    // ref forecastComponent
    const lat = markers[0][0];
    const lon = markers[0][1];

    // since this updates with state; ideally, weather and soil info should be updated here
    // get current lat long and get county, state and city
    if (state.progress >= 1 && state.markers.length > 0) {
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
    // check if isRoot

    if (window.location.pathname === '/explorer') {
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
  }, [state.markers, state.weatherDataReset]);

  const loadDictData = (data) => {
    dispatch({
      type: 'PULL_DICTIONARY_DATA',
      data,
    });
  };

  async function getCropData(formattedGoal) {
    const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.zoneId)}`;
    await fetch(`https://developapi.covercrop-selector.org/v1/states/${state.stateId}/crops?${query}`)
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

  async function getDictData() {
    const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.zoneId)}`;
    await fetch(`https://developapi.covercrop-selector.org/v1/states/${state.stateId}/dictionary?${query}`)
      .then((res) => res.json())
      .then((data) => {
        loadDictData(data.data);
        return data.data.filter(
          (d) => d.label === 'Goals',
        );
      })
      .then((data) => data[0].attributes.filter(
        (d) => d.label !== 'Notes: Goals',
      ))
      // .then((data) => data.map((goal) => ({ fields: goal })))
      .then((data) => getCropData(data))
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    // if (state.zone === state.lastZone) {
    //   return;
    // }
    if (state.regionId && state.stateId) {
      getDictData();
      getCropData([]);
    }
    state.lastZone = state.zone; // TODO
  }, [state.stateId, state.zone, state.regionId]);

  const setmyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    if (window.location.pathname === '/explorer') {
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
    if (window.location.pathname !== '/explorer') {
      history.push('/explorer');
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
        <HeaderLogoInfo logo />
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
