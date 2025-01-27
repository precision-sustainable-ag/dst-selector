/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LocationOn } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import React from 'react';
import { PSAStepper } from 'shared-react-components/src';
import ProgressButtons from '../../../shared/ProgressButtons';
import { gotoProgress } from '../../../reduxStore/sharedSlice';

const speciesSelectorToolName = '/';

const InformationBar = ({ pathname }) => {
  const dispatchRedux = useDispatch();

  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const regionRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  const handleStepClick = (step) => {
    const progress = step + 1;

    dispatchRedux(gotoProgress(progress));
  };
  const getSelectedValues = (type) => {
    switch (type) {
      case 'location':
        return councilShorthandRedux === 'MCCC' ? `${regionRedux} County` : `Zone ${regionRedux}`;
      // TODO: is goals needed?
      case 'goals':
        return selectedGoalsRedux.toString().split(',').join(', ');
      default:
        return '';
    }
  };

  const getIconInfo = (type) => {
    switch (type) {
      case 'location':
        return (
          <>
            <LocationOn />
            &nbsp;Location:
            {' '}
            {getSelectedValues('location')}
          </>
        );
      case 'site':
        return (
          <>
            <FilterHdrIcon />
            &nbsp; Site Conditions
          </>
        );
      case 'goals':
        return (
          <>
            <CheckIcon />
            &nbsp;Goals
          </>
        );
      default:
        return null;
    }
  };

  return (
    pathname === speciesSelectorToolName && (
      <Grid
        container
        sx={{
          backgroundColor: 'white',
          marginBottom: '7px',
          maxWidth: '100%',
        }}
        alignItems="center"
        spacing={1}
      >
        {progressRedux > 0 && !isMobile ? (
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <PSAStepper
              steps={[getIconInfo('location'), getIconInfo('site'), getIconInfo('goals')]}
              strokeColor="#fffff2"
              sx={{ width: '100%' }}
              onStepClick={(index) => handleStepClick(index)}
              stepperProps={{ activeStep: progressRedux - 1 }}
              mobile={isMobile}
            />
          </Grid>
        ) : null}

        <Grid
          item
          xs={12}
          lg={progressRedux > 0 && !isMobile ? 3 : 12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ProgressButtons />
        </Grid>
      </Grid>
    )
  );
};

export default InformationBar;
