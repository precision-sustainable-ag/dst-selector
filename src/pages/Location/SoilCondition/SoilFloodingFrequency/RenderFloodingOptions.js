import React from 'react';
import { Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';

const RenderFloodingOptions = ({ flooding = [''] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  const floodingOptions = ['None', 'Very Rare', 'Rare', 'Occasional', 'Frequent', 'Very Frequent'];

  const updateFloodingFrequency = (label = '') => {
    let floodings = soilDataRedux?.floodingFrequency ? [...soilDataRedux.floodingFrequency] : [];
    if (floodings.indexOf('None') !== -1) {
      // does exist, remove none because something else was selected
      floodings.splice(floodings.indexOf('None'));
    }
    if (label === 'None') {
      // does exist, remove none because something else was selected
      floodings = [];
    }
    if (floodings.indexOf(label) === -1) {
      // does not exist, dispatch to state
      floodings.push(label);
      dispatchRedux(updateFloodingFrequencyRedux(floodings));
    } else {
      // exists, remove it from state
      const index = floodings.indexOf(label);
      floodings.splice(index, 1);

      dispatchRedux(updateFloodingFrequencyRedux(floodings));
    }
  };
  return (
    <Grid container spacing={2}>
      {floodingOptions.map((f, index) => (
        <Grid item key={index}>
          <Chip
            label={f}
            color={flooding.includes(f) ? 'primary' : 'secondary'}
            onClick={() => {
              updateFloodingFrequency(f);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderFloodingOptions;
