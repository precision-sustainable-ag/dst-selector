/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';
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
              justifyContent: 'center', // Center-align the stepper
              width: '100%', // Ensure the grid item takes full width
            }}
          >
            <PSAStepper
              steps={steps}
              maxAvailableStep={progressRedux === 0 ? 0 : steps.length}
              strokeColor="#fffff2"
              sx={{
                width: '100%', // Stepper takes full width of its container
                maxWidth: '100%', // Ensure it doesn't restrict itself
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
