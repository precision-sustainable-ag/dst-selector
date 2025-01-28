/* eslint-disable max-len */
/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Box } from '@mui/material';
import { PSAHeader, PSAAuthButton } from 'shared-react-components/src';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { setUserHistoryList } from '../../reduxStore/userSlice';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';
import { setMyCoverCropReset, snackHandler } from '../../reduxStore/sharedSlice';
import { reset } from '../../reduxStore/store';
import { setAuthToken } from '../../shared/authToken';
import { loadHistory } from '../../shared/api';
import HistoryDialog from '../../components/HistoryDialog/HistoryDialog';
import SaveUserHistory from './SaveUserHistory/SaveUserHistory';
import { releaseNotesURL } from '../../shared/keys';
import useWindowSize from '../../shared/constants';

const Header = () => {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // used to know if the user is in mobile mode
  const theme = useTheme();

  // breakpoints
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  // redux vars
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  // useState vars
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  const handleLogoClick = () => {
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
      loadHistory(token)
        .then((res) => {
          dispatchRedux(setUserHistoryList(res));
        })
        .catch((err) => {
          dispatchRedux(
            snackHandler({ snackOpen: true, snackMessage: `Error loading history: ${err}` }),
          );
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

  const navContent = [
    {
      type: 'button',
      variant: 'text',
      text: 'Profile',
      icon: <AccountBoxOutlinedIcon />,
      rightIcon: true,
      onClick: () => history.push('/profile'),
      textSx: { fontSize: '1rem' },
    },
    {
      type: 'button',
      variant: 'text',
      text: 'About',
      icon: <InfoOutlinedIcon />,
      rightIcon: true,
      onClick: () => history.push('/about'),
      textSx: { fontSize: '1rem' },
    },
    {
      type: 'button',
      variant: 'text',
      text: 'Help',
      icon: <HelpOutlineIcon />,
      rightIcon: true,
      onClick: () => history.push('/help'),
      textSx: { fontSize: '1rem' },
    },
    {
      type: 'button',
      variant: 'text',
      text: 'Feedback',
      icon: <ChatBubbleOutlineIcon />,
      rightIcon: true,
      onClick: () => history.push('/feedback'),
      textSx: { fontSize: '1rem' },
    },
    {
      type: 'button',
      variant: 'text',
      text: 'Release Notes',
      icon: <TextSnippetOutlinedIcon />,
      rightIcon: true,
      onClick: () => window.open(releaseNotesURL),
      style: { fontSize: '1rem' },
      textSx: { fontSize: '1rem' },
    },
    {
      type: 'component',
      component: <PSAAuthButton />,
    },
  ];

  return (
    <header style={{ width: headerWidth }}>
      <Box>
        <Grid container>
          <PSAHeader
            title="Cover Crop Selector"
            council={councilShorthandRedux}
            navContent={navContent}
            onLogoClick={handleLogoClick}
          />
          <Grid container sx={{ pb: isMdOrSmaller ? '3rem' : '1rem' }}>
            <Grid
              item
              sx={{
                position: 'absolute',
                top: isMdOrSmaller ? '85px' : '120px',
                display: 'flex',
              }}
            >
              {/* get a recommendation / browse cover crops */}
              <ToggleOptions pathname={pathname} />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            height={pathname !== '/' ? '50px' : 'auto'}
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
