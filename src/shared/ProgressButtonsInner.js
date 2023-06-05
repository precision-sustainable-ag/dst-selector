/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/Store';
import { LightButton } from './constants';

const ProgressButtonsInner = ({ disabled }) => {
  const isDisabled = disabled;

  const { state, dispatch } = useContext(Context);
  const [crement, setCrement] = useState('');

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
    <>
      <LightButton
        style={{
          maxWidth: '50px',
          maxHeight: '35px',
          minWidth: '50px',
          minHeight: '35px',
          fontSize: '11px',
          marginLeft: '20px',
          marginTop: '2.5px',
          marginBottom: '2.5px',
        }}
        onClick={() => changeProgress('decrement')}
      >
        BACK
      </LightButton>
      <LightButton
        style={{
          maxWidth: '50px',
          maxHeight: '35px',
          minWidth: '50px',
          minHeight: '35px',
          fontSize: '11px',
          marginTop: '2.5px',
          marginBottom: '2.5px',
        }}
        onClick={() => changeProgress('increment')}
        disabled={isDisabled || state.progress === 5}
        className="ml-3"
      >
        NEXT
      </LightButton>
    </>
  );
};

export default ProgressButtonsInner;
