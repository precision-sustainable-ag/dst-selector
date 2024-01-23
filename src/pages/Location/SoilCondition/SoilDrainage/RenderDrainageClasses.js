import {
  Chip, Grid, Box, useTheme, useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const RenderDrainageClasses = ({ tilingCheck, setTilingCheck, drainage = [] }) => {
  const dispatchRedux = useDispatch();

  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const [previousDrainage, setPreviousDrainage] = useState(-1);
  const [updatedTilingCheck, setUpdatedTilingCheck] = useState(true);

  const drainageArray = [
    'Very poorly drained',
    'Poorly drained',
    'Somewhat poorly drained',
    'Moderately well drained',
    'Well drained',
    'Somewhat excessively drained',
    'Excessively drained',
  ];
  const drainageVal = [tilingCheck && previousDrainage >= 0 ? previousDrainage : drainageArray.indexOf(drainage[0])];

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
    if (updatedTilingCheck) {
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
    }

    updateDrainageAction([drainages]);
    setUpdatedTilingCheck(true);
  }, [tilingCheck]);

  const updateDrainageClass = (index = '') => {
    let drainages = soilDataRedux.drainageClass ? [...soilDataRedux.drainageClass] : [];
    if (drainages.indexOf(drainageArray[index]) === -1) {
      // does not exist, dispatch to state
      drainages = [index];
      updateDrainageAction(drainages);
    } else {
      dispatchRedux(updateDrainageClassRedux([]));
    }
    setUpdatedTilingCheck(false);
    setTilingCheck(false);
  };

  return (
    <Grid
      item
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      flexWrap="wrap"
      justifyContent="center"
      alignItems={isMobile ? 'center' : 'flex-start'}
      style={{ marginRight: '1rem' }}
      flexBasis="0"
    >
      {drainageArray.map((d, index) => (
        <Box key={index} sx={{ width: isMobile ? '100%' : 'auto' }}>
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
