/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React from 'react';
import { Refresh } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LightButton } from './constants';
import { reset } from '../reduxStore/store';
import { updateProgress, setMyCoverCropReset } from '../reduxStore/sharedSlice';

const ProgressButtonsInner = ({
  isDisabledBack, isDisabledNext, isDisabledRefresh,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  // const [crement, setCrement] = useState('');

  const changeProgress = (type) => {
    // setCrement(type);
    if (type === 'increment') {
      dispatchRedux(updateProgress('INCREMENT'));
    }

    if (type === 'decrement') {
      dispatchRedux(updateProgress('DECREMENT'));
    }
  };

  return (
    <Stack
      direction="row"
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
          if (selectedCropsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true, false));
          } else {
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
