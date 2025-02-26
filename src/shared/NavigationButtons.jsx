/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { PSAButton } from 'shared-react-components/src';
import { Refresh } from '@mui/icons-material';
import { reset } from '../reduxStore/store';
import { setMyCoverCropReset } from '../reduxStore/sharedSlice';

const NavigationButtons = () => {
  const dispatchRedux = useDispatch();

  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const history = useHistory();
  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
        }}
        onClick={() => {
          history.push('/');
        }}
        buttonType="PillButton"
        data-test="back-btn"
        title="Back"
      />
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
        }}
        onClick={() => {
          if (selectedCropIdsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true, false));
          } else {
            dispatchRedux(reset());
          }
          history.push('/');
        }}
        startIcon={<Refresh />}
        buttonType="PillButton"
        data-test="restart-btn"
        title="Restart"
      />
    </Stack>
  );
};

export default NavigationButtons;
