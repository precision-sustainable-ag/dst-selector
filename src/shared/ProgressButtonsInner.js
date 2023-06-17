/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React, { useState, useContext, useEffect } from 'react';
import { Refresh } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Context } from '../store/Store';
import { LightButton } from './constants';

const ProgressButtonsInner = ({ disabled, closeExpansionPanel, setConfirmationOpen }) => {
  const { state, dispatch } = useContext(Context);

  const [crement, setCrement] = useState('');

  const isDisabled = disabled;

  const changeProgress = (type) => {
    setCrement(type);
    if (type === 'increment') {
      dispatch({
        type: 'UPDATE_PROGRESS',
        data: {
          type: 'INCREMENT',
        },
      });
    }

    if (type === 'decrement') {
      dispatch({
        type: 'UPDATE_PROGRESS',
        data: {
          type: 'DECREMENT',
        },
      });
    }
  };

  useEffect(() => {
    if (state.councilLabel === 'Midwest' && state.progress === 2) {
      changeProgress(crement);
    }
  }, [state.progress]);

  return (
    <Stack direction="row" ml={{ xs: '13%', sm: '30%', md: 1 }}>
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '90px',
          fontSize: '13px',
          marginLeft: '3%',
        }}
        onClick={() => changeProgress('decrement')}
      >
        BACK
      </LightButton>
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '90px',
          fontSize: '13px',
          marginLeft: '3%',
        }}
        onClick={() => changeProgress('increment')}
        disabled={isDisabled || state.progress === 5}
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
          setConfirmationOpen(true);
        }}
      >
        <Refresh />
        <p style={{
          paddingBottom: '6px',
        }}
        >
          &nbsp; Restart
        </p>
      </LightButton>
    </Stack>
  );
};

export default ProgressButtonsInner;
