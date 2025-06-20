/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/
// TODO: Goal tags are not responsive!
import {
  Typography, Grid, useMediaQuery, useTheme,
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
  updateSelectedDuration, updateSelectedIrrigation, updateSelectedSeason, updateTags,
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

  const selectedSeasonRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedSeason);
  const selectedDurationRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedDuration);
  const selectedIrrigationRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);

  const dispatch = useDispatch();

  // useState vars
  const [allGoals, setAllGoals] = useState([]);

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const durationTypes = ['Annual', 'Perennial'];

  const irrigationType = ['Rainfed', 'Irrigated'];

  const handleSelectedSeason = (season) => {
    if (selectedSeasonRedux.includes(season)) {
      dispatch(updateSelectedSeason(selectedSeasonRedux.filter((s) => s !== season)));
    } else {
      dispatch(updateSelectedSeason([...selectedSeasonRedux, season]));
    }
  };

  const handleSelectedDuration = (durationType) => {
    if (durationType === selectedDurationRedux) {
      dispatch(updateSelectedDuration(null));
    } else {
      dispatch(updateSelectedDuration(durationType));
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
    <Grid container spacing={4}>
      {/* Left Container */}
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
          <Grid item xs={12} mb={2}>
            <Typography
              variant={isMobile ? 'subtitle2' : 'subtitle1'}
              align="center"
              gutterBottom
            >
              Select up to 3 goals in order of importance. Your first goal will apply filtering to the recommended cover crop list.
            </Typography>
            <Typography variant="subtitle2" gutterBottom align="center">
              {isMobile ? 'Tap and hold for more information' : 'Hover over a goal for more information'}
            </Typography>
          </Grid>
          {/* chips */}
          <Grid
            item
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
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
          {councilShorthandRedux === 'WCCC'
            && (
              <>
                {/* Planting Season */}
                <Grid container sx={{ m: '1rem' }}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                      Planting Season
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
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
                        color={selectedSeasonRedux.includes(season) ? 'primary' : 'secondary'}
                      />
                    ))}
                  </Grid>
                </Grid>
                {/* Will you irrigate */}
                <Grid container sx={{ m: '1rem' }}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" data-test="title-goals">
                      Will you Irrigate?
                    </Typography>
                  </Grid>
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
                        color={selectedIrrigationRedux === irrigation ? 'primary' : 'secondary'}
                      />
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
        </Grid>
      </Grid>
      {/* Right Container */}
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
            margin: !isLargeScreen ? '0 1rem' : '0',

          }}
          justifyContent="center"
          data-test="cashcrop-window"
        >
          <PreviousCashCrop />
          {councilShorthandRedux === 'WCCC'
            && (
            <>
              {/* Cropping system */}
              <Grid container sx={{ m: '1rem' }}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" data-test="title-goals">
                    Cropping System
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {durationTypes.map((durationType, i) => (
                    <Chip
                      key={durationType}
                      label={durationType}
                      id={(`durationType${i}`)}
                      clickable
                      style={{ margin: '0.3rem' }}
                      sx={{
                        '&:focus': {
                          boxShadow: '0 0 0 2px black',
                        },
                      }}
                      onClick={() => handleSelectedDuration(durationType)}
                      color={selectedDurationRedux === durationType ? 'primary' : 'secondary'}
                    />
                  ))}
                </Grid>
              </Grid>
            </>
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default GoalsSelector;
