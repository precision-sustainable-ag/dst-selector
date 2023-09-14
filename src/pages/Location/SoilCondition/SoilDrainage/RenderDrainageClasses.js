import { Chip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../styles/soilConditions.scss';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const RenderDrainageClasses = ({ tilingCheck, drainage = [''] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // functions
  const updateDrainageAction = (drainages) => {
    dispatchRedux(updateDrainageClassRedux(drainages));
  };

  useEffect(() => {
    let drainages = soilDataRedux.drainageClass ? [...soilDataRedux.drainageClass] : [];
    if (tilingCheck) {
      if (drainages.includes('Very poorly drained')) {
        if (councilShorthandRedux === 'MCCC') {
          drainages = ['Somewhat poorly drained'];
        } else {
          drainages = ['Poorly drained'];
        }
      } else if (drainages.includes('Poorly drained')) {
        if (councilShorthandRedux === 'MCCC') {
          drainages = ['Moderately well drained'];
        } else {
          drainages = ['Somewhat poorly drained'];
        }
      } else if (drainages.includes('Somewhat poorly drained')) {
        drainages = ['Moderately well drained'];
      }
    } else if (drainages.includes('Poorly drained')) {
      drainages = ['Very poorly drained'];
    } else if (drainages.includes('Somewhat poorly drained')) {
      if (councilShorthandRedux === 'MCCC') {
        drainages = ['Very poorly drained'];
      } else {
        drainages = ['Poorly drained'];
      }
    } else if (drainages.includes('Moderately well drained')) {
      if (councilShorthandRedux === 'MCCC') {
        drainages = ['Poorly drained'];
      } else {
        drainages = ['Somewhat poorly drained'];
      }
    }
    updateDrainageAction(drainages);
  }, [tilingCheck]);

  const updateDrainageClass = (label = '') => {
    let drainages = soilDataRedux.drainageClass ? [...soilDataRedux.drainageClass] : [];
    if (drainages.indexOf(label) === -1) {
      // does not exist, dispatch to state
      drainages = [label];
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
