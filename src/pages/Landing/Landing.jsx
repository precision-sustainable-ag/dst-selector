// /* eslint-disable */
/* eslint-disable no-alert */
/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import {
  Grid, Typography, Box, Button,
} from '@mui/material';
// import SelectUSState from 'react-select-us-states';
import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { PSADropdown, PSARegionSelectorMap } from 'shared-react-components/src';
import { callCoverCropApi } from '../../shared/constants';
import { updateRegion, updateRegions, updateStateInfo } from '../../reduxStore/mapSlice';
import { updateLocation } from '../../reduxStore/addressSlice';
import { historyState, setHistoryDialogState, updateField } from '../../reduxStore/userSlice';
import HistorySelect from '../../components/HistorySelect/HistorySelect';
import pirschAnalytics from '../../shared/analytics';
import { mapboxToken, testAuth0Env } from '../../shared/keys';
import statesLatLongDict from '../../shared/stateslatlongdict';
import { setQueryString } from '../../reduxStore/sharedSlice';
import useIsMobile from '../../hooks/useIsMobile';

const StateImageButton = ({
  sx, onClick, src, alt,
}) => (
  <Button
    variant="contained"
    sx={{
      border: '1px solid black',
      padding: 0,
      borderRadius: 0,
      boxSizing: 'border-box',
      ...sx,
    }}
    onClick={onClick}
    aria-label={alt}
    role="button"
  >
    <img
      src={src}
      alt={alt}
      width="100px"
      height="100px"
    />
  </Button>
);

