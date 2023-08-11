/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
*/

// TODO: Goal tags are not responsive!
import { Typography, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import { Context } from '../../store/Store';
import '../../styles/goalsSelector.scss';
import GoalTag from './GoalTag/GoalTag';
import { callCoverCropApi } from '../../shared/constants';

// const goalSkeletonStyle = {
//   height: '50px',
//   width: '100%',
//   borderRadius: '10px',
// };

const GoalsSelector = () => {
  const { state } = useContext(Context);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const [allGoals, setAllGoals] = useState([]);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && selectedCropsRedux?.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, state.myCoverCropListLocation]);
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?${query}`).then((data) => {
        setAllGoals(data.data);
      });
    }
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
