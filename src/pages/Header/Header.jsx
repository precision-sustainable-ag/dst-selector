/* eslint-disable no-console */
/* eslint-disable no-fallthrough */
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
// import useWindowSize from '../../shared/constants';
import { updateStateInfo } from '../../reduxStore/mapSlice';

const speed = 1;

let lastCaption;

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms * speed);
});

const Demo = () => {
  const dispatchRedux = useDispatch();
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  const moveTo = async (sel, caption, delay, options = { }) => {
    const mg = document.querySelector('.magnifying-glass');
    const cap = mg.querySelector('.caption');

    if (caption === true) {
      caption = lastCaption;
    } else {
      lastCaption = caption;
    }

    const parent = document.fullscreenElement || document.body;
    if (!parent.contains(mg)) {
      parent.appendChild(mg);
    }

    const obj = document.querySelector(sel);
    if (!obj) {
      // eslint-disable-next-line no-console
      console.log(`${sel} not available. Waiting 0.2s`);
      await sleep(200);
      await moveTo(sel, caption, delay, options);
      return;
    }

    obj?.scrollIntoViewIfNeeded();

    const br = obj.getBoundingClientRect();
    Object.assign(mg.style, {
      left: `${br.x}px`,
      top: `${br.y}px`,
      width: `${br.width + 20}px`,
      height: `${br.height + 20}px`,
      display: 'block',
    });

    cap.innerHTML = '';

    if (caption) {
      cap.style.left = '50%';
      cap.style.top = '100%';
      setTimeout(() => { // wait for CSS transition
        cap.innerHTML = caption;
        const cbr = cap.getBoundingClientRect();
        // console.log(cbr);
        if (cbr.right > window.innerWidth - 5) {
          cap.style.left = `calc(50% - ${cbr.right - (window.innerWidth - 5)}px)`;
        }

        if (cbr.bottom > window.innerHeight - 50) {
          cap.style.top = `${-cap.clientHeight}px`;
        }
      }, 300);
    }

    if (options.value) {
      await sleep(500);
      obj.focus();
      let v = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const c of options.value.toString()) {
        v += c;
        obj.value = v;
        const event = new Event('keydown', { bubbles: true });
        obj.dispatchEvent(event);
        // eslint-disable-next-line no-await-in-loop
        await sleep(options.keyspeed || 100);
      }
      obj.blur();
    }

    await sleep(delay);

    if (options.click) {
      const event = new Event('click', { bubbles: false });
      obj.dispatchEvent(event);
      obj.click();
      mg.style.display = 'none';
      await sleep(500);
    }

    if (options.focus) {
      const event = new Event('focus', { bubbles: false });
      obj.dispatchEvent(event);
      mg.style.display = 'none';
      await sleep(500);
    }

    if (options.mouseup) {
      const event = new Event('mouseup', { bubbles: true });
      obj.dispatchEvent(event);
      mg.style.display = 'none';
      await sleep(500);
    }

    if (options.mousedown) {
      const event = new Event('mousedown', { bubbles: true });
      obj.dispatchEvent(event);
      mg.style.display = 'none';
      await sleep(500);
    }

    if (options.change) {
      const event = new Event('change', { bubbles: false });
      obj.dispatchEvent(event);
      mg.style.display = 'none';
      await sleep(500);
    }
  }; // moveTo

  const landing = async () => {
    dispatchRedux(updateStateInfo({
      stateLabel: 'California',
      stateId: 9,
      councilShorthand: 'WCCC',
      councilLabel: 'Western Cover Crop Council',
    }));
    await moveTo('[data-test="state-selector-dropdown"]', 'Select your state from this drop-down, or click it on the map.', 5000);
    await moveTo('[data-test="next-btn"]', 'After selecting your state, press NEXT to advance to the next screen.', 3000, { click: true });
  };

  const location = async () => {
    await moveTo('.MapBox', ' There are 3 ways you can navigate to your field.   Double click,  use the Polygon tool in the top left of the map to mark your field, or...', 6000);
    await moveTo('.mapboxgl-ctrl-geocoder--input', 'Enter your location here.', 500, { value: '10th Avenue, Kettleman City', keyspeed: 100 });
    await moveTo('.suggestions li:nth-child(1)', 'Select from the list.', 2000, { mouseup: true });
    await moveTo('[data-test="next-btn"]', 'After selecting your location, press NEXT to advance to the next screen.', 5000, { click: true });
  };

  const siteConditions = async () => {
    await moveTo('[data-test="soil-composition-card"]', 'This shows your soil composition based on soil survey data (SSURGO).', 5000);
    await moveTo('[data-test="frost-dates-card"]', 'This shows 30-year average frost dates for your location.', 5000);
    await moveTo('[data-test="precipitation-card"]', 'This shows average annual precipitation for your location.', 5000);
    await moveTo('[data-test="soil-drainage-card"]', 'This shows your soil drainage based on soil survey data.<p>You can make changes appropriate for your location.</p>', 5000);
    await moveTo('[data-test="drainage-class-chip-2"]', '', 2000);
    await moveTo('[data-test="flooding-frequency-card"]', 'This shows the annual probability of a flood event.<p>You can make changes appropriate for your location.</p>', 5000);
    await moveTo('[data-test="flooding-options-chip-2"]', '', 1000);
    await moveTo('[data-test="next-btn"]', 'When satisfied with your conditions, press NEXT to advance to the next screen.', 5000, { click: true });
  };

  const goalSelector = async () => {
    await moveTo('#chip6', 'You can select up to 3 goals', 4000, { click: true });
    await moveTo('#chip3', '', 500, { click: true });
    await moveTo('#chip8', '', 500, { click: true });
    await moveTo('#season2', 'To filter your cover crop termination information please select your Planting Season, Life Cycle, and Irrigation type.</br> Select up to one of each. ', 7000);
    await moveTo('#floweringType0', 'Select Life Cycle', 2000, { click: true });
    await moveTo('#irrigation1', 'Select an irrigation Type', 2000, { click: true });
    await moveTo('.planting-date-picker', 'Enter cash crop planting date.  This will be reflected in you results.', 5000);
    await moveTo('.harvest-date-picker', 'Enter cash crop harvest date.  This will be reflected in you results.', 5000);
    await moveTo('[data-test="next-btn"]', 'When satisfied with your conditions, press NEXT to advance to the next screen.', 5000, { click: true });
  };

  const mySelectedCrops = async () => {
    await moveTo('.myCropsCards', 'Here are the crops you selected.', 5000);
    await moveTo('.comparisonViewButton', 'Click here to compare and contrast your selections.', 5000, { click: true });
    await moveTo('.showAllBox', 'In the sidebar select individual filters to compare by or select them all by clicking...', 5000, { click: true });
    await moveTo('.showAllButton', 'Here', 2000, { click: true });
    await moveTo('.header', 'This concludes our automated demo.  You can click on the logo to return to the beginning and get started for yourself.', 5000);
    await moveTo('[data-test="header_logo_button"]', '', 1000, { click: true });
    await moveTo('.resetBox', 'If you have added items to your List you will need to reset that list before starting over.', 6000, { click: true });
    await moveTo('.yesButton', '', 1000, { click: true });
  };

  const infosheet = async () => {
    await moveTo('.coverCropDescription', 'Here is a breif description of the crop you have selected', 5000);
    await moveTo('.imageCarousel', 'And a few images that will rotate through a carousel', 5000);
    await moveTo('.infosheetAccordion0', 'Click the header to hide or show each accordion.', 4000);
    await moveTo('.infosheetAccordionButton0', '', 1000, { click: true });
    await moveTo('.infosheetAccordionButton1', '', 1000, { click: true });
    await moveTo('.infosheetAccordionButton2', '', 1000, { click: true });
    await moveTo('.infosheetPrint', 'Here you can create then print or save a PDF copy of the infosheet.  This will open in a new tab.', 8000);
    await moveTo('.modalClose', 'Return to where you were by clicking the X.', 5000, { click: true });
    await moveTo('.cropToBasket0', 'Click the plus button to add crops to your Crop List.', 5000, { click: true });
    await moveTo('.cropToBasket1', '', 1000, { click: true });
    await moveTo('.cropToBasket2', '', 1000, { click: true });
    await moveTo('.selectedCropsButton', 'Click here to go to the My Selected Crops Section', 5000, { click: true });
    mySelectedCrops();
  };

  const cropSelector = async () => {
    // Sidebar
    await moveTo('.sidebarGoals', '', 1000, { click: true });
    await moveTo('.sidebarGoals', 'Here you can see the goals you have selected and their priority', 4000);
    await moveTo('.sidebarEditGoals', 'This button allowes you to change your selections', 3000);
    await moveTo('.sidebarGoals', '', 1000, { click: true });
    await moveTo('.sidebarFilters', 'The many filters allow you to filter down your results by values that may be more important to you.', 5000);
    await moveTo('.legend', '', 1000, { click: true });
    await moveTo('.legend', 'This legend will help you understand the color scheme on the calendar.  Hover over the colored bars to see their tooltips.', 7000);
    await moveTo('.crop3', 'Clicking on any of the crops will open up their infosheet.', 7000, { click: true });
    infosheet();
  };

  useEffect(() => {
    const keydown = async (e) => {
      if (e.key === 'd' && e.ctrlKey && e.altKey) {
        // eslint-disable-next-line default-case
        switch (progressRedux) {
          case 0:
            await landing();
          case 1:
            await location();
          case 2:
            await siteConditions();
          case 3:
            await goalSelector();
          case 4:
            await cropSelector();
        }
      }
    };

    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, [progressRedux]);

  return (
    <div className="magnifying-glass">
      <div className="caption" />
    </div>
  );
};

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
    <header style={{ width: '100vw' }}>
      <Demo />
      <Box className="header">
        <Grid container>
          <PSAHeader
            title="Cover Crop Selector"
            council={councilShorthandRedux}
            navContent={navContent}
            onLogoClick={handleLogoClick}
          />
          <Grid container sx={{ pb: isMdOrSmaller ? '3.5rem' : '1rem' }}>
            <Grid
              xs={12}
              sx={{
                position: 'absolute',
                top: isMdOrSmaller ? '85px' : '120px',
                display: 'flex',
                width: isMdOrSmaller ? '100%' : 'auto',
              }}
              mb={{ xs: 2 }}
            >
              {/* get a recommendation / browse cover crops */}
              <ToggleOptions pathname={pathname} />
            </Grid>
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
