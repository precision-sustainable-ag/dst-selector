/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unstable-nested-components */
/*
  Index.js is the top level component
  styled using ./styles/parent.scss, ./styles/progressBar.css, CustomStyles from ./shared/constants
*/

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
  adaptV4Theme,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createTheme } from '@mui/material/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './store/Store';
import './styles/parent.scss';
import 'mdbreact/dist/css/mdb.css';
import './styles/progressBar.css';
import Footer from './pages/Footer/Footer';
import About from './pages/About/About';
import SeedingRateCalculator from './pages/SeedingRateCalculator/SeedingRateCalculator';
import MixMaker from './pages/MixMaker/MixMaker';
import CoverCropExplorer from './pages/CoverCropExplorer/CoverCropExplorer';
import FeedbackComponent from './pages/Feedback/Feedback';
import { CustomStyles } from './shared/constants';
import InformationSheetDictionary from './pages/Help/InformationSheetDictionary/InformationSheetDictionary';
import License from './pages/License/License';
import MyCoverCropListWrapper from './pages/MyCoverCropList/MyCoverCropListWrapper/MyCoverCropListWrapper';
import Help from './pages/Help/Help';

const withFooter = (WrappedComponent) => () => [<WrappedComponent key="1" />, <Footer key="2" />];

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
const RouteNotFound = () => (
  <section className="page_404">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="col-sm-12 text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>

            <div className="contant_box_404">
              <h3 className="h2">Look like you're lost</h3>

              <p>The page you are looking for is not available!</p>

              <a href="/" className="link_404">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const csTheme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
});

const Wrapper = () => (
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
        <Store>
          <BrowserRouter>
            <Suspense fallback={<div>Loading..</div>}>
              <Switch>
                <Route path="/" component={App} exact />
                <Route path="/explorer" component={CoverCropExplorer} exact />
                <Route path="/about" component={About} exact />
                <Route path="/help" component={Help} exact />
                <Route path="/feedback" component={FeedbackComponent} exact />
                <Route path="/my-cover-crop-list" component={MyCoverCropListWrapper} exact />
                <Route path="/seeding-rate-calculator" component={SeedingRateCalculator} exact />
                <Route path="/data-dictionary" component={InformationSheetDictionary} exact />
                <Route path="/license" component={() => <License licenseType="MIT" />} exact />
                <Route
                  path="/ag-informatics-license"
                  component={() => <License licenseType="AgInformatics" />}
                  exact
                />
                <Route path="/mix-maker" component={MixMaker} exact />

                <Route component={RouteNotFound} />
              </Switch>
            </Suspense>

            {/* <App /> */}
          </BrowserRouter>
        </Store>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

const WrapperWithFooter = withFooter(Wrapper);

ReactDOM.render(<WrapperWithFooter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
