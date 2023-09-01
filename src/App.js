/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import {
  Snackbar, Box, Container, Grid, ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
  adaptV4Theme,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import configureStore from './reduxStore/store';
import { CustomStyles } from './shared/constants';

import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import LocationComponent from './pages/Location/Location';
import LocationConfirmation from './pages/Location/LocationConfirmation/LocationConfirmation';
import { snackHandler } from './reduxStore/sharedSlice';
import RouteNotFound from './pages/RouteNotFound/RouteNotFound';
import Auth0ProviderWithHistory from './components/Auth/Auth0ProviderWithHistory/Auth0ProviderWithHistory';
import Footer from './pages/Footer/Footer';
import About from './pages/About/About';
import SeedingRateCalculator from './pages/SeedingRateCalculator/SeedingRateCalculator';
import MixMaker from './pages/MixMaker/MixMaker';
import CoverCropExplorer from './pages/CoverCropExplorer/CoverCropExplorer';
import FeedbackComponent from './pages/Feedback/Feedback';
import InformationSheetDictionary from './pages/Help/InformationSheetDictionary/InformationSheetDictionary';
import License from './pages/License/License';
import MyCoverCropListWrapper from './pages/MyCoverCropList/MyCoverCropListWrapper/MyCoverCropListWrapper';
import Help from './pages/Help/Help';
import Profile from './pages/Profile/Profile';

import './styles/App.scss';
import './styles/parent.scss';
import 'mdbreact/dist/css/mdb.css';
import './styles/progressBar.css';

const store = configureStore();

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

const App = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={csTheme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={15000}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Auth0ProviderWithHistory>
              <Suspense fallback={<div>Loading..</div>}>
                <Box className="contentWrapper" id="mainContentWrapper">
                  <Header />
                  <Container disableGutters maxWidth={false}>
                    <Box className="contentContainer">

                      <Switch>
                        <Route
                          path="/"
                          render={() => (
                            <Grid container item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                              <LoadRelevantRoute />
                            </Grid>
                          )}
                          exact
                        />
                        <Route path="/explorer" component={CoverCropExplorer} exact />
                        <Route path="/about" component={About} exact />
                        <Route path="/help" component={Help} exact />
                        <Route path="/feedback" component={FeedbackComponent} exact />
                        <Route path="/profile" component={Profile} exact />
                        <Route path="/my-cover-crop-list" component={MyCoverCropListWrapper} exact />
                        <Route path="/seeding-rate-calculator" component={SeedingRateCalculator} exact />
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
                <Footer />
              </Suspense>
            </Auth0ProviderWithHistory>
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>

);

export default App;

const LoadRelevantRoute = () => {
  const [calcHeight, setCalcHeight] = useState(0);

  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  useEffect(() => {
    const parentDocHeight = document
      .getElementById('mainContentWrapper')
      .getBoundingClientRect().height;
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;

    const calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);

  switch (progressRedux) {
    case 0:
      return (
        <Landing
          title="Decision Support Tool"
          height={calcHeight}
          bg="/images/cover-crop-field.png"
        />
      );
    case 1:
      return (
        <LocationComponent
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 2:
      return (
        <LocationConfirmation
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 3:
      return (
        <LocationConfirmation
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 4:
      return (
        <GoalsSelector height={calcHeight} title="Species Selector Tool | Decision Support Tool" />
      );
    case 5:
      return (
        <CropSelector height={calcHeight} title="Species Selector Tool | Decision Support Tool" />
      );

    default:
      return <RouteNotFound height={calcHeight} />;
  }
};

// eslint-disable-next-line no-unused-vars
const SnackbarComponent = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const snackOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.snackOpen);
  const snackMessageRedux = useSelector((stateRedux) => stateRedux.sharedData.snackMessage);
  const snackVerticalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackVertical);
  const snackHorizontalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackHorizontal);

  const handleSnackClose = () => {
    dispatchRedux(snackHandler({ snackOpen: false, snackMessage: '' }));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: snackVerticalRedux,
          horizontal: snackHorizontalRedux,
        }}
        key={{
          vertical: snackVerticalRedux,
          horizontal: snackHorizontalRedux,
        }}
        autoHideDuration={3000}
        open={snackOpenRedux}
        onClose={handleSnackClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={snackMessageRedux}
      />
    </div>
  );
};
