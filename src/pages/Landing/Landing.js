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
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { RegionSelectorMap } from '@psa/dst.ui.region-selector-map';
import { callCoverCropApi } from '../../shared/constants';
import '../../styles/landing.scss';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { updateZone } from '../../reduxStore/addressSlice';
import { updateRegions, updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';

const Landing = ({ height, title, bg }) => {
  const dispatchRedux = useDispatch();

  const mapRef = useRef(null);

  // redux vars
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const consentRedux = useSelector((stateRedux) => stateRedux.sharedData.consent);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [mapState, setMapState] = useState({});
  const [selectedRegion, setSelectedRegion] = useState({});

  const stateChange = (selState) => {
    setSelectedState(selState);
    dispatchRedux(updateStateInfo({
      stateLabel: selState.label,
      stateId: selState.id,
      councilShorthand: selState.council.shorthand,
      councilLabel: selState.council.label,
    }));
    // This was targeting the map object which didnt have a label or shorthand property.  Should be be getting done here?
  };

  const handleStateChange = (e) => {
    setSelectedRegion('');
    const selState = allStates.filter((s) => s.shorthand === e.target.value);
    stateChange(selState[0]);
  };

  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then((data) => {
      setAllStates(data.data);
      if (stateIdRedux) setSelectedState(data.data.filter((s) => s.id === stateIdRedux)[0]);
    });
  }, []);

  useEffect(() => {
    if (regionsRedux?.length > 0) {
      dispatchRedux(updateRegion({
        regionId: regionsRedux[0]?.id ?? '',
        regionLabel: regionsRedux[0]?.label ?? '',
        regionShorthand: regionsRedux[0]?.shorthand ?? '',
      }));

      dispatchRedux(updateZone(
        {
          zone: regionsRedux[0]?.shorthand,
          zoneId: regionsRedux[0]?.id,
        },
      ));
    }
  }, [regionsRedux]);

  useEffect(() => {
    if (stateIdRedux) {
      fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/regions`)
        .then((res) => res.json())
        .then((data) => {
          let fetchedRegions;

          if (data.data.Counties) {
            fetchedRegions = data.data.Counties;
          } else {
            fetchedRegions = data.data.Zones;
          }

          dispatchRedux(updateRegions(fetchedRegions));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }, [stateIdRedux]);

  // SelectedRegion needs to get replaced with mapState once the map is updated to using state verbage instead of region.
  useEffect(() => {
    if (selectedRegion) {
      const st = allStates.filter((s) => s.label === selectedRegion.properties.STATE_NAME);
      if (st.length > 0) {
        setSelectedState(st[0]);
      } else if (selectedRegion?.id) {
        setSelectedState('');
        dispatchRedux(updateStateInfo({
          stateLabel: null,
          stateId: null,
          councilShorthand: null,
          councilLabel: null,
        }));
        alert(
          // eslint-disable-next-line max-len
          'The region you have selected is not currently supported. We currently support Northeast, Midwest, and Southern Cover Crop Councils. Please try again!',
        );
      }
    }
  }, [selectedRegion, mapState]);

  useEffect(() => {
    // true signifies we are on dev, false signifies we are on prod
    const devEnvironment = /(localhost|dev)/i.test(window.location);
    // verifies selected state is in allowed council based off of devEnv variable
    const verifyCouncil = (selectedCouncil) => {
      const developCouncils = ['NECCC', 'MCCC', 'SCCC'];
      const productionCouncils = ['NECCC', 'SCCC'];
      if (devEnvironment) {
        return developCouncils.includes(selectedCouncil);
      }
      return productionCouncils.includes(selectedCouncil);
    };

    if (selectedState) {
      if (verifyCouncil(selectedState.council.shorthand)) {
        stateChange(selectedState);
      } else {
        dispatchRedux(updateStateInfo({
          stateLabel: null,
          stateId: null,
          councilShorthand: null,
          councilLabel: null,
        }));
      }
    }
  }, [selectedState]);

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
            value={selectedState.shorthand || ''}
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
    if (myCoverCropListLocationRedux !== 'selector' && selectedCropsRedux.length > 0) {
      setHandleConfirm(true);
    }
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

      <ConsentModal consent={consentRedux} />

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
            {selectedState && (
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
              {/* selectedRegion and selectorFunc should be deprecated and selectedState and setMapState should be used in their place */}
              <RegionSelectorMap
                selectorFunc={setSelectedRegion}
                selectorFunction={setMapState}
                selectedRegion={selectedRegion}
                selectedState={selectedState}
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
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </div>
  );
};

export default Landing;
