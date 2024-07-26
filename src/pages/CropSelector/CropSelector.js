/* eslint-disable max-len */
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
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import '../../styles/cropSelector.scss';
import MyCoverCropList from '../MyCoverCropList/MyCoverCropList';
import CropCalendarView from './CropCalendarView/CropCalendarView';
import CropSidebar from '../CropSidebar/CropSidebar';
import CropTable from './CropTable/CropTable';
import { setSidebarWidth } from '../../reduxStore/pageSlice';
import pirschAnalytics from '../../shared/analytics';

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
  // redux vars
  const activeCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropIds);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const speciesSelectorActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag);

  // useState vars
  const [showGrowthWindow, setShowGrowthWindow] = useState(true);
  const [listView, setListView] = useState(true);
  const [comparisonView, setComparisonView] = useState(false);
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Get A Recommendation' } });
  }, []);

  useEffect(() => {
    pirschAnalytics('Get A Recommendation', { meta: { view: listView ? 'Calendar View' : 'List View' } });
  }, [listView]);

  useEffect(() => {
    if (cropDataRedux) {
      if (cropDataRedux?.length > 0) {
        if (selectedGoalsRedux?.length > 0) {
          const activeCropDataShadow = cropDataRedux;
          selectedGoalsRedux
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
          setCropData(cropDataRedux);
        }
      }
    }
    return () => {
      setCropData([]);
    };
  }, [cropDataRedux, selectedGoalsRedux]);

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

  const sidebarRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (sidebarRef.current) {
      const sidebarWidth = sidebarRef.current.offsetWidth;
      dispatchRedux(setSidebarWidth(sidebarWidth));
    }
  }, [dispatchRedux, sidebarRef]);
  return (
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12} ref={sidebarRef}>
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
        {showSidebar && (
          <CropSidebar
            setGrowthWindow={setShowGrowthWindow}
            cropData={cropData}
            activeCropData={cropDataRedux.filter((crop) => activeCropIdsRedux.includes(crop.id))}
            comparisonView={comparisonView}
            setComparisonView={setComparisonView}
            from="table"
          />
        )}
      </Grid>

      <Grid item xl={showSidebar ? 9 : 12} lg={showSidebar ? 9 : 12} md={showSidebar ? 9 : 12} sm={12} xs={12}>
        {/* we need a spinner or loading icon for when the length isnt yet determined */}
        {speciesSelectorActivationFlagRedux ? (
          listView ? (
            <CropCalendarView
              setListView={setListView}
              listView={listView}
            />
          ) : (
            <CropTable
              setListView={setListView}
              listView={listView}
              showGrowthWindow={showGrowthWindow}
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
    </Grid>
  );
};

export default CropSelector;
