import { Chip, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const RenderDrainageClasses = ({ tilingCheck, drainage = [] }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const [previousDrainage, setPreviousDrainage] = useState(0);

  const drainageArray = [
    'Very poorly drained',
    'Poorly drained',
    'Somewhat poorly drained',
    'Moderately well drained',
    'Well drained',
    'Somewhat excessively drained',
    'Excessively drained',
  ];

  const drainageVal = [drainageArray.indexOf(drainage[0])];

  // functions
  const updateDrainageAction = (drainages) => {
    let dispatchPackage = '';
    for (let i = 0; i < drainageArray.length; i++) {
      if (drainages[0] === i) {
        dispatchPackage = drainageArray[i];
      }
    }
    if (dispatchPackage !== '') dispatchRedux(updateDrainageClassRedux([dispatchPackage]));
  };

  useEffect(() => {
    let drainages = soilDataRedux.drainageClass
      ? drainageArray.indexOf(soilDataRedux.drainageClass[0])
      : -1;
    if (tilingCheck) {
      setPreviousDrainage(drainages);
      if (drainages === 2) {
        drainages += 1;
      } else if (drainages <= 1) {
        drainages = councilShorthandRedux === 'MCCC' ? drainages + 2 : drainages + 1;
      }
    } else if (drainages === 1) {
      drainages -= 1;
    } else if (drainages >= 2) {
      drainages = councilShorthandRedux === 'MCCC' && previousDrainage !== 2 ? drainages - 2 : drainages - 1;
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
    <Grid item display="flex" flexWrap="wrap" style={{ margin: '1rem 0' }}>
      {drainageArray.map((d, index) => (
        <Box key={index}>
          <Chip
            label={d}
            color={drainageVal.includes(index) ? 'primary' : 'secondary'}
            style={{ margin: '0.3rem' }}
            onClick={() => {
              updateDrainageClass(index);
            }}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default RenderDrainageClasses;