const Landing = () => {
  const dispatchRedux = useDispatch();

  const isMobile = useIsMobile('sm');

  // redux vars
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  // useState vars
  // const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  // This is the state obj mapped by mapState(filtered from allStates, these 2 objs are not same)
  const [selectedState, setSelectedState] = useState({});
  // This is the obj map returns when you selected a state on map
  const [mapState, setMapState] = useState({});

  const { isAuthenticated } = useAuth0();

  const availableStates = useMemo(() => allStates.map((state) => state.label), [allStates]);

  const isDevEnvironment = testAuth0Env || /(localhost|dev)/i.test(window.location);

  // handler function for stateSelect list
  const handleStateChange = (e) => {
    const selState = allStates.filter((s) => s.shorthand === e.target.value);
    if (historyStateRedux === historyState.imported && stateIdRedux !== selState[0].id) {
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
    } else {
      setSelectedState(selState[0]);
    }
  };

  // Load map data based on current enviorment
  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then((stateData) => {
      const productionCouncils = ['NECCC', 'SCCC', 'MCCC'];
      const states = isDevEnvironment
        ? stateData.data
        : stateData.data.filter((state) => productionCouncils.includes(state.council.shorthand));
      setAllStates(states);
    });
  }, []);

  // set initial map state based on stateIdRedux
  // user history api/user click next and come back
  useEffect(() => {
    if (allStates.length) {
      const state = allStates.filter((s) => s.id === stateIdRedux);
      // handle stateIdRedux is null(click headerlogo in landing page)
      if (state.length > 0) {
        setSelectedState(state[0]);
        pirschAnalytics('Landing', { meta: { state: state[0].label } });
      } else setSelectedState({});
    }
  }, [stateIdRedux, allStates]);

  // handle map change, use mapState to filter allStates and get selectedState
  useEffect(() => {
    if (Object.keys(mapState).length !== 0) {
      const st = allStates.filter((s) => s.label === mapState.properties.STATE_NAME);
      if (st.length > 0) {
        setSelectedState(st[0]);
      }
    }
  }, [mapState]);

  // update state and regions redux based on state change(from dropdown or map)
  useEffect(() => {
    // is there a chance selectedState is {} ?
    if (Object.keys(selectedState).length !== 0) {
      if (historyStateRedux === historyState.imported && stateIdRedux !== selectedState.id) {
        dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
        // reset state to previous state in redux
        const state = allStates.filter((s) => s.id === stateIdRedux);
        if (state.length > 0) setSelectedState(state[0]);
        else setSelectedState({});
        // if historyState is imported, return and not set new history
        return;
      }
      // update state
      localStorage.setItem('stateId', selectedState.id);
      if (stateIdRedux !== selectedState.id) {
        dispatchRedux(updateStateInfo({
          stateLabel: selectedState.label,
          stateId: selectedState.id,
          councilShorthand: selectedState.council.shorthand,
          councilLabel: selectedState.council.label,
        }));
        dispatchRedux(updateLocation({ address: '', markers: null, county: null }));
        dispatchRedux(updateRegion({ regionId: null, regionShorthand: null }));
        dispatchRedux(updateField(null));
      }
      // set address for pipeline environment(when map is not available)
      if (testAuth0Env) {
        const [lat, lon] = statesLatLongDict[selectedState.label];
        dispatchRedux(updateLocation({ address: '', markers: [[lat, lon]], county: null }));
      }
      // set querystring for WCCC
      if (selectedState.council.shorthand === 'WCCC') {
        const [lat, lon] = statesLatLongDict[selectedState.label];
        callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/regions?lat=${lat}&lon=${lon}`).then((data) => {
          const query = data.data.filter((i) => i?.id !== null && i?.id !== undefined).map((i) => `regions=${i.id}`).join('&');
          dispatchRedux(setQueryString(query));
        });
      }
      const { id } = selectedState;
      if (selectedState.council.shorthand !== 'WCCC') {
        fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${id}/regions`)
          .then((res) => res.json())
          .then((data) => {
            let fetchedRegions;
            if (data.data.Counties) {
              fetchedRegions = data.data.Counties;
            } else {
              fetchedRegions = data.data.Zones;
            }

            dispatchRedux(updateRegions(fetchedRegions));

            // if the state is imported from redux(stateId already existed and is equal to selectedState.id)
            // , skip set default since there already exist region selection
            if (stateIdRedux !== selectedState.id) {
              // set default region for Selector and Explorer
              if (!fetchedRegions[0]?.id || !fetchedRegions[0]?.shorthand) throw new Error('Unavailable region.');
              localStorage.setItem('regionId', fetchedRegions[0].id);
              dispatchRedux(updateRegion({
                regionId: fetchedRegions[0].id,
                regionShorthand: fetchedRegions[0].shorthand,
              }));
            }
            // set querystring for non WCCC states
            dispatchRedux(setQueryString(`regions=${fetchedRegions[0].id}`));
          })
          .catch((err) => {
          // eslint-disable-next-line no-console
            console.log(err.message);
          });
      }
    }
  }, [selectedState]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Landing' } });
  }, []);

  const [containerHeight, setContainerHeight] = useState();

  useEffect(() => {
    function updateSize() {
      const documentHeight = document
        .getElementsByTagName('html')[0]
        .getBoundingClientRect().height;

      const headerHeight = document
        .getElementsByTagName('header')[0]
        .getBoundingClientRect().height;

      const navHeight = document
        .getElementsByTagName('nav')[0]
        .getBoundingClientRect().height;

      const footerHeight = document
        .getElementsByClassName('primaryFooter')[0]
        .getBoundingClientRect().height;

      const contHeight = documentHeight - (headerHeight + footerHeight + navHeight);
      document.getElementById('landingWrapper').style.minHeight = `${contHeight}px`;
      setContainerHeight(contHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const backgroundSyles = {
    frostedGlassEffect: {
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      position: 'relative',
      width: '100%',

      left: '50%',
      transform: 'translateX(-50%)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        marginTop: '5px',
      },
      sx: {
        '.MuiMenuItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: 'rgba(176, 236, 130, 0.3)',
            color: 'black',
          },
        },
      },
    },
  };

  return (
    <Box
      style={{
        background: 'url(/images/cover-crop-field.png)',
        backgroundSize: 'cover',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: containerHeight,
        // height: '100vh',
      }}
      id="landingWrapper"
      margin={-1}
    >
      <Grid
        style={backgroundSyles.frostedGlassEffect}
        mt={1}
        sx={{ maxWidth: '800px' }}
      >
        <Box mr={1} ml={1} mb={1} mt={1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom align="center">
                Welcome to the Cover Crop Species Selector
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Choose your state from the dropdown or the map. You can zoom by scrolling or pinching on mobile.
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <PSADropdown
                label="STATE"
                items={allStates.map((state) => ({ value: state.shorthand, label: state.label?.toUpperCase() }))}
                formSx={{ minWidth: 120 }}
                inputSx={{
                  color: '#598445',
                  '&.Mui-focused': {
                    color: '#598445',
                    fontWeight: 'medium',
                  },
                }}
                SelectProps={{
                  value: selectedState?.shorthand || '',
                  onChange: handleStateChange,
                  variant: 'outlined',
                  MenuProps: menuProps,
                  style: { minWidth: 100 },
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445',
                      borderWidth: '1px',
                      borderRadius: '4px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445',
                      borderWidth: '2px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445',
                      borderWidth: '2.5px',
                    },
                  },
                  error: false,
                  'data-test': 'state-selector-dropdown',
                }}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography>
                {isAuthenticated
                  ? 'Try out our new user history feature below:'
                  : 'Log in to try out our new user history feature!'}
              </Typography>
            </Grid>
            {isAuthenticated
              && (
                <Grid item xs={12}>
                  <HistorySelect />
                </Grid>
              )}
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '15px',
            marginBottom: isMobile ? '120px' : '15px',
          }}
          sx={{ maxWidth: '800px' }}
        >
          <PSARegionSelectorMap
            selectorFunction={setMapState}
            selectedState={selectedState.label}
            availableStates={availableStates}
            initWidth="100%"
            initHeight="350px"
            initLon={-90}
            initLat={41}
            initStartZoom={2.5}
            data-test="state-map"
            mapboxToken={mapboxToken}
            key="1"
          />
          {isDevEnvironment
          && (
            <>
              <StateImageButton
                sx={{
                  position: 'absolute',
                  bottom: isMobile ? '-110px' : '140px',
                  left: '10px',
                  ...(selectedState.label === 'Alaska' ? { border: '2px solid', borderColor: 'primary.main' } : {}),
                }}
                onClick={() => {
                  const alaska = allStates.filter((s) => s.label === 'Alaska')[0];
                  setSelectedState(alaska);
                }}
                src={selectedState.label === 'Alaska' ? '/images/alaska-selected.jpg' : '/images/alaska.jpg'}
                alt="select Alaska"
              />
              <StateImageButton
                sx={{
                  position: 'absolute',
                  bottom: isMobile ? '-110px' : '30px',
                  left: isMobile ? '120px' : '10px',
                  ...(selectedState.label === 'Hawaii' ? { border: '2px solid', borderColor: 'primary.main' } : {}),
                }}
                onClick={() => {
                  const hawaii = allStates.filter((s) => s.label === 'Hawaii')[0];
                  setSelectedState(hawaii);
                }}
                src={selectedState.label === 'Hawaii' ? '/images/hawaii-selected.jpg' : '/images/hawaii.jpg'}
                alt="select Hawaii"
              />
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default Landing;
