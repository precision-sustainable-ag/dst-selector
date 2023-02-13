/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/

// TODO: Goal tags are not responsive!
import { Typography, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/Store';
import '../../styles/goalsSelector.scss';
import GoalTag from './GoalTag/GoalTag';

const goalSkeletonStyle = {
  height: '50px',
  width: '100%',
  borderRadius: '10px',
};

const GoalsSelector = () => {
  const { state } = useContext(Context);
  const [allGoals, setAllGoals] = useState([]);

  async function getAllGoals() {
    const allregions = [...state.councilId, ...state.physiographicRegions, ...state.zones];
    const idArray = allregions.map((region) => (
      region.id
    ));

    const query = idArray.map((id) => (
      `${encodeURIComponent('regions')}=${encodeURIComponent(id)}`
    ))
      .join('&');

    await fetch(`https://developapi.covercrop-selector.org/v1/goals?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAllGoals(data.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    getAllGoals();
  }, [state.allGoals]);

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow goalsContainer" style={{ height: '520px' }}>
        <div className="col-12 goalsBoxContainer">
          <Typography variant="h4" gutterBottom>
            What are your cover cropping goals?
          </Typography>
          <Typography variant="body2" align="center" color="secondary" gutterBottom>
            Select up to three. The order in which you select your goals will determine the sorting of
            cover crops. The first goal you select will have the highest priority in sorting and then
            decrease for each additional goal. Hover on a goal for more information.
          </Typography>
          {allGoals.length > 0 && (
            <Grid container spacing={4} className="goals" style={{ justifyContent: 'center' }}>
              {allGoals.length > 0 ? (
                allGoals.map((goal, key) => (
                  <Grid item>
                    <GoalTag
                      goal={goal}
                      id={key}
                      goaltTitle={goal.label}
                      goalDescription={goal.description}
                      // valuesDescriptions={goal.fields['Values Description']}
                    />
                  </Grid>
                ))
              ) : (
                <Skeleton style={goalSkeletonStyle} />
              )}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsSelector;
