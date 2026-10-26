/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography } from '@mui/material';
// import SelectUSState from 'react-select-us-states';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSADropdown, PSARegionSelectorMap } from 'shared-react-components/src';
import HistorySelect from '../../components/HistorySelect/HistorySelect';
import useIsMobile from '../../hooks/useIsMobile';
import { updateLocation } from '../../reduxStore/addressSlice';
import { updateRegion, updateRegions, updateStateInfo } from '../../reduxStore/mapSlice';
import { setMyCoverCropReset, setQueryString } from '../../reduxStore/sharedSlice';
import { historyState, setHistoryDialogState, updateField } from '../../reduxStore/userSlice';
import pirschAnalytics from '../../shared/analytics';
import { callCoverCropApi } from '../../shared/constants';
import { mapboxToken, testAuth0Env } from '../../shared/keys';
import statesLatLongDict from '../../shared/stateslatlongdict';

const StateImageButton = ({ sx, onClick, src, alt }) => (
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
    <img src={src} alt={alt} width="100px" height="100px" />
  </Button>
);

const Landing = () => {
  const dispatchRedux = useDispatch();

  const isMobile = useIsMobile('sm');

  // redux vars
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const resetStatusRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset.status,
  );

  // useState vars
  // const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  // This is the state obj mapped by mapState(filtered from allStates, these 2 objs are not same)
  const [selectedState, setSelectedState] = useState({});
  // This is the obj map returns when you selected a state on map
  const [mapState, setMapState] = useState({});
  const [pendingState, setPendingState] = useState(null);
  const [mapKey, setMapKey] = useState(1);

  const displayState = pendingState || selectedState;

  const { isAuthenticated } = useAuth0();

  const availableStates = useMemo(() => allStates.map((state) => state.label), [allStates]);

  const isDevEnvironment = testAuth0Env || /(localhost|dev)/i.test(window.location);

  const applyState = (state) => {
    setSelectedState(state);
    localStorage.setItem('stateId', state.id);
    if (stateIdRedux !== state.id) {
      dispatchRedux(
        updateStateInfo({
          stateLabel: state.label,
          stateId: state.id,
          councilShorthand: state.council.shorthand,
          councilLabel: state.council.label,
        }),
      );
      dispatchRedux(updateLocation({ address: '', markers: null, county: null }));
      dispatchRedux(updateRegion({ regionId: null, regionShorthand: null }));
      dispatchRedux(updateField(null));
    }
    // set address for pipeline environment(when map is not available)
    if (testAuth0Env) {
      const [lat, lon] = statesLatLongDict[state.label];
      dispatchRedux(updateLocation({ address: '', markers: [[lat, lon]], county: null }));
    }
    const { id } = state;
    if (state.council.shorthand !== 'WCCC') {
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
          if (stateIdRedux !== state.id) {
            // set default region for Selector and Explorer
            if (!fetchedRegions[0]?.id || !fetchedRegions[0]?.shorthand)
              throw new Error('Unavailable region.');
            localStorage.setItem('regionId', fetchedRegions[0].id);
            dispatchRedux(
              updateRegion({
                regionId: fetchedRegions[0].id,
                regionShorthand: fetchedRegions[0].shorthand,
              }),
            );
          }
          // set querystring for non WCCC states
          dispatchRedux(setQueryString(`regions=${fetchedRegions[0].id}`));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  };

  // when a state change is requested, check validity, history and crop list
  const requestStateChange = (state) => {
    if (!state || !state?.id || state.id === selectedState?.id) return;

    if (historyStateRedux === historyState.imported && stateIdRedux !== state.id) {
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
      return;
    }

    if (selectedCropIdsRedux.length > 0 && stateIdRedux && stateIdRedux !== state.id) {
      setPendingState(state);
      dispatchRedux(setMyCoverCropReset(true));
      return;
    }

    applyState(state);
  };

  // handle state dropdown change
  const handleStateChange = (e) => {
    const state = allStates.find((s) => s.shorthand === e.target.value);
    requestStateChange(state);
  };

  // Load map data based on current enviorment
  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then(
      (stateData) => {
        const productionCouncils = ['NECCC', 'SCCC', 'MCCC', 'WCCC'];
        const states = isDevEnvironment
          ? stateData.data
          : stateData.data.filter((state) => productionCouncils.includes(state.council.shorthand));
        setAllStates(states);
      },
    );
  }, [apiBaseUrlRedux, isDevEnvironment]);

  // handle map change, use mapState to filter allStates and request state change
  useEffect(() => {
    if (mapState && Object.keys(mapState).length !== 0) {
      const stateName = mapState.properties?.STATE_NAME;
      const state = allStates.find((s) => s.label === stateName);
      requestStateChange(state);
    }
  }, [mapState]);

  // set initial map state based on stateIdRedux
  // user history api/user click next and come back
  useEffect(() => {
    if (allStates.length) {
      const state = allStates.find((s) => s.id === stateIdRedux);
      // handle stateIdRedux is null(click headerlogo in landing page)
      if (state) {
        setSelectedState(state);
        pirschAnalytics('Landing', { meta: { state: state.label } });
      } else if (resetStatusRedux === null && !pendingState) {
        setSelectedState({});
      }
    }
  }, [stateIdRedux, allStates, resetStatusRedux, pendingState]);

  // handle reset dialog
  useEffect(() => {
    if (resetStatusRedux === null) return;

    if (resetStatusRedux === true) {
      if (pendingState) {
        applyState(pendingState);
        setPendingState(null);
        setMapState({});
        dispatchRedux(setMyCoverCropReset(false, false, null));
      } else if (selectedState?.id && stateIdRedux === null) {
        applyState(selectedState);
      }
    } else if (resetStatusRedux === false) {
      if (pendingState) {
        setPendingState(null);
        setMapState({});
        setMapKey((prev) => prev + 1);
        dispatchRedux(setMyCoverCropReset(false, false, null));
      }
    }
  }, [resetStatusRedux, pendingState, selectedState, stateIdRedux]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Landing' } });
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
        flexGrow: 1,
      }}
      sx={{ margin: -1 }}
      id="landingWrapper"
    >
      <Grid style={backgroundSyles.frostedGlassEffect} sx={{ maxWidth: '800px', mt: 1 }}>
        <Box sx={{ margin: 1 }}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Typography variant="h4" gutterBottom align="center">
                Welcome to the Cover Crop Species Selector
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" align="center">
                Choose your state from the dropdown or the map. You can zoom by scrolling or
                pinching on mobile.
              </Typography>
            </Grid>
            <Grid sx={{ justifyContent: 'center', display: 'flex' }} size={12}>
              <PSADropdown
                label="STATE"
                items={allStates.map((state) => ({
                  value: state.shorthand,
                  label: state.label?.toUpperCase(),
                }))}
                formSx={{ minWidth: 120 }}
                inputSx={{
                  color: '#598445',
                  '&.Mui-focused': {
                    color: '#598445',
                    fontWeight: 'medium',
                  },
                }}
                SelectProps={{
                  value: displayState?.shorthand || '',
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
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={12}>
              <Typography>
                {isAuthenticated
                  ? 'Try out our new user history feature below:'
                  : 'Log in to try out our new user history feature!'}
              </Typography>
            </Grid>
            {isAuthenticated && (
              <Grid size={12}>
                <HistorySelect />
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid>
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
            selectedState={displayState?.label}
            availableStates={availableStates}
            initWidth="100%"
            initHeight="350px"
            initLon={-90}
            initLat={41}
            initStartZoom={2.5}
            data-test="state-map"
            mapboxToken={mapboxToken}
            key={mapKey}
          />
          <StateImageButton
            sx={{
              position: 'absolute',
              bottom: isMobile ? '-110px' : '140px',
              left: '10px',
              ...(displayState?.label === 'Alaska'
                ? { border: '2px solid', borderColor: 'primary.main' }
                : {}),
            }}
            onClick={() => {
              const alaska = allStates.find((s) => s.label === 'Alaska');
              if (alaska) requestStateChange(alaska);
            }}
            src={
              displayState?.label === 'Alaska'
                ? '/images/alaska-selected.jpg'
                : '/images/alaska.jpg'
            }
            alt="select Alaska"
          />
          <StateImageButton
            sx={{
              position: 'absolute',
              bottom: isMobile ? '-110px' : '30px',
              left: isMobile ? '120px' : '10px',
              ...(displayState?.label === 'Hawaii'
                ? { border: '2px solid', borderColor: 'primary.main' }
                : {}),
            }}
            onClick={() => {
              const hawaii = allStates.find((s) => s.label === 'Hawaii');
              if (hawaii) requestStateChange(hawaii);
            }}
            src={
              displayState?.label === 'Hawaii'
                ? '/images/hawaii-selected.jpg'
                : '/images/hawaii.jpg'
            }
            alt="select Hawaii"
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Landing;
