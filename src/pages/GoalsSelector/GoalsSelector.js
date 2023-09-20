/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/

// TODO: Goal tags are not responsive!
import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/goalsSelector.scss';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';

// const goalSkeletonStyle = {
//   height: '50px',
//   width: '100%',
//   borderRadius: '10px',
// };

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
    <div className="goalsContainer" style={{ marginTop: '5%', width: '80%', marginLeft: '10%' }}>
      <div className="goalsBoxContainer">
        <Typography variant="h4" gutterBottom align="center">
          What are your cover cropping goals?
        </Typography>
        <Typography variant="body2" align="center" color="secondary" gutterBottom>
          Select up to three. The order in which you select your goals will determine the sorting of
          cover crops. The first goal you select will have the highest priority in sorting and then
          decrease for each additional goal. Hover on a goal for more information.
        </Typography>
        {allGoals?.length > 0 && (
          <Grid container spacing={4} className="goals" style={{ justifyContent: 'center' }}>
            {
                allGoals.map((goal, key) => (
                  <Grid key={key} item>
                    <GoalTag
                      key={key}
                      goal={goal}
                      id={key}
                      goaltTitle={goal.label}
                      goalDescription={goal.description}
                    />
                  </Grid>
                ))
              }
          </Grid>
        )}
      </div>
    </div>
  );
};

export default GoalsSelector;
