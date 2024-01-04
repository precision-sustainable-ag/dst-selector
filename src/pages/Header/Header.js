/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Grid, Box, Button, Typography,
} from '@mui/material';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import {
  updateAccessToken,
  updateConsent,
  updateField,
  setSelectFieldId,
} from '../../reduxStore/userSlice';
import {
  getFields, getHistory, buildHistory, postHistory,
} from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';
import { updateStateInfo } from '../../reduxStore/mapSlice';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';
import { setMyCoverCropReset } from '../../reduxStore/sharedSlice';
import { reset } from '../../reduxStore/store';
// import logoImage from '../../../public/images/PSAlogo-text.png';

const Header = () => {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // useRef vars
  const logoRef = useRef(null);
  const faviconRef = useRef(document.getElementById('favicon'));

  // used to know if the user is in mobile mode
  const theme = useTheme();

  // breakpoints
  const isXsOrSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  // redux vars
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const selectedFieldIdRedux = useSelector((stateRedux) => stateRedux.userData.selectedFieldId);
  const accessTokenRedux = useSelector((stateRedux) => stateRedux.userData.accessToken);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  // useState vars
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  // height var
  let headerHeight = '100px';

  if (isXsOrSmaller) {
    headerHeight = '250px';
  } else if (isSmOrSmaller) {
    headerHeight = '220px';
  } else if (isMdOrSmaller) {
    headerHeight = '150px';
  }

  // used to create top tabs
  const headerTabs = ['profile', 'about', 'help', 'feedback'];

  const handleClick = () => {
    if (selectedCropIdsRedux.length === 0) {
      dispatchRedux(reset());
      history.replace('/');
    } else {
      dispatchRedux(setMyCoverCropReset(true, false));
    }
  };

  // useEffect to update favicon
  useEffect(() => {
    switch (councilShorthandRedux) {
      case 'NECCC':
        faviconRef.current.href = '/favicons/neccc-favicon.ico';
        break;
      case 'SCCC':
        faviconRef.current.href = '/favicons/sccc-favicon.ico';
        break;
      case 'MCCC':
        faviconRef.current.href = '/favicons/mccc-favicon.ico';
        break;
      default:
        faviconRef.current.href = '/favicons/psa-favicon.ico';
        break;
    }
  }, [councilShorthandRedux]);

  // useEffect to update logo image
  useEffect(() => {
    switch (councilShorthandRedux) {
      case 'NECCC':
        logoRef.current.src = '/images/neccc_wide_logo_color_web.jpg';
        break;
      case 'SCCC':
        logoRef.current.src = '/images/sccc_logo.png';
        break;
      case 'MCCC':
        logoRef.current.src = '/images/mwccc_logo.png';
        break;

      default:
        logoRef.current.src = '/images/PSAlogo-text.png';

        break;
    }
  }, [councilShorthandRedux]);

  useEffect(() => {
    // detect current pathname
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
      getHistory(token).then((res) => {
        if (res.data) {
          const {
            state, region, council, consent,
          } = res.data.json;
          // set user history redux state
          localStorage.setItem('stateId', state.id);
          dispatchRedux(
            updateStateInfo({
              stateLabel: state.label,
              stateId: state.id,
              councilShorthand: council.shorthand,
              councilLabel: council.label,
            }),
          );
          if (region) {
            localStorage.setItem('regionId', region.id);
          }
          dispatchRedux(updateConsent(consent.status, consent.date));
          // The consent is mainly use localstorage to test is expired, use history to update localStorage
          const consentKey = 'consent';
          if (localStorage.getItem(consentKey) === null) {
            const consentObject = {
              choice: consent.status,
              // set user consent selection time as 180 days
              expiredAt: new Date(consent.date).getTime() + 180 * 24 * 60 * 60 * 1000,
            };
            localStorage.setItem(consentKey, JSON.stringify(consentObject));
          }
          const selectedFieldId = res.data.fieldId;
          dispatchRedux(setSelectFieldId(selectedFieldId));
        } else {
          setConsentModalOpen(true);
        }
      });
    };
    if (isAuthenticated) fetchUserData();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    // save user history when user click next in Landing & Location page, change zone in explorer
    if (
      isAuthenticated
      && (progressRedux === 1 || progressRedux === 2 || pathname === '/explorer')
    ) {
      const userHistory = buildHistory(
        stateIdRedux,
        stateLabelRedux,
        regionIdRedux,
        regionShorthandRedux,
        councilLabelRedux,
        councilShorthandRedux,
        consentRedux.status,
        consentRedux.date,
        selectedFieldIdRedux,
      );
      postHistory(accessTokenRedux, userHistory);
    }
  }, [progressRedux, regionShorthandRedux, selectedFieldIdRedux]);

  const chooseTopBar = (option) => {
    if (option) {
      return (
        <Grid
          item
          container
          spacing={1}
          md={isMdOrSmaller ? 12 : 6}
          xs={12}
          alignItems="center"
          justifyContent={isMdOrSmaller ? 'center' : 'right'}
          className="topHeader"
        >
          {headerTabs.map((tab, index) => (
            <Grid item key={index}>
              <Button>
                <NavLink to={`/${tab}`}>
                  <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {tab}
                  </Typography>
                </NavLink>
              </Button>
            </Grid>
          ))}
          <Grid item>
            <AuthButton
              type={isAuthenticated ? 'Logout' : 'Login'}
              color={isAuthenticated ? 'error' : 'primary'}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{
                // position: 'relative',
                height: 'auto',
                marginRight: '10px',
                width: '120px',
              }}
            >
              <Button type="button" onClick={handleClick}>
                <img
                  id="logoImage" // id to the img element to reference it in useEffect
                  className="img-fluid"
                  ref={logoRef}
                  alt=""
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        item
        container
        md={isMdOrSmaller ? 12 : 6}
        justifyContent={isMdOrSmaller ? 'center' : 'left'}
        xs={12}
      >
        <ToggleOptions pathname={pathname} />
      </Grid>
    );
  };

  return (
    <header>
      <Box>
        <Grid container>
          <Grid item container alignItems="center" sx={{ height: headerHeight }}>
            {chooseTopBar(isMdOrSmaller)}
            {chooseTopBar(!isMdOrSmaller)}
          </Grid>

          <Grid
            item
            container
            xs={12}
            height={pathname !== '/' ? '50px' : 'auto'}
            sx={{
              backgroundColor: '#598445',
            }}
          >
            <InformationBar pathname={pathname} />
            <MyCoverCropReset />
          </Grid>
        </Grid>

        {(!authModalOpen || isAuthenticated) && (
          <ConsentModal modalOpen={consentModalOpen} setModalOpen={setConsentModalOpen} />
        )}
        <AuthModal
          modalOpen={authModalOpen}
          setModalOpen={setAuthModalOpen}
          setConsentModalOpen={setConsentModalOpen}
        />
      </Box>
    </header>
  );
};

export default Header;
