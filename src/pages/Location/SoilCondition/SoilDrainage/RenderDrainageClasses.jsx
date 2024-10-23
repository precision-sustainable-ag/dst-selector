import {
  Chip, Grid, Box, useTheme, useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTileDrainage, updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';
import { historyState, setHistoryState } from '../../../../reduxStore/userSlice';
import pirschAnalytics from '../../../../shared/analytics';

const RenderDrainageClasses = ({
  setNewDrainage, setShowTiling, drainageOptions, drainage = [],
}) => {
  const dispatchRedux = useDispatch();

  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const tileDrainageRedux = useSelector((stateRedux) => stateRedux.soilData.soilData.tileDrainage);

  const [previousDrainage, setPreviousDrainage] = useState(-1);
  const [updateTilingCheck, setUpdateTilingCheck] = useState(false);
  const drainageArray = drainageOptions.map((option) => option.value);
  const drainageVal = [drainageArray.indexOf(drainage)];

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
    if (updateTilingCheck) {
      if (tileDrainageRedux) {
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
    setUpdateTilingCheck(true);
  }, [tileDrainageRedux]);

  const updateDrainageClass = (index = '') => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));

    if (tileDrainageRedux) {
      dispatchRedux(setTileDrainage(false));
      setUpdateTilingCheck(false);
    }
    let drainages = soilDataRedux.drainageClass ? [...soilDataRedux.drainageClass] : [];

    if (!drainageVal.includes(index)) {
      drainages = [index];
      setNewDrainage(drainageArray[drainages[0]]);
      updateDrainageAction(drainages);
      dispatchRedux(setTileDrainage(false));
      pirschAnalytics('Site Conditions', { meta: { drainageClass: drainageArray[drainages[0]] } });
    } else {
      setNewDrainage([]);
      updateDrainageAction([]);
      dispatchRedux(setTileDrainage(false));
      setShowTiling(false);
    }
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
      data-cy="drainage-class-chip-box"
    >
      {drainageArray.map((d, index) => (
        <Box key={index} sx={{ width: isMobile ? '100%' : 'auto' }}>
          <Chip
            label={d}
            data-cy={`drainage-class-chip-${index}`}
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
