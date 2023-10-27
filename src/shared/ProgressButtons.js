/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = () => {
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [isDisabledRefresh, setIsDisabledRefresh] = useState(false);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  const disableLogic = (progress, goalsLength, sfilters) => {
    switch (parseInt(progress, 10)) {
      case 0:
        setIsDisabledBack(true);
        setIsDisabledRefresh(true);
        setIsDisabledNext(councilLabelRedux === null);
        break;
      case 1:
        // location selection state
        // TODO: discuss should sfilter be used here or state.lastZone
        setIsDisabledNext(sfilters.zone === 0 || !regionIdRedux);

        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      case 4:
        // goals selection state
        setIsDisabledNext(goalsLength > 3);

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
    const sfilters = filterStateRedux[section];
    disableLogic(progressRedux, selectedGoalsRedux.length, sfilters);
  }, [filterStateRedux, selectedGoalsRedux, stateLabelRedux]);

  const renderProgressButtons = (progress, disabledBack, disabledNext, disabledRefresh) => {
    if (progress < 0) return '';

    return (
      <Grid item>
        <ProgressButtonsInner
          isDisabledBack={disabledBack}
          isDisabledNext={disabledNext}
          isDisabledRefresh={disabledRefresh}
        />
      </Grid>
    );
  };

  return renderProgressButtons(progressRedux, isDisabledBack, isDisabledNext, isDisabledRefresh);
};

export default ProgressButtons;
