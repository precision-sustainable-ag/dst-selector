/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/Store';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = () => {
  const { state } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(false);

  const renderProgressButtons = (progress, disabled) => {
    if (progress < 0) return '';

    return (
      <div style={{ maxWidth: '150px', align: 'right' }}>
        <ProgressButtonsInner disabled={disabled} />
      </div>
    );
  };

  useEffect(() => {
    const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
    const sfilters = state[section];

    const disableLogic = (progress, goalsLength) => {
      switch (parseInt(progress, 10)) {
        case 1: {
          // location selection state
          // TODO: discuss should sfilter be used here or state.lastZone
          if (sfilters.zone === 0 || state.address === '') {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
          break;
        }
        case 4: {
          // goals selection state
          if (goalsLength > 3 || goalsLength < 1) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
          break;
        }
        default: {
          setIsDisabled(false);
          break;
        }
      }
    };

    disableLogic(state.progress, state.selectedGoals.length);
  }, [state]);

  return renderProgressButtons(state.progress, isDisabled);
};

export default ProgressButtons;
