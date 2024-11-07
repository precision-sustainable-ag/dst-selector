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
import React, { Suspense } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PSAForm } from 'shared-react-components/src';
import pirschAnalytics from './shared/analytics';

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
import Profile from './pages/Profile/Profile';

import './styles/App.scss';
// bootstrap import
import 'mdbreact/dist/css/mdb.css';
import SiteConditions from './pages/Location/LocationConfirmation/SiteConditions';

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
      <Provider store={store}>
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <Suspense fallback={<div>Loading..</div>}>
              <Box>
                <Header />
                <Container disableGutters maxWidth={false}>
                  <Box mr={1} ml={1} mt={1} mb={1}>
                    <Switch>
                      <Route path="/" render={() => <LoadRelevantRoute />} exact />
                      <Route path="/explorer" component={CoverCropExplorer} exact />
                      <Route path="/about" component={About} exact />
                      <Route path="/help" component={Help} exact />
                      <Route
                        path="/feedback"
                        render={() => (
                          <PSAForm
                            apiUrl="https://developfeedback.covercrop-data.org/v1/issues"
                            submitMessage="Feedback submitted successfully"
                            headerTitle="Cover Crop Species Selector Feedback"
                            fields={[
                              {
                                type: 'text',
                                label: 'Title',
                                description: 'Give your feedback a short descriptive title.',
                                props: {
                                  placeholder: 'Enter Your Title',
                                  variant: 'outlined',
                                  'data-test': 'feedback_title',
                                },
                                name: 'feedback_title',
                                required: true,
                              },
                              {
                                type: 'text',
                                label: 'Message',
                                description: 'Explain your feedback as thoroughly as you can. Your feedback will help us improve the experience.',
                                props: {
                                  placeholder: 'Enter Your Feedback',
                                  multiline: true,
                                  variant: 'outlined',
                                  fullWidth: true,
                                  minRows: 3,
                                  'data-test': 'feedback_message',
                                },
                                name: 'feedback_message',
                                required: true,
                              },
                              {
                                type: 'checkbox',
                                label: 'Topic',
                                description: 'Select the type of feedback you are providing.',
                                name: 'feedback_checkbox',
                                required: true,
                                options: [
                                  {
                                    label: 'About the Cover Crop Data',
                                    props: {
                                      name: 'feedback_data',
                                      'data-test': 'feedback_data',
                                    },
                                  },
                                  {
                                    label: 'About the Website',
                                    props: {
                                      name: 'feedback_website',
                                      'data-test': 'feedback_website',
                                    },
                                  },
                                  {
                                    label: 'Other',
                                    props: {
                                      name: 'feedback_other',
                                      'data-test': 'feedback_other',
                                    },
                                  },
                                ],
                              },
                              {
                                type: 'text',
                                label: 'Name',
                                description: 'Provide your name',
                                props: {
                                  placeholder: 'Enter Name',
                                  variant: 'outlined',
                                  'data-test': 'feedback_name',
                                },
                                name: 'feedback_name',
                              },
                              {
                                type: 'text',
                                label: 'Email',
                                description: 'Provide your email',
                                props: {
                                  placeholder: 'Enter Email',
                                  variant: 'outlined',
                                  'data-test': 'feedback_email',
                                },
                                name: 'feedback_email',
                              },
                            ]}
                            buttons={[
                              {
                                props: {
                                  title: 'Submit',
                                  variant: 'contained',
                                  color: 'primary',
                                  children: 'Submit',
                                },
                                action: 'submit',
                              },
                            ]}
                            pirschAnalytics={pirschAnalytics}
                          />
                        )}
                        exact
                      />
                      <Route path="/profile" component={Profile} exact />
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
