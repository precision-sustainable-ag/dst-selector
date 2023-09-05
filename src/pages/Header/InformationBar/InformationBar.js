/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import {
  Button, Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LocationOn } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import CheckIcon from '@mui/icons-material/Check';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import React, { useState } from 'react';
import '../../../styles/greenBar.scss';
import ProgressButtons from '../../../shared/ProgressButtons';
import MyCoverCropReset from '../../../components/MyCoverCropReset/MyCoverCropReset';
import { gotoProgress } from '../../../reduxStore/sharedSlice';

const speciesSelectorToolName = '/';

const InformationBar = ({ pathname }) => {
  const dispatchRedux = useDispatch();
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  // useState vars
  const [handleConfirm, setHandleConfirm] = useState(false);

  // functions
  const handleBtnClick = (type) => {
    const options = {
      location: 1,
      soil: 2,
      weather: 3,
      goals: 4,
    };

    const progress = options[type];

    dispatchRedux(gotoProgress(progress));
  };

  const getSelectedValues = (type) => {
    switch (type) {
      case 'location':
        return `Zone ${zoneRedux}`;
      case 'soil':
        return soilDataRedux?.drainageClass
          .toString()
          .split(',')
          .join(', ');
      case 'weather':
        return `${weatherDataRedux?.averageFrost?.firstFrostDate?.month} ${weatherDataRedux?.averageFrost?.firstFrostDate?.day}`;
      case 'goals':
        return selectedGoalsRedux
          .toString()
          .split(',')
          .join(', ');
      default: return '';
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
      case 'soil': return (
        <>
          <FilterHdrIcon />
          &nbsp;
          {' '}
          {/* {`Soils: Map Unit Name (${soilDataRedux?.mapUnitName}%), Drainage Class: ${soilDataRedux?.drainageClass}})`} */}
          {`Soil Drainage: ${getSelectedValues('soil')}`}
        </>
      );
      case 'weather':
        return (
          <>
            <CloudIcon fontSize="small" />
            &nbsp;
            {' '}
            {`First Frost: ${getSelectedValues('weather')}`}
          </>
        );
      case 'goals':
        return (
          <>
            <CheckIcon />
            &nbsp;Goals
          </>
        );
      default: return null;
    }
  };

  const getData = (type) => {
    if (
      (soilDataRedux?.floodingFrequency === null && type === 'soil')
      || (type === 'address' && addressRedux === '')
      || (type === 'weather' && weatherDataRedux.length === 0)
    ) {
      return '';
    }

    return (
      <Button
        className={((type === 'location' && progressRedux > 0)
        || (type === 'soil' && progressRedux > 1)
        || (type === 'weather' && progressRedux > 2)
        || (type === 'goals' && progressRedux > 3)) ? 'greenbarBtn' : 'greenbarBtn2'}
        onClick={() => handleBtnClick(type)}
        style={{
          borderRadius: '200px',
          margin: '5px',
          background:
            ((type === 'location' && progressRedux > 0)
            || (type === 'soil' && progressRedux > 1)
            || (type === 'weather' && progressRedux > 2)
            || (type === 'goals' && progressRedux > 3)) && '#e3f2f4',
        }}
      >
        <span
          style={{
            color: 'black',
          }}
        >
          {getIconInfo(type)}
        </span>
      </Button>
    );
  };

  return (
    <div className="greenBarParent" id="greenBarParent">
      <div className="greenBarWrapper">
        {pathname === speciesSelectorToolName && (
        <Grid
          container
        >
          {
            progressRedux > 0
            && (
            <Grid item container xs={12} sm={12} md={12} lg={9.5}>
              <Grid item xs={12} sm={6} md={6} lg={2.5}>
                {getData('location')}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3.5}>
                {getData('soil')}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2.5}>
                {getData('weather')}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2.5}>
                {getData('goals')}
              </Grid>
            </Grid>
            )
          }

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={2.5}
          >
            <ProgressButtons setConfirmationOpen={setHandleConfirm} />
          </Grid>
        </Grid>
        )}
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} goBack={false} />
    </div>
  );
};

export default InformationBar;
