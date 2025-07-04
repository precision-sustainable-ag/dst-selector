/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/
// TODO: Goal tags are not responsive!
import {
  Typography, Grid, useMediaQuery, useTheme,
  Chip,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import GoalTag from './GoalTag/GoalTag';
import PreviousCashCrop from '../CropSidebar/PreviousCashCrop/PreviousCashCrop';
import {
  updateSelectedDuration, updateSelectedIrrigation, updateSelectedSeason, updateTags,
} from '../../reduxStore/terminationSlice';
import {
  setIrrigationFilter,
} from '../../reduxStore/filterSlice';

const seasons = ['Dormant/Frost', 'Early Spring', 'Spring', 'Early Summer', 'Summer',
  'Late Summer', 'Late Summer / Early Fall', 'Fall', 'Winter'];

const durationTypes = ['Annual', 'Perennial'];

const irrigationType = ['Rainfed', 'Irrigated'];

const GoalsSelector = () => {
  // theme vars
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // redux vars
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const allGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.allGoals);
  const plantingSeasonsRedux = useSelector((stateRedux) => stateRedux.goalsData.plantingSeasons);

  const selectedSeasonRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedSeason);
  const selectedDurationRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedDuration);
  const selectedIrrigationRedux = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);

  const dispatch = useDispatch();

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
    if (councilShorthandRedux === 'WCCC') {
      const selectedTags = allGoalsRedux.filter((goal) => selectedGoalsRedux.includes(goal.label))
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
              Select up to 3 goals in order of importance.
              {councilShorthandRedux === 'WCCC'
               && ' Your first goal will apply filtering to the recommended cover crop list.'}
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
            {allGoalsRedux?.length > 0 ? (
              <Grid
                item
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                {allGoalsRedux
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
                        id={key}
                        goaltTitle={goal.label}
                        goalDescription={goal.description}
                        selectedGoalIndex={selectedGoalsRedux.includes(goal.label) ? selectedGoalsRedux.indexOf(goal.label) + 1 : null}
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
                {plantingSeasonsRedux.length > 0 && (
                  <Grid container item xs={12} lg={6} sx={{ mt: '1rem' }}>
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
                      {seasons.map((season, i) => {
                        if (plantingSeasonsRedux.includes(season)) {
                          return (
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
                          );
                        }
                        return null;
                      })}
                    </Grid>
                  </Grid>
                )}
                {/* Will you irrigate */}
                <Grid container item xs={12} lg={6} sx={{ mt: '1rem' }}>
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
              <Grid container sx={{ m: '1rem', display: 'flex', alignItems: 'flex-end' }}>
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
