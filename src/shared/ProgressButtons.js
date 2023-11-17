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
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [toolTip, setToolTip] = useState(true);
  const [isDisabledRefresh, setIsDisabledRefresh] = useState(false);
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  const disableLogic = (progress, goalsLength, filters, regionShorthand) => {
    switch (parseInt(progress, 10)) {
      case 0:
        setToolTip(false);
        setIsDisabledBack(true);
        setIsDisabledRefresh(true);
        setIsDisabledNext(councilLabelRedux === null);
        break;
      case 1:
        // location selection state
        setIsDisabledNext(addressRedux === '' || regionShorthand === '');
        setToolTip(true);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      case 3:
        // goals selection state
        setIsDisabledNext(goalsLength > 3 || goalsLength < 1);
        setToolTip(false);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
      default:
        setToolTip(false);
        setIsDisabledNext(false);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
    }
  };

  useEffect(() => {
    const { filters } = filterStateRedux;
    disableLogic(progressRedux, selectedGoalsRedux.length, filters, regionShorthandRedux);
  }, [filterStateRedux, selectedGoalsRedux, stateLabelRedux, regionShorthandRedux]);

  const renderProgressButtons = (progress, disabledBack, disabledNext, disabledRefresh) => {
    if (progress < 0) return '';

    return (
      <Grid item>
        <ProgressButtonsInner
          toolTip={toolTip}
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
