/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LocationOn } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import CheckIcon from '@mui/icons-material/Check';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import React from 'react';
import ProgressButtons from '../../../shared/ProgressButtons';
import { gotoProgress } from '../../../reduxStore/sharedSlice';

const speciesSelectorToolName = '/';

const InformationBar = ({ pathname }) => {
  const dispatchRedux = useDispatch();

  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const regionRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // functions
  const handleBtnClick = (type) => {
    const options = {
      location: 1,
      site: 2,
      goals: 3,
    };

    const progress = options[type];

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
            &nbsp;Location: {getSelectedValues('location')}
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

  const getData = (type) => {
    // TODO: is the if block needed?
    if (type === 'address' && addressRedux === '') {
      return '';
    }

    return (
      <Button
        onClick={() => handleBtnClick(type)}
        style={{
          borderRadius: '200px',
          color: 'black',
          width: '100%',
          background:
            ((type === 'location' && progressRedux > 0) ||
              (type === 'site' && progressRedux > 1) ||
              (type === 'goals' && progressRedux > 2)) &&
            '#e3f2f4',
        }}
      >
        {getIconInfo(type)}
      </Button>
    );
  };

  return (
    pathname === speciesSelectorToolName && (
      <Grid
        container
        item
        sx={{
          backgroundColor: '#598445',
          marginBottom: '7px',
        }}
        justifyContent="right"
        xs={12}
        spacing={1}
      >
        {progressRedux > 0 && !isMobile && (
          <Grid item container xs={12} sm={12} md={12} lg={9.5} spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={2.5}>
              {getData('location')}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3.5}>
              {getData('site')}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2.5}>
              {getData('goals')}
            </Grid>
          </Grid>
        )}

        <Grid
          container
          item
          sx={{
            backgroundColor: '#598445',
          }}
          justifyContent="center"
          xs={12}
          lg={2.5}
        >
          <ProgressButtons />
        </Grid>
      </Grid>
    )
  );
};

export default InformationBar;
