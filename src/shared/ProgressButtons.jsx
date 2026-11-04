/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProgressButtonsInner from './ProgressButtonsInner';

const ProgressButtons = () => {
  const [isDisabledBack, setIsDisabledBack] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [toolTip, setToolTip] = useState(null);
  const [isDisabledRefresh, setIsDisabledRefresh] = useState(false);

  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const allGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.allGoals);

  useEffect(() => {
    switch (parseInt(progressRedux, 10)) {
      case 0:
        setIsDisabledNext(councilShorthandRedux === null);
        break;
      case 1: {
        const hasMarker = stateLabelRedux === 'Ontario' || Boolean(markersRedux?.[0]);
        const hasRegion =
          councilShorthandRedux === 'WCCC'
            ? queryStringRedux !== null
            : Boolean(regionShorthandRedux);
        const isDisabled = !hasMarker || !hasRegion || allGoalsRedux.length === 0;

        setIsDisabledNext(isDisabled);
        setToolTip(isDisabled ? 'No data exists for your location!' : null);
        break;
      }
      case 2:
        break;
      case 3:
        // goals selection state
        setIsDisabledNext(allGoalsRedux.length === 0);
        setToolTip(allGoalsRedux.length === 0 ? 'No data exists for your location!' : null);
        break;
      default:
        setToolTip(null);
        setIsDisabledNext(false);
        setIsDisabledBack(false);
        setIsDisabledRefresh(false);
        break;
    }
  }, [
    progressRedux,
    regionShorthandRedux,
    allGoalsRedux,
    queryStringRedux,
    councilShorthandRedux,
    markersRedux,
    stateLabelRedux,
  ]);

  if (progressRedux < 0) return '';

  return (
    <Grid>
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
