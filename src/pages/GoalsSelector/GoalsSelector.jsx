/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/
// TODO: Goal tags are not responsive!
import {
  Typography, Grid, Box, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PSALoadingspinner } from 'shared-react-components/src';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';
import PreviousCashCrop from '../CropSidebar/PreviousCashCrop/PreviousCashCrop';
import pirschAnalytics from '../../shared/analytics';

const GoalsSelector = () => {
  // theme vars
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const selectedGoalsRedux = useSelector(
    (stateRedux) => stateRedux.goalsData.selectedGoals,
  ).reverse();

  // useState vars
  const [allGoals, setAllGoals] = useState([]);
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?${query}`,
      ).then((data) => {
        setAllGoals(data.data);
      });
    }
  }, []);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Goals' } });
  }, []);

  return (
    <Box>
      <Grid container spacing={isLargeScreen ? 4 : 1}>
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
              margin: !isLargeScreen ? '1rem' : '0',
            }}
            data-test="goals-card"
          >
            {/* title */}
            <Grid item xs={12}>
              <Typography variant="h4" align="center" data-test="title-goals">
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
              <Typography variant="subtitle2" gutterBottom align="center">
                Tap and hold for more information
              </Typography>
            </Grid>
            {/* chips */}
            <Grid
              item
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100px',
              }}
            >
              {allGoals?.length > 0 ? (
                <Grid
                  item
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  {allGoals
                    .slice()
                    // Transforming the indexOf -1 from a non selected item to 3 allows the index 0-2 to be avaliable for the selected goals
                    .sort(
                      (a, b) => (selectedGoalsRedux.indexOf(a.label) === -1
                        ? 3
                        : selectedGoalsRedux.indexOf(a.label))
                        - (selectedGoalsRedux.indexOf(b.label) === -1
                          ? 3
                          : selectedGoalsRedux.indexOf(b.label)),
                    )
                    .map((goal, key) => (
                      <Grid
                        item
                        key={key}
                        display="flex"
                        xs={isMobile ? 12 : 'auto'}
                        justifyContent="center"
                        alignItems="center"
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
              ) : (
                <PSALoadingspinner />
              )}
            </Grid>
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
              mr: !isLargeScreen ? '1rem' : '0',
              ml: !isLargeScreen ? '1rem' : '0',
              mb: !isLargeScreen ? '1rem' : '0,',
            }}
            justifyContent="center"
            data-test="cashcrop-window"
          >
            <PreviousCashCrop />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GoalsSelector;
