import React from 'react';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';

const RenderFloodingOptions = ({ flooding = [''] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

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
    <div className="text-left">
      <Chip
        label="None"
        color={flooding.includes('None') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('None');
        }}
      />
      <Chip
        label="Very Rare"
        color={flooding.includes('Very rare') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('Very rare');
        }}
      />
      <Chip
        label="Rare"
        color={flooding.includes('Rare') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('Rare');
        }}
      />
      <Chip
        label="Occasional"
        color={flooding.includes('Occasional') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('Occasional');
        }}
      />
      <Chip
        label="Frequent"
        color={flooding.includes('Frequent') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('Frequent');
        }}
      />
      <Chip
        label="Very Frequent"
        color={flooding.includes('Very frequent') ? 'primary' : 'secondary'}
        className="m-2"
        onClick={() => {
          updateFloodingFrequency('Very frequent');
        }}
      />
    </div>
  );
};

export default RenderFloodingOptions;
