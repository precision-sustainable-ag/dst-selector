/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/*
  This file contains the CropSelector and its styles.
  The CropSelector is the top level component for the crop selector tool and allows users to choose crops based on their needs.
*/

import { ArrowBack, ArrowForward, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Fab, Grid, useScrollTrigger, Zoom } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';
import SkipContent from '../../components/SkipContent/SkipContent';
import { setSidebarWidth } from '../../reduxStore/pageSlice';
import pirschAnalytics from '../../shared/analytics';
import useWindowSize from '../../shared/constants';
import CropSidebar from '../CropSidebar/CropSidebar';
// import '../../styles/cropSelector.scss';
import MyCoverCropList from '../MyCoverCropList/MyCoverCropList';
import CropCalendarView from './CropCalendarView/CropCalendarView';
import CropTable from './CropTable/CropTable';

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
  const speciesSelectorActivationFlagRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag,
  );

  // useState vars
  const [showGrowthWindow, setShowGrowthWindow] = useState(true);
  const [listView, setListView] = useState(true);
  const [comparisonView, setComparisonView] = useState(false);
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Get A Recommendation' } });
  }, []);

  useEffect(() => {
    pirschAnalytics('Get A Recommendation', {
      meta: { view: listView ? 'Calendar View' : 'List View' },
    });
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

  const size = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(true);

  const sidebarRef = useRef(null);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (sidebarRef.current) {
      const sidebarWidth = sidebarRef.current.offsetWidth;
      dispatchRedux(setSidebarWidth(sidebarWidth));
    }
  }, [dispatchRedux]);
  return (
    <Grid container spacing={3}>
      <Grid
        ref={sidebarRef}
        size={{
          xl: 3,
          lg: 4,
          md: 4,
          sm: 12,
          xs: 12,
        }}
      >
        <SkipContent
          href="#crop-form"
          text="Skip to form"
          sx={{
            '&:focus': {
              top: '16px',
              transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1)',
            },
          }}
        />

        {size.width < 1680 && (
          <PSAButton
            startIcon={!showSidebar ? <ArrowForward /> : <ArrowBack />}
            buttonType=""
            hoverText="Toggle Sidebar"
            aria-label="toggle-sidebar"
            onClick={() => setShowSidebar(!showSidebar)}
            title={!showSidebar ? 'Show Sidebar' : 'Hide Sidebar'}
          />
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
      <SkipContent
        href="#page-footer"
        text="Skip to bottom"
        sx={{
          left: 'auto',
          right: '16px',
          '&:focus': {
            top: '16px',
            transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1)',
          },
        }}
      />
      <Grid
        id="crop-form"
        size={{
          xl: showSidebar ? 9 : 12,
          lg: showSidebar ? 8 : 12,
          md: showSidebar ? 8 : 12,
          sm: 12,
          xs: 12,
        }}
      >
        {/* we need a spinner or loading icon for when the length isnt yet determined */}
        {speciesSelectorActivationFlagRedux ? (
          listView ? (
            <CropCalendarView setListView={setListView} listView={listView} />
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
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Grid>
  );
};

export default CropSelector;
