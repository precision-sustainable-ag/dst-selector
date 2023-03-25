/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import { Grid, Typography } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
// import { RegionSelectorMap } from '@psa/dst.ui.region-selector-map';
import { LightButton } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/landing.scss';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';

const Landing = ({ height, title, bg }) => {
  const { state, dispatch } = useContext(Context);
  const [containerHeight, setContainerHeight] = useState(height);
  // const [selectedRegion, setSelectedRegion] = useState(state.selectedRegion);
  const mapRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_SELECTED_REGION',
      // data: selectedRegion,
    });
  }, [/* selectedRegion, */dispatch]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop selector');
    }
  }, [state.consent]);

  const incrementProgress = (incVal) => {
    incVal = parseInt(incVal, 10);
    if (incVal === 1) {
      if (state.progress === 0) {
        dispatch({
          type: 'UPDATE_PROGRESS',
          data: {
            type: 'INCREMENT',
          },
        });
      }
    }
  };

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
      <Grid container direction="row">
        <Grid
          className="p-2"
          item
          xs={6}
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
              Welcome to the Northeast Cover Crop Species Selector Tool
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom align="left">
              You are currently interacting with the Northeast Cover Crop Species Selector Tool. We
              seek feedback about the usability and usefulness of this tool. Our goal is to
              encourage and support the use of cover crops in the Northeast US. You can learn more
              about the cover crop data and design of this tool
              {' '}
              <Link to="/about"> here</Link>
              . If you need assistance, consult the
              {' '}
              <Link to="/help">help page</Link>
              .
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left" variant="body1" gutterBottom style={{ paddingBottom: '1em' }}>
              In the future, this platform will host a variety of tools including a cover crop
              mixture and seeding rate calculator and an economics calculator. Our ultimate goal is
              to provide a suite of interconnected tools that function together seamlessly.
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
            style={{
              marginBottom: '0rem',
              marginLeft: '10%',
            }}
          >
            <Typography variant="h5" gutterBottom align="left" className="font-weight-bold">
              Select your State
            </Typography>
            {/* {selectedRegion.properties && (
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
            )} */}
          </Grid>
          <Grid item>
            <div style={{ position: 'relative', width: '100%', paddingRight: '10%' }}>
              {/* <RegionSelectorMap
                selectorFunc={setSelectedRegion}
                selectedRegion={selectedRegion}
                initWidth="100%"
                initHeight="350px"
                initLon={-98}
                initLat={43}
                initStartZoom={2.3}
              /> */}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '1rem' }}>
        <Grid item>
          <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
