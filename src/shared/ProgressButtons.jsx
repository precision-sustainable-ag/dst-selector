/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = () => {
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [toolTip, setToolTip] = useState(null);
  const [isDisabledRefresh, setIsDisabledRefresh] = useState(false);

  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const allGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.allGoals);

  useEffect(() => {
    switch (parseInt(progressRedux, 10)) {
      case 0:
        setToolTip(null);
        setIsDisabledBack(true);
        setIsDisabledRefresh(true);
        setIsDisabledNext(councilShorthandRedux === null);
        break;
      case 1: {
        const locationUnavailable = councilShorthandRedux === 'WCCC' ? queryStringRedux === null : regionShorthandRedux === '';
        const isDisabled = locationUnavailable || allGoalsRedux.length === 0;
        const disabledTooltip = `${locationUnavailable ? 'Location not available! ' : ''}`
          + `${allGoalsRedux.length === 0 ? 'No data exists for your location!' : ''}`;

        setIsDisabledNext(isDisabled);
        setToolTip(isDisabled ? disabledTooltip : null);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      }
      case 3:
        // goals selection state
        setToolTip(null);
        setIsDisabledBack(false);
        setIsDisabledNext(false);
        setIsDisabledRefresh(false);
        break;
      default:
        setToolTip(null);
        setIsDisabledNext(false);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
    }
  }, [progressRedux, regionShorthandRedux, allGoalsRedux, queryStringRedux, councilShorthandRedux]);

  if (progressRedux < 0) return '';

  return (
    <Grid item>
      <ProgressButtonsInner
        toolTip={toolTip}
        isDisabledBack={isDisabledBack}
        isDisabledNext={isDisabledNext}
        isDisabledRefresh={isDisabledRefresh}
      />
    </Grid>
  );
};

export default ProgressButtons;
