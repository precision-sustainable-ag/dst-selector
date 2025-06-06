/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/
// TODO: Goal tags are not responsive!
import {
  Typography, Grid, Box, useMediaQuery, useTheme,
  Chip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';
import PreviousCashCrop from '../CropSidebar/PreviousCashCrop/PreviousCashCrop';
import pirschAnalytics from '../../shared/analytics';
import {
  updateSelectedFlowering, updateSelectedIrrigation, updateSelectedSeason, updateTags,
} from '../../reduxStore/terminationSlice';
import {
  setIrrigationFilter,
} from '../../reduxStore/filterSlice';

const GoalsSelector = () => {
  // theme vars
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // redux vars
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const selectedGoalsRedux = useSelector(
    (stateRedux) => stateRedux.goalsData.selectedGoals,
  ).reverse();

  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  const selectedSeason = useSelector((stateRedux) => stateRedux.terminationData.selectedSeason);
  const selectedFlowering = useSelector((stateRedux) => stateRedux.terminationData.selectedFlowering);
  const selectedIrrigation = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);

  const dispatch = useDispatch();

  // useState vars
  const [allGoals, setAllGoals] = useState([]);

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const floweringTypes = ['Annual', 'Perennial'];

  const irrigationType = ['Rainfed', 'Irrigated'];

  const handleSelectedSeason = (season) => {
    if (selectedSeason === season) {
      dispatch(updateSelectedSeason(null));
    } else {
      dispatch(updateSelectedSeason(season));
    }
  };

  const handleSelectedFlowering = (floweringType) => {
    if (floweringType === selectedFlowering) {
      dispatch(updateSelectedFlowering(null));
    } else {
      dispatch(updateSelectedFlowering(floweringType));
    }
  };

  const handleSelectedIrrigation = (irrigation) => {
    dispatch(updateSelectedIrrigation(irrigation));
    dispatch(setIrrigationFilter(irrigation === irrigationType[1]));
  };

  useEffect(() => {
    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?${queryStringRedux}`,
    ).then((data) => {
      setAllGoals(data.data);
    });
    pirschAnalytics('Visited Page', { meta: { visited: 'Goals' } });
  }, []);

  useEffect(() => {
    if (councilShorthandRedux === 'WCCC') {
      const selectedTags = allGoals.filter((goal) => selectedGoalsRedux.includes(goal.label))
        .map((goal) => goal.tags).flat();
      const uniqueTags = [...new Set(selectedTags)];
      dispatch(updateTags(uniqueTags));
    }
  }, [selectedGoalsRedux]);

  return (
    <Box>
      <Grid container spacing={isLargeScreen ? 4 : 1}>
        {/* top row */}
        <Grid container item lg={12} spacing={isLargeScreen ? 4 : 1}>
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
                  Cover Crop Goals
                </Typography>
              </Grid>
              {/* sub-title */}
              <Grid item xs={12}>
                <Typography
                  variant={isMobile ? 'subtitle2' : 'subtitle1'}
                  align="center"
                  gutterBottom
                >
                  Select up to 3 goals in order of importance.
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
                  <PSALoadingSpinner />
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
      </Grid>

      {/* =============================================== */}

      {/* Bottom Row */}
      {councilShorthandRedux === 'WCCC'
      && (
      <Grid
        container
        item
        lg={8}
        spacing={isLargeScreen ? 4 : 0}
        sx={{
          boxSizing: 'border-box',
          borderRadius: '15px',
          border: '2px solid #598445',
          // margin: !isLargeScreen ? '1rem' : '0',
          mx: 'auto',
          mt: isLargeScreen ? 4 : 2,
          mb: isLargeScreen ? 4 : 2,
        }}
        className="additionalFilters"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Additional Cover Crop Filters
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle2' : 'subtitle1'}
            align="center"
            gutterBottom
          >
            These options will help provide the best cover crop termination information on your information sheet.
          </Typography>

        </Grid>

        {/* weather grid */}
        {/* <Grid item container lg={3}> */}
        <Grid
          item
          container
          lg={4}
          sx={{
            p: '1rem',
            mr: !isLargeScreen ? '1rem' : '0',
            ml: !isLargeScreen ? '1rem' : '0',
            mb: !isLargeScreen ? '1rem' : '0,',

          }}
          data-test="goals-card"
        >
          <Grid item xs={12}>
            <Typography variant="h5" align="center" data-test="title-goals">
              Planting Season
            </Typography>
          </Grid>
          {/* sub-title */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
          >
            {seasons.map((season, i) => (
              <Chip
                key={season}
                label={season}
                id={(`season${i}`)}
                clickable
                style={{ margin: '0.3rem' }}
                sx={{
                  '&:focus': {
                    boxShadow: '0 0 0 2px black',
                    maxWidth: !isLargeScreen ? '45%' : 'auto',
                  },
                }}
                onClick={() => handleSelectedSeason(season)}
                color={selectedSeason === season ? 'primary' : 'secondary'}
              />
            ))}

          </Grid>
        </Grid>

        {/* Annual/Perennial */}
        <Grid
          item
          container
          lg={4}
          sx={{
            // border: '2px solid #598445',
            p: '1rem',
            mr: !isLargeScreen ? '1rem' : '0',
            ml: !isLargeScreen ? '1rem' : '0',
            mb: !isLargeScreen ? '1rem' : '0,',
          }}
          justifyContent="center"
          data-test="cashcrop-window"
        >
          <Grid item xs={12}>
            <Typography variant="h5" align="center" data-test="title-goals">
              Lifecycle
            </Typography>
          </Grid>
          {/* sub-title */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {floweringTypes.map((floweringType, i) => (
              <Chip
                key={floweringType}
                label={floweringType}
                id={(`floweringType${i}`)}
                clickable
                style={{ margin: '0.3rem' }}
                sx={{
                  '&:focus': {
                    boxShadow: '0 0 0 2px black',
                  },
                }}
                onClick={() => handleSelectedFlowering(floweringType)}
                color={selectedFlowering === floweringType ? 'primary' : 'secondary'}
              />
            ))}

          </Grid>

        </Grid>

        {/* Water */}
        <Grid
          item
          container
          lg={4}
          sx={{
            boxSizing: 'border-box',
            borderRadius: '15px',
            // border: '2px solid #598445',
            p: '1rem',
            mr: !isLargeScreen ? '1rem' : '0',
            ml: !isLargeScreen ? '1rem' : '0',
            mb: !isLargeScreen ? '1rem' : '0,',
          }}
          justifyContent="center"
          data-test="cashcrop-window"
        >
          <Grid item xs={12}>
            <Typography variant="h5" align="center" data-test="title-goals">
              Will you Irrigate?
            </Typography>
          </Grid>
          {/* sub-title */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {irrigationType.map((irrigation, i) => (
              <Chip
                key={irrigation}
                label={i === 0 ? 'No' : 'Yes'}
                id={`irrigation${i}`}
                clickable
                style={{ margin: '0.3rem' }}
                sx={{
                  '&:focus': {
                    boxShadow: '0 0 0 2px black',
                  },
                }}
                onClick={() => handleSelectedIrrigation(irrigation)}
                color={selectedIrrigation === irrigation ? 'primary' : 'secondary'}
              />
            ))}

          </Grid>
        </Grid>

      </Grid>
      )}
    </Box>
  );
};
export default GoalsSelector;
