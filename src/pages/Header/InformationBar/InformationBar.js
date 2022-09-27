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
import { CustomStyles, greenBarExpansionPanelHeight } from '../../../shared/constants';
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
  const [restartPrompt2, setRestartPrompt2] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [expansionPanelComponent, setExpansionPanelComponent] = useState({
    component: '',
  });

  const closeExpansionPanel = () => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');
    greenbarExpansionElement.style.transform = 'translate(0px,0px)';
    greenbarExpansionElement.style.minHeight = '0px';
    setExpansionPanelComponent({
      component: '',
    });
  };
  const handleAddressBtnClick = () => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');
    if (
      expansionPanelComponent.component === 'location'
      && greenbarExpansionElement.style.minHeight === greenBarExpansionPanelHeight.large
    ) {
      // toggle
      closeExpansionPanel();
    } else {
      greenbarExpansionElement.style.transform = 'translate(0px,0px)';
      greenbarExpansionElement.style.minHeight = greenBarExpansionPanelHeight.large;
      setExpansionPanelComponent({
        component: 'location',
      });
    }
  };
  const getAddress = () => {
    if (state.address === '') {
      return '';
    }
    return (
      <Button
        className="greenbarBtn"
        onClick={handleAddressBtnClick}
        style={
            expansionPanelComponent.component === 'location'
              ? {
                background: 'white',
              }
              : {}
          }
      >
        <span
          style={
              expansionPanelComponent.component === 'location'
                ? {
                  color: 'black',
                }
                : {}
            }
        >
          <LocationOn />
            &nbsp;Zone
          {' '}
          {sfilters.zone}
          :
          {' '}
          {state.address}
        </span>
      </Button>
    );
  };
  const handleSoilBtnClick = () => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');
    if (
      expansionPanelComponent.component === 'soil'
      && greenbarExpansionElement.style.minHeight === greenBarExpansionPanelHeight.large
    ) {
      // toggle
      closeExpansionPanel();
    } else {
      greenbarExpansionElement.style.transform = 'translate(0px,0px)';
      greenbarExpansionElement.style.minHeight = greenBarExpansionPanelHeight.large;
      setExpansionPanelComponent({
        component: 'soil',
      });
    }
  };
  const handleWeatherBtnClick = () => {
    const greenbarExpansionElement = document.getElementById('greenBarExpansionPanel');

    if (
      expansionPanelComponent.component === 'weather'
      && greenbarExpansionElement.style.minHeight === greenBarExpansionPanelHeight.large
    ) {
      // toggle
      closeExpansionPanel();
    } else {
      greenbarExpansionElement.style.transform = 'translate(0px,0px)';
      greenbarExpansionElement.style.minHeight = greenBarExpansionPanelHeight.large;
      setExpansionPanelComponent({
        component: 'weather',
      });
    }
  };
  const getSoil = () => {
    if (state.soilData.Flooding_Frequency === null) {
      return '';
    } return (
      <Button
        className="greenbarBtn"
        onClick={handleSoilBtnClick}
        style={
            expansionPanelComponent.component === 'soil'
              ? {
                background: 'white',
              }
              : {}
          }
      >
        <span
          style={
              expansionPanelComponent.component === 'soil'
                ? {
                  color: 'black',
                }
                : {}
            }
        >
          <FilterHdrIcon />
            &nbsp;
          {' '}
          {/* {`Soils: Map Unit Name (${state.soilData.Map_Unit_Name}%), Drainage Class: ${state.soilData.Drainage_Class}})`} */}
          {`Soils: Drainage Class: ${state.soilData.Drainage_Class.toString()
            .split(',')
            .join(', ')}`}
        </span>
      </Button>
    );
  };

  const handleConfirmationChoice = (clearCoverCrops = false) => {
    const defaultMarkers = [[40.78489145, -74.80733626930342]];

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

    setConfirmationOpen(false);
  };

  const getWeatherData = () => {
    // TODO: convert month to string, currently returning int
    // let currentMonth = GetMonthString(month);
    const currentMonth = moment().format('MMM');
    // frost free days :-
    // NOTE: IP has been permanently changed to a URL. check constants
    if (state.weatherData.length === 0) return '';
    return (
      <Button
        className="greenbarBtn"
        onClick={handleWeatherBtnClick}
        style={
            expansionPanelComponent.component === 'weather'
              ? {
                background: 'white',
              }
              : {}
          }
      >
        <span
          style={
              expansionPanelComponent.component === 'weather'
                ? {
                  color: 'black',
                }
                : {}
            }
        >
          <CloudIcon fontSize="small" />
            &nbsp;
          {' '}
          {`Avg First Frost: ${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day} 
          | Avg Rain(${currentMonth}): ${state.weatherData.averagePrecipitation.thisMonth} in`}
        </span>
      </Button>
    );
  };

  return (
    <div className="greenBarParent" id="greenBarParent">
      <div className="greenBarWrapper" style={greenBarWrapperBackground}>
        <div className="addressBar">
          {state.progress > 0 && window.location.pathname === speciesSelectorToolName
            && getAddress()}
        </div>

        <div className="soilBar">
          {state.progress > 1 && window.location.pathname === speciesSelectorToolName
            && getSoil()}
        </div>
        <div className="weatherBar">
          {state.progress > 2 && window.location.pathname === speciesSelectorToolName
            && getWeatherData()}
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
        style={{}}
      >
        <div className="row justify-content-center align-items-center">
          <div
            className={expansionPanelComponent.component === 'location' ? 'col-md-10' : 'col-md-6'}
          >
            {expansionPanelComponent.component === 'location' && (
              <LocationComponent caller="greenbar" title="Location" />
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
      <Dialog disableEscapeKeyDown open={restartPrompt2}>
        {/* <DialogTitle>Clear My Cover Crop List?</DialogTitle> */}
        <DialogContent dividers>
          <Typography variant="body1">
            Would you also like to clear My Cover Crop List?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setRestartPrompt2(false);
            }}
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleConfirmationChoice(true);
              setRestartPrompt2(false);
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog disableEscapeKeyDown open={confirmationOpen}>
        <DialogContent dividers>
          <Typography variant="body1">
            {state.selectedCrops.length > 0
              ? `Restarting will remove all cover crops added to your list. Are you
            sure you want to restart?`
              : 'Are you sure you want to restart?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setConfirmationOpen(false);
            }}
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleConfirmationChoice(true);
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InformationBar;