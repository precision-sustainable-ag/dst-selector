/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/
// TODO: Goal tags are not responsive!
import { Typography, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';
import { updateDateRange } from '../../reduxStore/cropSlice';
import PreviousCashCrop from '../CropSidebar/PreviousCashCrop/PreviousCashCrop';
const GoalsSelector = () => {
  const dispatchRedux = useDispatch();

  // theme vars
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumOrLargeScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  // useState vars
  const [allGoals, setAllGoals] = useState([]);
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  useEffect(() => {
    // if (from === 'table') {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      dispatchRedux(
        updateDateRange({
          startDate: dateRange.startDate.toISOString().substring(0, 10),
          endDate: dateRange.endDate.toISOString().substring(0, 10),
        }),
      );
    }
    // }
  }, [dateRange]);
  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?${query}`,
      ).then((data) => {
        setAllGoals(data.data);
      });
    }
  }, []);
  return (
    <Box>
      <Grid container spacing={3}>
        {/* holds goal selector */}
        <Grid item container lg={6} justifyContent={isLargeScreen ? 'flex-end' : 'center'}>
          <Grid
            item
            container
            lg={10}
            sx={{
              boxSizing: 'border-box',
              borderRadius: '15px',
              border: '2px solid #598445',
              p: '1rem',
              margin: isMediumOrLargeScreen ? '1rem' : '0',
            }}
          >
            {/* title */}
            <Grid item xs={12}>
              <Typography variant={'h4'} align="center">
                Goals
              </Typography>
            </Grid>
            {/* sub-title */}
            <Grid item xs={12}>
              <Typography
                variant={isMobile ? 'subtitle2' : 'subtitle1'}
                align="center"
                gutterBottom
              >
                Select 1 to 3 goals in order of importance.
              </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant={'subtitle2'} gutterBottom align="center">
                Tap and hold for more information
              </Typography>
            </Grid>
            {/* chips */}
            {allGoals?.length > 0 && (
              <Grid item container spacing={2} justifyContent="center" alignItems="center">
                {allGoals.map((goal, key) => (
                  <Grid
                    item
                    key={key}
                    display={'flex'}
                    xs={isMobile ? 12 : 'auto'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <GoalTag
                      key={key}
                      goal={goal}
                      id={key}
                      goaltTitle={goal.label}
                      goalDescription={goal.description}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* holds the date selector */}
        <Grid item container lg={6}>
          <Grid
            item
            container
            lg={10}
            sx={{
              boxSizing: 'border-box',
              borderRadius: '15px',
              border: '2px solid #598445',
              p: '1rem',
              margin: isMediumOrLargeScreen ? '1rem' : '0',
            }}
            justifyContent={'center'}
          >
            <PreviousCashCrop setDateRange={setDateRange} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GoalsSelector;
