/* eslint-disable no-nested-ternary */
/*
  This file contains the CropSelector and its styles.
  The CropSelector is the top level component for the crop selector tool and allows users to choose crops based on their needs.
*/

import {
  Button,
  Fab,
  useScrollTrigger,
  Zoom,
  Box,
} from '@mui/material';
import { ArrowBack, ArrowForward, KeyboardArrowUp } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import '../../styles/cropSelector.scss';
import MyCoverCropList from '../MyCoverCropList/MyCoverCropList';
import CropCalendarView from './CropCalendarView/CropCalendarView';
import CropSidebarComponent from '../CropSidebar/CropSidebar';
import CropTableComponent from './CropTable/CropTable';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { sortCrops } from '../../shared/constants';

// const _ = require('lodash');

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 180,
  });
  const handleBackToTopClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('.topHeader');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleBackToTopClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 2,
          right: 2,
        }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const CropSelector = (props) => {
  const { state, dispatch } = useContext(Context);
  const [showGrowthWindow, setShowGrowthWindow] = useState(true);
  // const [sortPreference, setSortPreference] = useState('desc');
  const [goalsSortFlag, setGoalsSortFlag] = useState(true);
  const { selectedGoals, activeCropData } = state;
  const [isListView, setIsListView] = useState(true);
  const [comparisonView, setComparisonView] = useState(false);
  const [cropData, setCropData] = useState([]);
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  const [handleConfirm, setHandleConfirm] = useState(false);

  const sortCropsBy = () => {
    const dispatchValue = (updatedCropData) => dispatch({
      type: 'UPDATE_ACTIVE_CROP_DATA',
      data: {
        value: updatedCropData,
      },
    });
      // const { selectedGoals } = state;
    if (selectedGoals?.length > 0) {
      const activeCropDataShadow = activeCropData?.length > 0 ? activeCropData : state?.cropData;

      sortCrops('Average Goals', activeCropDataShadow, dispatchValue, selectedGoals, goalsSortFlag);
      setGoalsSortFlag(!goalsSortFlag);
      dispatchValue(activeCropDataShadow);
    }
  };

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && state.selectedCrops.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [state.selectedCrops, state.myCoverCropListLocation]);

  useEffect(() => {
    sortCropsBy();
  }, []);

  useEffect(() => {
    setUpdatedActiveCropData(activeCropData);
  }, [activeCropData]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop selector');
    }
  }, [state.consent]);

  useEffect(() => {
    if (state.selectedGoals?.length === 0) {
      dispatch({
        type: 'UPDATE_PROGRESS',
        data: {
          type: 'DECREMENT',
        },
      });
    }
  }, [state.selectedGoals, dispatch]);

  useEffect(() => {
    if (state?.cropData) {
      if (state?.cropData?.length > 0) {
        // sort crop data by goal priority

        if (selectedGoals?.length > 0) {
          const activeCropDataShadow = state?.cropData;
          selectedGoals
            .slice()
            .reverse()
            .forEach((goal) => {
              activeCropDataShadow.sort((a, b) => {
                if (a[goal] && b[goal]) {
                  if (a[goal] > b[goal]) {
                    return -1;
                  }
                  return 1;
                }
                return 0;
              });
            });
          setCropData(activeCropDataShadow);
        } else {
          setCropData(state?.cropData);
        }
      }
    }
    return () => {
      setCropData([]);
    };
  }, [state?.cropData, selectedGoals]);

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  }
  const size = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="container-fluid mt-2">
      <div className="row cropSelectorRow mt-3">
        {/* {Shows Collapsible icon for screen width < 1680px } */}
        {size.width < 1680 && (
          <div className="col-12 mb-2">
            <Button
              startIcon={!showSidebar ? <ArrowForward /> : <ArrowBack />}
              title="Toggle Sidebar"
              aria-label="toggle-sidebar"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {!showSidebar ? 'Show Sidebar' : 'Hide Sidebar'}
            </Button>
          </div>
        )}

        <div
          className="col-md-2 col-sm-12"
          style={
            showSidebar
              ? { display: 'block', visibility: 'visible' }
              : { display: 'none', visibility: 'hidden' }
          }
        >
          <CropSidebarComponent
            setGrowthWindow={setShowGrowthWindow}
            isListView={isListView}
            cropData={cropData}
            activeCropData={updatedActiveCropData?.length > 0 ? updatedActiveCropData : cropData}
            comparisonView={comparisonView}
            toggleComparisonView={() => { setComparisonView(!comparisonView); }}
            toggleListView={() => { setIsListView(!isListView); }}
            from="table"
          />
        </div>

        <div className={showSidebar ? 'col-md-10 col-sm-12' : 'col-md-12 col-sm-12'}>
          {/* we need a spinner or loading icon for when the length isnt yet determined */}
          {state.speciesSelectorActivationFlag ? (
            isListView ? (
              <CropCalendarView
                // cropData={cropData}
                activeCropData={updatedActiveCropData}
                // showGrowthWindow={showGrowthWindow}
                // sortAllCrops={sortCropsBy}
                // sortPreference={sortPreference}
              />
            ) : (
              <CropTableComponent
                cropData={cropData}
                setCropData={setCropData}
                activeCropData={updatedActiveCropData}
                showGrowthWindow={showGrowthWindow}
                sortAllCrops={sortCropsBy}
                sortPreference={goalsSortFlag}
              />
            )
          ) : (
            <MyCoverCropList comparisonView={comparisonView} />
          )}
        </div>
        <ScrollTop {...props}>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </div>
  );
};

export default CropSelector;
