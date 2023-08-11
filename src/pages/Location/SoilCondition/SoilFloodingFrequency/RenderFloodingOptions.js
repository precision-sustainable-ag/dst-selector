import React from 'react';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../styles/soilConditions.scss';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';

const RenderFloodingOptions = ({ flooding = [''] }) => {
  const dispatchRedux = useDispatch;

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  const updateFloodingFrequency = (label = '') => {
    const floodings = soilDataRedux?.Flooding_Frequency ? [...soilDataRedux.Flooding_Frequency] : [];
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
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('None');
        }}
      />
      <Chip
        label="Very Rare"
        color={flooding.includes('Very rare') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('Very rare');
        }}
      />
      <Chip
        label="Rare"
        color={flooding.includes('Rare') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('Rare');
        }}
      />
      <Chip
        label="Occasional"
        color={flooding.includes('Occasional') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('Occasional');
        }}
      />
      <Chip
        label="Frequent"
        color={flooding.includes('Frequent') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('Frequent');
        }}
      />
      <Chip
        label="Very Frequent"
        color={flooding.includes('Very frequent') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateFloodingFrequency('Very frequent');
        }}
      />
    </div>
  );
};

export default RenderFloodingOptions;
