/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/

// TODO: Goal tags are not responsive!
import { Typography, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { Context } from '../../store/Store';
import '../../styles/goalsSelector.scss';
import GoalTag from './GoalTag/GoalTag';

// const goalSkeletonStyle = {
//   height: '50px',
//   width: '100%',
//   borderRadius: '10px',
// };

const GoalsSelector = () => {
  const { state } = useContext(Context);
  const [allGoals, setAllGoals] = useState([]);
  const [handleConfirm, setHandleConfirm] = useState(false);

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && state.selectedCrops?.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [state.selectedCrops, state.myCoverCropListLocation]);

  async function getAllGoals() {
    const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;

    await fetch(`https://api.covercrop-selector.org/v1/states/${state.stateId}/goals?${query}`)
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
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </div>
  );
};

export default GoalsSelector;
