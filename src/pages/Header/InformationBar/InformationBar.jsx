/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { PSAStepper } from 'shared-react-components/src';
import { gotoProgress, updateMaxStepReached } from '../../../reduxStore/sharedSlice';
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
  const maxStepReached = useSelector((stateRedux) => stateRedux.sharedData.maxStepReached);

  // Update maxStepReached when progressing through steps
  useEffect(() => {
    if (progressRedux > maxStepReached) {
      dispatchRedux(updateMaxStepReached(progressRedux));
    }
  }, [progressRedux, maxStepReached, dispatchRedux]);

  const handleStepClick = (step) => {
    const progress = step;
    dispatchRedux(gotoProgress(progress));
  };

  return (
    pathname === speciesSelectorToolName && (
      <Grid container sx={{ maxWidth: '100%', justifyContent: 'center' }}>
        {/* Stepper */}
        {progressRedux >= 0 && !isMobile ? (
          <Grid
            item
            xs={12}
            sx={{
              background: 'white',
              width: '100%',
              pb: 1,
              textAlign: 'center', // Centers the stepper
            }}
          >
            <PSAStepper
              steps={steps}
              maxAvailableStep={maxStepReached > 0 ? steps.length : 0}
              strokeColor="white"
              sx={{
                width: '100%', // Allow it to take full width
                maxWidth: '800px', // Consistent width with buttons
                mx: 'auto', // Centering
              }}
              onStepClick={(index) => handleStepClick(index)}
              stepperProps={{
                activeStep: progressRedux,
              }}
              stepButtonProps={{
                styles: {
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
        <Grid item xs={12} sx={{ width: '100%', textAlign: 'center', padding: 1 }}>
          <ProgressButtons sx={{ maxWidth: '800px', width: '100%', mx: 'auto' }} />
        </Grid>
      </Grid>
    )
  );
};

export default InformationBar;
