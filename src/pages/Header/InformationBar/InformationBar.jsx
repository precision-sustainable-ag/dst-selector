/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LocationOn } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import React from 'react';
import { PSAButton } from 'shared-react-components/src';
import ProgressButtons from '../../../shared/ProgressButtons';
import { gotoProgress } from '../../../reduxStore/sharedSlice';
import NavigationButtons from '../../../shared/NavigationButtons';
import useIsMobile from '../../../hooks/useIsMobile';

const speciesSelectorToolName = '/';

const InformationBar = ({ pathname }) => {
  const dispatchRedux = useDispatch();
  const isMobile = useIsMobile('sm');

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
            &nbsp;Location
            {councilShorthandRedux !== 'WCCC' && `: ${getSelectedValues('location')}`}
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
      <PSAButton
        onClick={() => handleBtnClick(type)}
        buttonType="PillButton"
        style={{
          borderRadius: '200px',
          color: 'black',
          width: '100%',

        }}
        transparent={!((type === 'location' && progressRedux > 0)
        || (type === 'site' && progressRedux > 1)
        || (type === 'goals' && progressRedux > 2))}
        title={getIconInfo(type)}
      />
    );
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#598445',
        p: '8px 0',
      }}
      justifyContent="right"
    >
      {pathname === speciesSelectorToolName && progressRedux > 0 && !isMobile && (
        <Grid item container xs={12} sm={12} md={12} lg={7.5} spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            {getData('location')}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            {getData('site')}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            {getData('goals')}
          </Grid>
        </Grid>
      )}

      <Grid
        container
        item
        justifyContent={isMobile ? 'center' : 'right'}
        xs={12}
        lg={progressRedux > 0 && !isMobile ? 4 : 12}
        marginRight={isMobile ? 0 : 2}
      >
        {pathname === speciesSelectorToolName
          ? <ProgressButtons />
          : <NavigationButtons pathname={pathname} />}
      </Grid>

    </Grid>
  );
};

export default InformationBar;
