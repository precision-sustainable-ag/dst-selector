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
  Grid,
} from '@mui/material';
import { ArrowBack, ArrowForward, KeyboardArrowUp } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import '../../styles/cropSelector.scss';
import MyCoverCropList from '../MyCoverCropList/MyCoverCropList';
import CropCalendarView from './CropCalendarView/CropCalendarView';
import CropSidebar from '../CropSidebar/CropSidebar';
import CropTableComponent from './CropTable/CropTable';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { sortCrops } from '../../shared/constants';

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
    if (selectedGoals?.length > 0) {
      const activeCropDataShadow = activeCropData?.length > 0 ? activeCropData : state?.cropData;

      sortCrops('Average Goals', activeCropDataShadow, dispatchValue, selectedGoals, goalsSortFlag);
      setGoalsSortFlag(!goalsSortFlag);
      dispatchValue(activeCropDataShadow);
    }
  };

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && state.selectedCrops.length > 0) {
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
    <Grid
      container
      mt={{
        xs: '1%', sm: '1%', md: '2%', lg: '2%', xl: '2%',
      }}
    >

      <Grid
        item
        xl={12}
        lg={12}
        md={12}
      >
        {(size.width < 1680) && (
        <Button
          startIcon={!showSidebar ? <ArrowForward /> : <ArrowBack />}
          title="Toggle Sidebar"
          aria-label="toggle-sidebar"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? 'Show Sidebar' : 'Hide Sidebar'}
        </Button>
        )}
      </Grid>

      <Grid item xl={3} lg={3} md={3} mt={4}>
        {showSidebar && (
        <CropSidebar
          setGrowthWindow={setShowGrowthWindow}
          isListView={isListView}
          cropData={cropData}
          activeCropData={updatedActiveCropData?.length > 0 ? updatedActiveCropData : cropData}
          comparisonView={comparisonView}
          toggleComparisonView={() => { setComparisonView(!comparisonView); }}
          toggleListView={() => { setIsListView(!isListView); }}
          from="table"
        />
        )}
      </Grid>

      <Grid item xl={showSidebar ? 8 : 12} lg={showSidebar ? 8 : 12} md={showSidebar ? 8 : 12} mt={4} ml={4}>
        {/* we need a spinner or loading icon for when the length isnt yet determined */}
        {state.speciesSelectorActivationFlag ? (
          isListView ? (
            <CropCalendarView
              activeCropData={updatedActiveCropData}
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
      </Grid>
      <ScrollTop {...props}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </Grid>
  );
};

export default CropSelector;
