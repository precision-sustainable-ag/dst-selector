import { Chip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../styles/soilConditions.scss';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const RenderDrainageClasses = ({ drainage = [''] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  // functions
  const updateDrainageAction = (drainages) => {
    dispatchRedux(updateDrainageClassRedux(drainages));
  };

  const updateDrainageClass = (label = '') => {
    const drainages = soilDataRedux.drainageClass ? [...soilDataRedux.drainageClass] : [];
    if (drainages.indexOf(label) === -1) {
      // does not exist, dispatch to state
      drainages.push(label);
      updateDrainageAction(drainages);
    } else {
      // exists, remove it from state
      const index = drainages.indexOf(label);
      drainages.splice(index, 1);
      updateDrainageAction(drainages);
    }
  };

  return (
    <div className="text-left">
      <Chip
        label="Very Poorly Drained"
        color={drainage.includes('Very poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Very poorly drained');
        }}
      />
      <Chip
        label="Poorly Drained"
        color={drainage.includes('Poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Poorly drained');
        }}
      />
      <Chip
        label="Somewhat Poorly Drained"
        color={drainage.includes('Somewhat poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Somewhat poorly drained');
        }}
      />
      <Chip
        label="Moderately Well Drained"
        color={drainage.includes('Moderately well drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Moderately well drained');
        }}
      />
      <Chip
        label="Well Drained"
        color={drainage.includes('Well drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Well drained');
        }}
      />
      <Chip
        label="Somewhat Excessively Drained"
        color={drainage.includes('Somewhat excessively drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Somewhat excessively drained');
        }}
      />
      <Chip
        label="Excessively Drained"
        color={drainage.includes('Excessively drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass('Excessively drained');
        }}
      />
    </div>
  );
};

export default RenderDrainageClasses;
