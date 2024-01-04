/* eslint-disable no-alert */
/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// import SelectUSState from 'react-select-us-states';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { RegionSelectorMap } from '@psa/dst.ui.region-selector-map';
import { callCoverCropApi } from '../../shared/constants';
import { updateRegion, updateRegions, updateStateInfo } from '../../reduxStore/mapSlice';
import { updateLocation } from '../../reduxStore/addressSlice';

const Landing = () => {
  const dispatchRedux = useDispatch();

  // theme vars
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);

  // useState vars
  // const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  // This is the state obj mapped by mapState(filtered from allStates, these 2 objs are not same)
  const [selectedState, setSelectedState] = useState({});
  // This is the obj map returns when you selected a state on map
  const [mapState, setMapState] = useState({});

  const availableStates = useMemo(() => allStates.map((state) => state.label), [allStates]);

  // Styles for the menu items
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 224, // You can adjust this value to control the height of the dropdown
      },
      sx: {
        '.MuiMenuItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: 'rgba(176, 236, 130, 0.3)',
            color: 'black',
          },
        },
        // Additional styles to remove the scrollbar
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      },
    },
  };
  const updateStateRedux = (selState) => {
    localStorage.setItem('stateId', selState.id);
    dispatchRedux(
      updateStateInfo({
        stateLabel: selState.label,
        stateId: selState.id,
        councilShorthand: selState.council.shorthand,
        councilLabel: selState.council.label,
      }),
    );
    // This was targeting the map object which didnt have a label or shorthand property.  Should be be getting done here?
  };

  // Load map data based on current enviorment
  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then(
      (stateData) => {
        const isDevEnvironment = /(localhost|dev)/i.test(window.location);
        const productionCouncils = ['NECCC', 'SCCC'];
        const states = isDevEnvironment
          ? stateData.data
          : stateData.data.filter((state) => productionCouncils.includes(state.council.shorthand));
        setAllStates(states);
      },
    );
  }, []);

  // set initial map state based on stateIdRedux
  // user history api/user click next and come back
  useEffect(() => {
    if (allStates.length) {
      const state = allStates.filter((s) => s.id === stateIdRedux);
      // handle stateIdRedux is null(click headerlogo in landing page)
      if (state.length > 0) {
        setSelectedState(state[0]);
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

  // update stateRedux and regionsRedux based on selectState change
  useEffect(() => {
    // is there a chance selectedState is {} ?
    if (Object.keys(selectedState).length !== 0) {
      updateStateRedux(selectedState);
      // TODO: reset user marker for history fields?
      if (stateIdRedux !== selectedState.id) {
        dispatchRedux(updateLocation({ address: '', markers: null, county: null }));
        dispatchRedux(updateRegion({ regionId: null, regionShorthand: null }));
      }
      const { id } = selectedState;
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

          // set default region for Selector and Explorer
          if (!regionIdRedux) {
            localStorage.setItem('regionId', fetchedRegions[0].id ?? '');
            dispatchRedux(
              updateRegion({
                regionId: fetchedRegions[0].id ?? '',
                regionShorthand: fetchedRegions[0].shorthand ?? '',
              }),
            );
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }, [selectedState]);

  // handler function for stateSelect list
  const handleStateChange = (e) => {
    const selState = allStates.filter((s) => s.shorthand === e.target.value);
    setSelectedState(selState[0]);
  };

  useEffect(() => {
    if (consentRedux) {
      ReactGA.initialize('UA-181903489-1');
      ReactGA.pageview('cover crop selector');
    }
  }, [consentRedux]);

  const [containerHeight, setContainerHeight] = useState();

  useEffect(() => {
    function updateSize() {
      const documentHeight = document
        .getElementsByTagName('html')[0]
        .getBoundingClientRect().height;

      const headerHeight = document
        .getElementsByTagName('header')[0]
        .getBoundingClientRect().height;

      const footerHeight = document
        .getElementsByClassName('primaryFooter')[0]
        .getBoundingClientRect().height;

      const contHeight = documentHeight - (headerHeight + footerHeight);
      document.getElementById('landingWrapper').style.minHeight = `${contHeight}px`;
      setContainerHeight(contHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const styles = {
    frostedGlassEffect: {
      backdropFilter: 'blur(5px)', // This creates the frosted glass effect
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Adjust the alpha value for more or less transparency
      border: '1px solid rgba(255, 255, 255, 0.2)', // Optional: adds a subtle border
      borderRadius: '10px', // Optional: rounds the corners
      position: 'relative',
      width: '80%',
      maxWidth: '500px',
      left: '50%',
      transform: 'translateX(-50%)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: adds a shadow for depth
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
      <Grid sx={styles.frostedGlassEffect} mt={1}>
        <Box mr={1} ml={1} mb={1} mt={1}>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography
                variant="h2"
                style={{ fontWeight: 500, fontSize: '2rem', textAlign: 'center' }}
              >
                {`Welcome to the${
                  councilLabelRedux ? ` ${councilLabelRedux}` : ' Cover Crop'
                } Species Selector`}
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography
                variant={isMobile ? 'subtitle2' : 'subtitle1'}
                sx={{
                  fontWeight: 'medium',
                  color: '#4A4A4A',
                }}
              >
                Choose your state from the dropdown or the map. You can zoom by scrolling or
                pinching on mobile.
              </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="state-dropdown-label">STATE</InputLabel>
                <Select
                  onChange={(e) => handleStateChange(e)}
                  value={selectedState?.shorthand || ''}
                  labelId="state-dropdown-label"
                  label="STATE"
                  sx={{
                    minWidth: 200,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445', // Set your custom color for the notched outline
                      borderWidth: '2px', // Set your custom border width
                      borderRadius: '4px', // Custom border radius
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445', // Custom color on hover
                      borderWidth: '2.5px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#598445', // Custom color when the Select is focused
                      borderWidth: '2.5px', // Custom border width when the Select is focused
                    },
                  }}
                  MenuProps={menuProps}
                >
                  {allStates.length > 0
                    && allStates.map((st, i) => (
                      <MenuItem value={st.shorthand} key={`Region${st}${i}`}>
                        {st.label?.toUpperCase()}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box
          style={{
            position: 'relative',
            width: '80%',
            maxWidth: '500px',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          <RegionSelectorMap
            selectorFunction={setMapState}
            selectedState={selectedState.label}
            availableStates={availableStates}
            initWidth="100%"
            initHeight="350px"
            initLon={-90}
            initLat={41}
            initStartZoom={2.5}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Landing;
