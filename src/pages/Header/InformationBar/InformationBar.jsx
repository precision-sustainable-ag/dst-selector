/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { PSAStepper } from 'shared-react-components/src';
import { gotoProgress } from '../../../reduxStore/sharedSlice';
import ProgressButtons from '../../../shared/ProgressButtons';
import { steps } from '../../../shared/constants';

const speciesSelectorToolName = '/';

const InformationBar = ({ pathname }) => {
  const dispatchRedux = useDispatch();

  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const [maxStepReached, setMaxStepReached] = useState(0);

  // Update maxStepReached when progressing through steps
  useEffect(() => {
    if (progressRedux > maxStepReached) {
      setMaxStepReached(progressRedux);
    }
  }, [progressRedux, maxStepReached, dispatchRedux]);

  const handleStepClick = (step) => {
    const progress = step;
    dispatchRedux(gotoProgress(progress));
  };

  return (
    pathname === speciesSelectorToolName && (
      <Grid
        container
        sx={{
          marginBottom: '7px',
          maxWidth: '100%',
        }}
      >
        {/* Stepper */}
        {progressRedux >= 0 && !isMobile ? (
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <PSAStepper
              steps={steps}
              maxAvailableStep={maxStepReached > 0 ? steps.length : 0}
              strokeColor="white"
              sx={{
                width: '100%',
                maxWidth: '100%',
              }}
              onStepClick={(index) => handleStepClick(index)}
              stepperProps={{
                activeStep: progressRedux,
              }}
              stepButtonProps={{
                sx: {
                  background: 'transparent',
                  '.MuiStepLabel-label': {
                    '&.Mui-active, &.Mui-completed': {
                      color: '#77b400',
                    },
                  },
                },
              }}
              mobile={isMobile}
            />
          </Grid>
        ) : null}

        {/* Buttons */}
        <Grid item xs={12} sx={{ background: '#527B3F', padding: 1 }}>
          <ProgressButtons />
        </Grid>
      </Grid>
    )
  );
};

export default InformationBar;
