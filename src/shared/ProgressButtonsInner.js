/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React, { useState, useContext, useEffect } from 'react';
import { Refresh } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../store/Store';
import { LightButton } from './constants';
import { reset } from '../reduxStore/store';
import { updateProgress } from '../reduxStore/sharedSlice';

const ProgressButtonsInner = ({
  isDisabledBack, isDisabledNext, isDisabledRefresh, closeExpansionPanel, setConfirmationOpen,
}) => {
  const { dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const [crement, setCrement] = useState('');

  const changeProgress = (type) => {
    setCrement(type);
    if (type === 'increment') {
      dispatchRedux(updateProgress('INCREMENT'));
      // dispatch({
      //   type: 'UPDATE_PROGRESS',
      //   data: {
      //     type: 'INCREMENT',
      //   },
      // });
    }

    if (type === 'decrement') {
      dispatchRedux(updateProgress('DECREMENT'));
      // dispatch({
      //   type: 'UPDATE_PROGRESS',
      //   data: {
      //     type: 'DECREMENT',
      //   },
      // });
    }
  };

  useEffect(() => {
    if (councilLabelRedux === 'Midwest Cover Crop Council' && progressRedux === 2) {
      changeProgress(crement);
    }
  }, [progressRedux]);

  return (
    <Stack
      direction="row"
      ml={
        progressRedux === 0
          ? {
            xs: '13%', sm: '30%', md: '30%', lg: '375%', xl: '380%',
          }
          : {
            xs: '13%', sm: '30%', md: '33%', lg: '10%',
          }
      }
      // container
      style={{ width: '100%' }}
    >
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '70px',
          fontSize: '13px',
        }}
        onClick={() => changeProgress('decrement')}
        disabled={isDisabledBack}
      >
        BACK
      </LightButton>
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '70px',
          fontSize: '13px',
          marginLeft: '3%',
        }}
        onClick={() => changeProgress('increment')}
        disabled={isDisabledNext || progressRedux === 5}
      >
        NEXT
      </LightButton>
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '90px',
          fontSize: '13px',
          marginLeft: '3%',
        }}
        onClick={() => {
          closeExpansionPanel();
          if (selectedCropsRedux.length > 0) setConfirmationOpen(true);
          else {
            dispatch({
              type: 'RESET',
              data: {
                markers: defaultMarkers,
                selectedCrops: [],
              },
            });
            dispatchRedux(reset());
          }
        }}
        disabled={isDisabledRefresh}
      >
        <Refresh />
        Restart
      </LightButton>
    </Stack>
  );
};

export default ProgressButtonsInner;
