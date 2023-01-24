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
    if (state.council === 'Midwest' && state.progress === 2) {
      changeProgress(crement);
    }
  }, [state.progress]);

  return (
    <>
      <LightButton onClick={() => changeProgress('decrement')}> back</LightButton>
      <LightButton
        onClick={() => changeProgress('increment')}
        disabled={isDisabled}
        className="ml-3"
      >
        next
      </LightButton>
    </>
  );
};

export default ProgressButtonsInner;
