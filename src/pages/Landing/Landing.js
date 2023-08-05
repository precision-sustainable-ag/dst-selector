/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid, Typography,
} from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { RegionSelectorMap } from '@psa/dst.ui.region-selector-map';
import { BinaryButton } from '../../shared/constants';
import { Context, cropDataFormatter } from '../../store/Store';
import '../../styles/landing.scss';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import { updateZone, updateLastZone } from '../../reduxStore/addressSlice';
import { pullCropData } from '../../reduxStore/cropSlice';

const Landing = ({ height, title, bg }) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [containerHeight, setContainerHeight] = useState(height);
  const [allStates, setAllStates] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(state.selectedRegion);
  const mapRef = useRef(null);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  // const zoneIdRedux = useSelector((stateRedux) => stateRedux.addressData.zoneId);

  async function getAllStates() {
    const key = `https://${state.apiBaseURL}.covercrop-selector.org/v1/states`;
    await fetch(key)
      .then((res) => res.json())
      .then((data) => { setAllStates(data.data); })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  async function getCropData(currentRegionId) {
    if (currentRegionId === null) {
      return;
    }

    const query = `${encodeURIComponent('regions')}=${encodeURIComponent(currentRegionId)}`;
    await fetch(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/crops?${query}`)
      .then((res) => res.json())
      .then((data) => {
        cropDataFormatter(data.data);
        dispatchRedux(pullCropData(data.data));
        // dispatch({
        //   type: 'PULL_CROP_DATA',
        //   data: data.data,
        // });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  async function getDictData(currentRegionId) {
    if (currentRegionId === null) {
      return;
    }

    const query = `${encodeURIComponent('regions')}=${encodeURIComponent(currentRegionId)}`;
    await fetch(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/dictionary?${query}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'PULL_DICTIONARY_DATA',
          data: data.data,
        });
      })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (state.regions?.length > 0) {
      dispatch({
        type: 'UPDATE_REGION',
        data: {
          regionId: state.regions[0]?.id ?? '',
          regionLabel: state.regions[0]?.label ?? '',
          regionShorthand: state.regions[0]?.shorthand ?? '',
        },
      });

      dispatchRedux(updateZone(
        {
          zoneText: state.regions[0]?.label,
          zone: state.regions[0]?.shorthand,
          zoneId: state.regions[0]?.id,
        },
      ));

      getDictData(state.regions[0]?.id);
      getCropData(state.regions[0]?.id);
    }
  }, [state.regions]);

  useEffect(() => {
    if (state.stateId) {
      fetch(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/regions`)
        .then((res) => res.json())
        .then((data) => {
          let fetchedRegions;
          if (data.data.Counties) {
            fetchedRegions = data.data.Counties;
          }
          fetchedRegions = data.data.Zones;

          dispatch({
            type: 'UPDATE_REGIONS',
            data: {
              regions: fetchedRegions,
            },
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }, [state.stateId]);

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

    if (Object.keys(selectedRegion).length > 0) {
      const selState = allStates.filter((s) => s.label === selectedRegion.properties.STATE_NAME);
      if (selState.length > 0 && verifyCouncil(selState[0]?.council.shorthand)) {
        dispatchRedux(updateLastZone(zoneRedux));

        dispatch({
          type: 'UPDATE_STATE',
          data: {
            state: selState[0].label,
            stateId: selState[0].id,
            councilShorthand: selState[0].council.shorthand,
            councilLabel: selState[0].council.label,
          },
        });
      } else {
        dispatch({
          type: 'UPDATE_STATE',
          data: {
            state: '',
            stateId: '',
            councilShorthand: '',
            councilLabel: '',
          },
        });
        // eslint-disable-next-line no-alert
        alert(
          // eslint-disable-next-line max-len
          devEnvironment ? 'The region you have selected is not currently supported. We currently support Northeast, Midwest, and Southern Cover Crop Councils. Please try again!' : 'The region you have selected is not currently supported. We currently support Northeast Cover Crop Council. Please try again!',
        );
      }
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (state.consent) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop selector');
    }
  }, [state.consent]);

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
    if (localStorage.getItem('lastLocation') === 'CoverCropExplorer') {
      document.title = 'Cover Crop Selector';
      if (selectedCropsRedux.length) {
        setHandleConfirm(true);
      }
    }
    localStorage.setItem('lastLocation', 'CropSelector');
  }, []);

  const handleConfirmationChoice = (clearMyList = false) => {
    if (clearMyList) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
    } else {
      history.goBack();
      if (window.location.pathname !== '/') {
        history.push('/');
      }
    }
    setHandleConfirm(false);
  };

  return (

    <div
      id="landingWrapper"
      // className="d-flex flex-column"
      style={{
        minHeight: containerHeight,
        background: `url(${bg})`,
        backgroundSize: 'cover',
      }}
    >

      <ConsentModal consent={state.consent} />

      {/* <Grid container direction="row"> */}
      <Grid container>

        <Grid
          className="p-2"
          item
          lg={6}
          xs={12}
          // xs={6}
          // spacing={2}
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
              {`Welcome to the${state.councilLabel && ` ${state.councilLabel}`} Species Selector Tool`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom align="left">
              {`You are currently interacting with the${state.councilLabel && ` ${state.councilLabel}`} Species Selector Tool. We
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
            {selectedRegion.properties && (
              <Typography
                variant="h6"
                gutterBottom
                align="left"
                className="font-weight-bold"
                style={{ color: 'blue', marginLeft: '1rem' }}
              >
                {selectedRegion.properties.STATE_NAME}
                {' '}
                (
                  { selectedRegion.properties.STATE_ABBR }
                )
              </Typography>
            )}
          </Grid>
          <Grid item>
            <div style={{ position: 'relative', width: '100%', paddingRight: '10%' }}>
              <RegionSelectorMap
                selectorFunc={setSelectedRegion}
                selectedRegion={selectedRegion}
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
      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            You will need to clear your My Cover Crop List to continue.  Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={handleConfirmationChoice}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Landing;
