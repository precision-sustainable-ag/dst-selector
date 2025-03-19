/* eslint-disable import/no-extraneous-dependencies */
/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import {
  Snackbar,
  Box,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
  adaptV4Theme,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PSAProfile, PSATheme } from 'shared-react-components/src';
import { deepmerge } from '@mui/utils';

import configureStore from './reduxStore/store';
import { CustomStyles } from './shared/constants';

import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import Location from './pages/Location/Location';
// import LocationConfirmation from './pages/Location/LocationConfirmation/SiteConditions';
import { snackHandler } from './reduxStore/sharedSlice';
import RouteNotFound from './pages/RouteNotFound/RouteNotFound';
import Auth0ProviderWithHistory from './components/Auth/Auth0ProviderWithHistory/Auth0ProviderWithHistory';
import Footer from './pages/Footer/Footer';
import About from './pages/About/About';
import SeedingRateCalculator from './pages/SeedingRateCalculator/SeedingRateCalculator';
import MixMaker from './pages/MixMaker/MixMaker';
import CoverCropExplorer from './pages/CoverCropExplorer/CoverCropExplorer';
import InformationSheetDictionary from './pages/Help/InformationSheetDictionary/InformationSheetDictionary';
import License from './pages/License/License';
import MyCoverCropListWrapper from './pages/MyCoverCropList/MyCoverCropListWrapper/MyCoverCropListWrapper';
import Help from './pages/Help/Help';
import Feedback from './pages/Feedback/Feedback';

import { updateStateInfo } from './reduxStore/mapSlice';

import './styles/App.scss';
// bootstrap import
import 'mdbreact/dist/css/mdb.css';
import SiteConditions from './pages/Location/LocationConfirmation/SiteConditions';
import '@fontsource/ibm-plex-sans';
import SkipContent from './components/SkipContent/SkipContent';

const store = configureStore();

if (window.Storage) {
  window.Storage = store;
}

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

// AdaptV4Theme has been depreciated and v5 is the new version.  TODO: look into update
const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: CustomStyles().lightGreen,
      },
      secondary: {
        main: CustomStyles().lighterGreen,
      },
      dark: {
        main: '#000',
      },
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontWeight: 'normal',
          fontSize: CustomStyles().defaultFontSize,
          backgroundColor: CustomStyles().secondaryProgressBtnColor,
          color: 'black',
          borderRadius: CustomStyles().mildlyRoundedRadius,
        },
        arrow: {},
      },
      MuiChip: {
        root: {
          '&&:hover': {
            boxShadow: '0 0 3px 0 black',
          },
          border: '1px solid #777',
          '&:focus': {
            boxShadow: '0 0 0 2px black',
          },
        },
        colorSecondary: {
          '&, &&:hover, &&:focus': {
            backgroundColor: CustomStyles().greenishWhite,
            color: 'rgba(0,0,0,0.9)',
            fontWeight: 'normal',
          },
        },
        colorPrimary: {
          '&, &&:hover, &&:focus': {
            backgroundColor: CustomStyles().darkGreen,
            color: 'white',
            fontWeight: 'normal',
          },
        },
        sizeSmall: {
          fontSize: '1.2rem',
        },
      },
      MuiDialog: {
        root: {
          zIndex: 1000003,
        },
      },
    },
  }),
);

const csTheme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
});

export const dstTheme = createTheme(deepmerge(PSATheme, csTheme));

const speed = 1;

let lastCaption;

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms * speed);
});

