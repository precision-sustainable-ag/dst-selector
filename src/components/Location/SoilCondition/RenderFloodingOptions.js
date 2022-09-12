import React, { useContext } from 'react';
import { Chip } from '@mui/material';
import { Context } from '../../../store/Store';
import '../../../styles/soilConditions.scss';

export const RenderFloodingOptions = ({ flooding = [''] }) => {
  const { state, dispatch } = useContext(Context);

  const updateFloodingFrequency = (label = '') => {
    let floodings = [...state.soilData.Flooding_Frequency];
    if (floodings.indexOf(label) === -1) {
      // does not exist, dispatch to state
      floodings.push(label);
      dispatch({
        type: 'UPDATE_FLOODING_FREQUENCY',
        data: floodings,
      });
    } else {
      // exists, remove it from state
      let index = floodings.indexOf(label);
      floodings.splice(index, 1);

      dispatch({
        type: 'UPDATE_FLOODING_FREQUENCY',
        data: floodings,
      });
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
