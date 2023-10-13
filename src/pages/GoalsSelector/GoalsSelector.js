/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/

// TODO: Goal tags are not responsive!
import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';

const GoalsSelector = () => {
  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [allGoals, setAllGoals] = useState([]);

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?${query}`).then((data) => {
        setAllGoals(data.data);
      });
    }
  }, []);

  return (
    <Grid container mt={2} mb={2} mr={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">
          Select Cover Cropping Goals
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" color="secondary" gutterBottom>
          Select up to three. The order in which you select your goals will determine the sorting of
          cover crops.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" color="secondary" gutterBottom>
          Hover, or tap and hold for more information.
        </Typography>
      </Grid>
      {allGoals?.length > 0 && (
      <Grid container spacing={2} style={{ justifyContent: 'center' }}>
        {allGoals.map((goal, key) => (
          <Grid item key={key}>
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
  );
};

export default GoalsSelector;
