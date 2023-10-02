/* eslint-disable no-alert */
/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import {
  FormControl,
  Grid, InputLabel, List, ListItem, MenuItem, Select, Typography,
} from '@mui/material';
// import SelectUSState from 'react-select-us-states';
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { RegionSelectorMap } from '@psa/dst.ui.region-selector-map';
import { callCoverCropApi } from '../../shared/constants';
import '../../styles/landing.scss';
import { updateRegions, updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';

const Landing = ({ height, title, bg }) => {
  const dispatchRedux = useDispatch();

  const mapRef = useRef(null);

  // redux vars
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  // This is the state obj mapped by mapState(filtered from allStates, these 2 objs are not same)
  const [selectedState, setSelectedState] = useState({});
  // This is the obj map returns when you selected a state on map
  const [mapState, setMapState] = useState({});

  const availableStates = useMemo(() => allStates.map((state) => state.label), [allStates]);

  const updateStateRedux = (selState) => {
    dispatchRedux(updateStateInfo({
      stateLabel: selState.label,
      stateId: selState.id,
      councilShorthand: selState.council.shorthand,
      councilLabel: selState.council.label,
    }));
    // This was targeting the map object which didnt have a label or shorthand property.  Should be be getting done here?
  };

  // Load map data based on current enviorment
  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then((stateData) => {
      const isDevEnvironment = /(localhost|dev)/i.test(window.location);
      const productionCouncils = ['NECCC', 'SCCC'];
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
          dispatchRedux(updateRegion({
            regionId: fetchedRegions[0].id ?? '',
            regionShorthand: fetchedRegions[0].shorthand ?? '',
          }));
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

  const stateSelect = () => (
    <List component="div" disablePadding>
      <ListItem component="div">
        <FormControl
          variant="filled"
          style={{ width: '100%' }}
          sx={{ minWidth: 120 }}
        >
          <InputLabel>State</InputLabel>
          <Select
            variant="filled"
            labelId="plant-hardiness-zone-dropdown-select"
            id="plant-hardiness-zone-dropdown-select"
            style={{
              width: '100%',
              textAlign: 'left',
            }}
            onChange={(e) => handleStateChange(e)}
            value={selectedState?.shorthand || ''}
          >

            {allStates.length > 0 && allStates.map((st, i) => (
              <MenuItem value={st.shorthand} key={`Region${st}${i}`}>
                {st.label?.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );

  useEffect(() => {
    if (consentRedux) {
      ReactGA.initialize('UA-181903489-1');
      ReactGA.pageview('cover crop selector');
    }
  }, [consentRedux]);

  useEffect(() => {
    document.title = title;
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

      const contHeight = documentHeight - (headerHeight + footerHeight) + 7;
      document.getElementById('landingWrapper').style.minHeight = `${contHeight}px`;
      setContainerHeight(contHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [title]);

  useEffect(() => {
    document.title = 'Cover Crop Selector';
  }, []);

  return (

    <div
      id="landingWrapper"
      style={{
        minHeight: containerHeight,
        background: `url(${bg})`,
        backgroundSize: 'cover',
      }}
    >
      <Grid container>

        <Grid
          className="p-2"
          item
          lg={6}
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          style={{
            height: '100%',
            margin: '2rem',
            backgroundColor: 'rgba(240,247,235,.8)',
            borderRadius: '10px',
            border: '1px solid #598445',
          }}
        >
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              {`Welcome to the${councilLabelRedux ? ` ${councilLabelRedux}` : ''} Species Selector Tool`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom align="left">
              {`You are currently interacting with the${councilLabelRedux ? ` ${councilLabelRedux}` : ''} Species Selector Tool. We
            seek feedback about the usability and usefulness of this tool. Our goal is to encourage
            and support the use of cover crops in your area. You can learn more about the
            cover crop data and design of this tool`}
              {' '}
              <Link to="/about"> here</Link>
              . If you need
              assistance, consult the
              {' '}
              <Link to="/help">help page</Link>
              .
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left" variant="body1" gutterBottom style={{ paddingBottom: '1em' }}>
              In the future, this platform will host a variety of tools including a cover crop mixture
              and seeding rate calculator and an economics calculator. Our ultimate goal is to provide
              a suite of interconnected tools that function together seamlessly.
            </Typography>
            {stateSelect()}
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', paddingBottom: '1em' }}
              align="left"
              gutterBottom
            >
              Thank you for your time and consideration. You may provide input by visiting our
              {' '}
              <Link to="/feedback">Feedback</Link>
              {' '}
              page. We look forward to your hearing about your experience.
            </Typography>
            <Typography variant="body1" gutterBottom align="left" className="font-weight-bold">
              Click Next to enter the Species Selector.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          style={{
            height: '100%',
            padding: '1rem',
            marginRight: '2rem',
            marginLeft: '2rem',
            marginTop: '1rem',
            backgroundColor: 'rgba(240,247,235,.8)',
            borderRadius: '10px',
            border: '1px solid #598445',
          }}
          container
          direction="column"
          ref={mapRef}
          alignItems="space-between"
        >
          <Grid
            item
            container
            direction="row"
            sx={{
              marginBottom: '0rem',
              marginLeft: '10%',
            }}
          >
            <Typography variant="h5" gutterBottom align="left" className="font-weight-bold">
              Select your State
            </Typography>
            {Object.keys(selectedState).length !== 0 && (
              <Typography
                variant="h6"
                gutterBottom
                align="left"
                className="font-weight-bold"
                style={{ color: 'blue', marginLeft: '1rem' }}
              >
                {selectedState.label}
                {' '}
                (
                  { selectedState.shorthand }
                )
              </Typography>
            )}
          </Grid>
          <Grid item>
            <div style={{ position: 'relative', width: '100%', paddingRight: '10%' }}>
              <RegionSelectorMap
                selectorFunction={setMapState}
                selectedState={selectedState.label}
                availableStates={availableStates}
                initWidth="100%"
                initHeight="350px"
                initLon={-98}
                initLat={43}
                initStartZoom={2.3}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