const Demo = () => {
  const dispatchRedux = useDispatch();

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
      console.warn(sel);
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

  const demo = async () => {
    // Landing
    dispatchRedux(updateStateInfo({
      stateLabel: 'Georgia',
      stateId: 14,
      councilShorthand: 'SCCC',
      councilLabel: 'Southern Cover Crops Council',
    }));

    await moveTo('[data-test="state-selector-dropdown"]', 'Select your state from this drop-down, or click it on the map.', 5000);
    await moveTo('[data-test="next-btn"]', 'After selecting your state, press NEXT to advance to the next screen.', 3000, { click: true });

    // Location
    await moveTo('.mapboxgl-ctrl-geocoder--input', 'Enter your location here.', 500, { value: '72 Tanglewood', keyspeed: 100 });
    await moveTo('.suggestions li:nth-child(1)', 'Select from the list.', 2000, { mouseup: true });
    await moveTo('[data-test="next-btn"]', 'After selecting your location, press NEXT to advance to the next screen.', 3000, { click: true });

    // SiteConditions
    await moveTo('[data-test="soil-composition-card"]', 'This shows your soil composition based on soil survey data (SSURGO).', 3000);
    await moveTo('[data-test="frost-dates-card"]', 'This shows 30-year average frost dates for your location.', 3000);
    await moveTo('[data-test="precipitation-card"]', 'This shows average monthly and yearly precipitation for your location.', 3000);

    await moveTo(
      '[data-test="soil-drainage-card"]',
      'This shows your soil drainage based on soil survey data.<p>You can make changes if appropriate for your location.</p>',
      3000,
    );
    await moveTo('[data-test="drainage-class-chip-2"]', '', 1000, { click: true });

    await moveTo(
      '[data-test="flooding-frequency-card"]',
      'This shows the annual probability of a flood event.<p>You can make changes if appropriate for your location.</p>',
      3000,
    );
    await moveTo('[data-test="flooding-options-chip-2"]', '', 1000, { click: true });

    await moveTo('[data-test="next-btn"]', 'When satisfied with your conditions, press NEXT to advance to the next screen.', 3000, { click: true });

    // GoalsSelector
    // CropSelector
  };

  useEffect(() => {
    const keydown = (e) => {
      if (e.key === 'd' && e.ctrlKey && e.altKey) {
        demo(e);
      }
    };

    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <div className="magnifying-glass">
      <div className="caption" />
    </div>
  );
};

const App = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={dstTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <Suspense fallback={<div>Loading..</div>}>
              <Demo />
              <Box>
                <SkipContent href="#main-content" text="Skip to content" />
                <Header />
                <Container disableGutters maxWidth={false} id="main-content">
                  <Box mr={1} ml={1} mt={1} mb={1}>
                    <Switch>
                      <Route path="/" render={() => <LoadRelevantRoute />} exact />
                      <Route path="/explorer" component={CoverCropExplorer} exact />
                      <Route path="/about" component={About} exact />
                      <Route path="/help" component={Help} exact />
                      <Route path="/feedback" render={Feedback} exact />
                      <Route path="/profile" render={() => <PSAProfile />} exact />
                      <Route path="/my-cover-crop-list" component={MyCoverCropListWrapper} exact />
                      <Route
                        path="/seeding-rate-calculator"
                        component={SeedingRateCalculator}
                        exact
                      />
                      <Route path="/data-dictionary" component={InformationSheetDictionary} exact />
                      <Route path="/license" render={() => <License licenseType="MIT" />} exact />
                      <Route
                        path="/ag-informatics-license"
                        render={() => <License licenseType="AgInformatics" />}
                        exact
                      />
                      <Route path="/mix-maker" component={MixMaker} exact />
                      <Route component={RouteNotFound} />
                    </Switch>
                  </Box>
                </Container>
              </Box>
              <SnackbarComponent />
              <SkipContent
                href="#main-content"
                text="Skip to content"
                sx={{
                  top: 'auto',
                  bottom: '-80px',
                  '&:focus': {
                    bottom: '60px',
                    transition: 'bottom 225ms cubic-bezier(0, 0, 0.2, 1)',
                  },
                }}
              />
              <Footer />
            </Suspense>
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>
);

export default App;

const LoadRelevantRoute = () => {
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  switch (progressRedux) {
    case 0:
      return <Landing />;
    case 1:
      return <Location />;
    case 2:
      return <SiteConditions />;
    case 3:
      return <GoalsSelector />;
    case 4:
      return <CropSelector />;

    default:
      return <RouteNotFound />;
  }
};

// eslint-disable-next-line no-unused-vars
const SnackbarComponent = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const snackOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.snackOpen);
  const snackMessageRedux = useSelector((stateRedux) => stateRedux.sharedData.snackMessage);

  const snackHorizontal = 'right';
  const snackVertical = 'bottom';

  const handleSnackClose = () => {
    dispatchRedux(snackHandler({ snackOpen: false, snackMessage: '' }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: snackVertical,
        horizontal: snackHorizontal,
      }}
      key={snackVertical + snackHorizontal}
      autoHideDuration={3000}
      open={snackOpenRedux}
      onClose={handleSnackClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={snackMessageRedux}
      sx={{ marginBottom: '40px' }}
    />
  );
};
