import { Chip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../styles/soilConditions.scss';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const RenderDrainageClasses = ({ tilingCheck, drainage = [] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  const drainageArray = [
    'Very poorly drained',
    'Poorly drained',
    'Somewhat poorly drained',
    'Moderately well drained',
    'Well drained',
    'Somewhat excessively drained',
    'Excessively drained',
  ];

  // functions
  const updateDrainageAction = (drainages) => {
    let dispatchPackage = '';
    for (let i = 0; i < drainageArray.length; i++) {
      if (drainages[0] === i) {
        dispatchPackage = drainageArray[i];
      }
    }
    dispatchRedux(updateDrainageClassRedux([dispatchPackage]));
  };

  useEffect(() => {
    let drainages = soilDataRedux.drainageClass ? drainageArray.indexOf(soilDataRedux.drainageClass[0]) : -1;
    if (tilingCheck) {
      if (drainages === 2) {
        drainages += 1;
      } else if (drainages <= 1) {
        drainages = councilShorthandRedux === 'MCCC' ? drainages + 2 : drainages + 1;
      }
    } else if (drainages === 1) {
      drainages -= 1;
    } else if (drainages >= 2) {
      drainages = councilShorthandRedux === 'MCCC' ? drainages - 2 : drainages - 1;
    }
    updateDrainageAction([drainages]);
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
        color={drainage.includes(0) || drainage.includes('Very poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(0);
        }}
      />
      <Chip
        label="Poorly Drained"
        color={drainage.includes(1) || drainage.includes('Poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(1);
        }}
      />
      <Chip
        label="Somewhat Poorly Drained"
        color={drainage.includes(2) || drainage.includes('Somewhat poorly drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(2);
        }}
      />
      <Chip
        label="Moderately Well Drained"
        color={drainage.includes(3) || drainage.includes('Moderately well drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(3);
        }}
      />
      <Chip
        label="Well Drained"
        color={drainage.includes(4) || drainage.includes('Well drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(4);
        }}
      />
      <Chip
        label="Somewhat Excessively Drained"
        color={drainage.includes(5) || drainage.includes('Somewhat excessively drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(5);
        }}
      />
      <Chip
        label="Excessively Drained"
        color={drainage.includes(6) || drainage.includes('Excessively drained') ? 'primary' : 'secondary'}
        className="m-2 drainageTag"
        onClick={() => {
          updateDrainageClass(6);
        }}
      />
    </div>
  );
};

export default RenderDrainageClasses;
