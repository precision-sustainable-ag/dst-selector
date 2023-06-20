/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/Store';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = ({ closeExpansionPanel, setConfirmationOpen }) => {
  const { state } = useContext(Context);
  console.log(state);
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [isDisabledRefresh, setIsDisabledRefresh] = useState(false);

  const disableLogic = (progress, goalsLength, sfilters) => {
    switch (parseInt(progress, 10)) {
      case 0:
        setIsDisabledBack(true);
        setIsDisabledRefresh(true);
        setIsDisabledNext(state.councilLabel === '');
        break;
      case 1:
        // location selection state
        // TODO: discuss should sfilter be used here or state.lastZone
        setIsDisabledNext(sfilters.zone === 0 || state.address === '');

        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      case 4:
        // goals selection state
        setIsDisabledNext(goalsLength > 3 || goalsLength < 1);

        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      default:
        setIsDisabledNext(false);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
    }
  };

  useEffect(() => {
    const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
    const sfilters = state[section];
    disableLogic(state.progress, state.selectedGoals.length, sfilters);
  }, [state]);

  const renderProgressButtons = (progress, disabledBack, disabledNext, disabledRefresh) => {
    if (progress < 0) return '';

    return (
      <ProgressButtonsInner
        isDisabledBack={disabledBack}
        isDisabledNext={disabledNext}
        isDisabledRefresh={disabledRefresh}
        closeExpansionPanel={closeExpansionPanel}
        setConfirmationOpen={setConfirmationOpen}
      />
    );
  };

  return renderProgressButtons(state.progress, isDisabledBack, isDisabledNext, isDisabledRefresh);
};

export default ProgressButtons;
