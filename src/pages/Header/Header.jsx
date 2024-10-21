/* eslint-disable max-len */
/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Grid, Box, Typography,
} from '@mui/material';
import { PSALogoDisplayer } from 'shared-react-components/src';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { setUserHistoryList } from '../../reduxStore/userSlice';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';
import { setMyCoverCropReset, snackHandler } from '../../reduxStore/sharedSlice';
import { reset } from '../../reduxStore/store';
import { setAuthToken } from '../../shared/authToken';
import { loadHistory } from '../../shared/api';
import HistoryDialog from '../../components/HistoryDialog/HistoryDialog';
import SaveUserHistory from './SaveUserHistory/SaveUserHistory';
import { releaseNotesURL } from '../../shared/keys';
import PSAButton from '../../components/PSAComponents/PSAButton';
import useWindowSize from '../../shared/constants';
import PSATooltip from '../../components/PSAComponents/PSATooltip';
// import logoImage from '../../../public/images/PSAlogo-text.png';

const Header = () => {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // used to know if the user is in mobile mode
  const theme = useTheme();

  // breakpoints
  const isXsOrSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  // redux vars
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
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

  useEffect(() => {
    // detect current pathname
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getAccessTokenSilently();
      setAuthToken(token);
      // get new user histories here
      loadHistory(token).then((res) => {
        dispatchRedux(setUserHistoryList(res));
      }).catch((err) => {
        dispatchRedux(snackHandler({ snackOpen: true, snackMessage: `Error loading history: ${err}` }));
      });
    };
    if (isAuthenticated) fetchUserData();
    // TODO: councilShorthandRedux here is for re-import userHistoryList when the app is reset
  }, [isAuthenticated, getAccessTokenSilently, councilShorthandRedux]);

  const windowSize = useWindowSize().width;

  const [headerWidth, setHeaderWidth] = useState('100%');
  const tableWidth = useSelector((stateRedux) => stateRedux.pageData.tableWidth);
  const sidebarWidth = useSelector((stateRedux) => stateRedux.pageData.sidebarWidth);
  useEffect(() => {
    setHeaderWidth(`${Math.max(windowSize, tableWidth + sidebarWidth)}px`);
  }, [tableWidth, sidebarWidth, windowSize]);

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
              <PSATooltip title={tab === 'help' && (stateLabelRedux === null) ? 'You must select a state before viewing the help page' : ''} enterTouchDelay={0}>
                <span>
                  <PSAButton
                    disabled={tab === 'help' && (stateLabelRedux === null)}
                  >
                    <NavLink to={`/${tab}`}>
                      <Typography variant="body2" sx={{ color: (tab === 'help' && stateLabelRedux === null) ? 'lightgrey' : 'black', fontWeight: 'bold' }}>
                        {tab}
                      </Typography>
                    </NavLink>

                  </PSAButton>
                </span>
              </PSATooltip>
            </Grid>
          ))}
          <Grid item>
            <PSAButton
              onClick={() => window.open(releaseNotesURL)}
            >
              <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                Release Notes
              </Typography>

            </PSAButton>
          </Grid>
          <Grid item>
            <AuthButton
              type={isAuthenticated ? 'Logout' : 'Login'}
              color={isAuthenticated ? 'error' : 'secondary'}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{
                // position: 'relative',
                height: 'auto',
                marginRight: '10px',
                width: '120px',
                overflow: 'hidden',
              }}
            >
              <PSAButton
                type="button"
                onClick={handleClick}
              >
                <PSALogoDisplayer
                  council={councilShorthandRedux}
                  alt={councilShorthandRedux}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </PSAButton>
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
    <header style={{ width: headerWidth }}>
      <Box>
        <Grid container>
          <Grid item container alignItems="center" sx={{ height: headerHeight }}>
            {chooseTopBar(isMdOrSmaller)}
            {chooseTopBar(!isMdOrSmaller)}
          </Grid>

          <Grid
            item
            xs={12}
            height={pathname !== '/' ? '50px' : 'auto'}
            sx={{
              backgroundColor: '#598445',
            }}
          >
            <InformationBar pathname={pathname} />
            <MyCoverCropReset />
            {/* saving history here */}
            <SaveUserHistory pathname={pathname} />
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
        <HistoryDialog />
      </Box>
    </header>
  );
};

export default Header;
