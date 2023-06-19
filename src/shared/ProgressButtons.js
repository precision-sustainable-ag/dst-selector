/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/Store';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = ({ closeExpansionPanel, setConfirmationOpen }) => {
  const { state } = useContext(Context);
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const [isDisabledReset, setIsDisabledReset] = useState(false);

  const disableLogic = (progress, goalsLength, sfilters) => {
    switch (parseInt(progress, 10)) {
      case 0:
        setIsDisabledBack(false);
        setIsDisabledReset(false);
        setIsDisabledNext(true);
        break;
      case 1:
        // location selection state
        // TODO: discuss should sfilter be used here or state.lastZone
        if (sfilters.zone === 0 || state.address === '') {
          setIsDisabledNext(true);
        } else {
          setIsDisabledNext(false);
        }
        break;
      case 4:
        // goals selection state
        if (goalsLength > 3 || goalsLength < 1) {
          setIsDisabledNext(true);
        } else {
          setIsDisabledNext(false);
        }
        break;
      default:
        setIsDisabledNext(false);
        break;
    }
  };

  useEffect(() => {
    const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
    const sfilters = state[section];

    disableLogic(state.progress, state.selectedGoals.length, sfilters);
  }, [state]);

  const renderProgressButtons = (progress, disabled) => {
    if (progress < 0) return '';

    return (
      <ProgressButtonsInner
        disabled={disabled}
        closeExpansionPanel={closeExpansionPanel}
        setConfirmationOpen={setConfirmationOpen}
      />
    );
  };

  return renderProgressButtons(state.progress, isDisabledBack, isDisabledNext, isDisabledReset);
};

export default ProgressButtons;
