/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import {
  Button, Dialog, DialogActions, DialogContent, Typography,
} from '@mui/material';
import { LocationOn, Refresh } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { BinaryButton, CustomStyles, greenBarExpansionPanelHeight } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/greenBar.scss';
import LocationComponent from '../../Location/Location';
import SoilCondition from '../../Location/SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const speciesSelectorToolName = '/species-selector';

const expansionPanelBaseStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const greenBarWrapperBackground = {
  backgroundColor: CustomStyles().lighterGreen,
};

const InformationBar = () => {
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [expansionPanelComponent, setExpansionPanelComponent] = useState({
    component: '',
  });
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const closeExpansionPanel = () => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');
    greenbarExpansionElement.style.transform = 'translate(0px,0px)';
    greenbarExpansionElement.style.minHeight = '0px';
    setExpansionPanelComponent({
      component: '',
    });
  };

  const handleBtnClick = (type) => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');
    if (
      expansionPanelComponent.component === type
      && greenbarExpansionElement.style.minHeight === greenBarExpansionPanelHeight.large
    ) {
      // toggle
      closeExpansionPanel();
    } else {
      greenbarExpansionElement.style.transform = 'translate(0px,0px)';
      greenbarExpansionElement.style.minHeight = greenBarExpansionPanelHeight.large;
      setExpansionPanelComponent({
        component: type,
      });
    }
  };

  const getIconInfo = (type) => {
    if (type === 'soil') {
      return (
        <>
          <FilterHdrIcon />
            &nbsp;
          {' '}
          {/* {`Soils: Map Unit Name (${state.soilData.Map_Unit_Name}%), Drainage Class: ${state.soilData.Drainage_Class}})`} */}
          {`Soils: Drainage Class: ${state.soilData.Drainage_Class.toString()
            .split(',')
            .join(', ')}`}
        </>
      );
    }

    if (type === 'location') {
      return (
        <>
          <LocationOn />
            &nbsp;Zone
          {' '}
          {sfilters.zone}
          :
          {' '}
          {state.address}
        </>
      );
    }

    if (type === 'weather') {
      const currentMonth = moment().format('MMM');
      return (
        <>
          <CloudIcon fontSize="small" />
            &nbsp;
          {' '}
          {`Avg First Frost: ${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day} 
          | Avg Rain(${currentMonth}): ${state.weatherData.averagePrecipitation.thisMonth} in`}
        </>
      );
    }

    return '';
  };

  const getData = (type) => {
    // eslint-disable-next-line max-len
    if ((state.soilData.Flooding_Frequency === null && type === 'soil') || (type === 'address' && state.address === '') || (type === 'weather' && state.weatherData.length === 0)) {
      return '';
    }

    return (
      <Button
        className="greenbarBtn"
        onClick={() => handleBtnClick(type)}
        style={{ background: expansionPanelComponent.component === type && 'white' }}
      >
        <span
          style={{ color: expansionPanelComponent.component === type && 'black' }}
        >
          {getIconInfo(type)}
        </span>
      </Button>
    );
  };

  const handleConfirmationChoice = (clearCoverCrops = false) => {
    if (clearCoverCrops !== null) {
      if (clearCoverCrops) {
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: [],
          },
        });
      } else {
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: state.selectedCrops,
          },
        });
      }
    }
    setConfirmationOpen(false);
  };

  return (
    <div className="greenBarParent" id="greenBarParent">
      <div className="greenBarWrapper" style={greenBarWrapperBackground}>
        <div className="addressBar">
          {state.progress > 0 && window.location.pathname === speciesSelectorToolName
            && getData('location')}
        </div>

        <div className="soilBar">
          {state.progress > 1 && window.location.pathname === speciesSelectorToolName
            && getData('soil')}
        </div>
        <div className="weatherBar">
          {state.progress > 2 && window.location.pathname === speciesSelectorToolName
            && getData('weather')}
        </div>
        {state.progress > 0 && window.location.pathname === speciesSelectorToolName && (
          <div className="restartBtnWrapper">
            <Button
              className="greenbarBtn"
              onClick={() => {
                closeExpansionPanel();
                setConfirmationOpen(true);
              }}
            >
              <Refresh />
              &nbsp; Restart
            </Button>
          </div>
        )}
      </div>
      <div
        className="greenBarExpansionPanel container-fluid pl-0 pr-0"
        id="greenBarExpansionPanel"
      >
        <div className="row justify-content-center align-items-center">
          <div
            className={expansionPanelComponent.component === 'location' ? 'col-md-10' : 'col-md-6'}
          >
            {expansionPanelComponent.component === 'location' && (
              <LocationComponent caller="greenbar" title="Location" defaultMarkers={defaultMarkers} closeExpansionPanel={closeExpansionPanel} />
            )}
            {expansionPanelComponent.component === 'soil' && (
              <div className="container mt-5" style={expansionPanelBaseStyle}>
                <div className="row boxContainerRow" style={{ minHeight: '526px' }}>
                  <SoilCondition caller="greenbar" />
                </div>
              </div>
            )}
            {expansionPanelComponent.component === 'weather' && (
              <div className="container mt-5" style={expansionPanelBaseStyle}>
                <div className="row boxContainerRow" style={{ minHeight: '526px' }}>
                  <WeatherConditions caller="greenbar" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={expansionPanelComponent.component === '' ? { height: '0px' } : { height: '50px' }}
        >
          {expansionPanelComponent.component !== '' && (
            <div
              className="pt-2 pb-2"
              style={{
                position: 'absolute',
                bottom: '-30px',
                textAlign: 'center',
                width: '100%',
                background: 'linear-gradient(to top, #506147, #598344)',
              }}
            >
              <Button variant="contained" onClick={closeExpansionPanel}>
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
      <Dialog onClose={() => handleConfirmationChoice(null)} open={confirmationOpen}>
        <DialogContent dividers>
          <Typography variant="body1">
            Would you also like to clear My Cover Crop List?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={handleConfirmationChoice}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InformationBar;
