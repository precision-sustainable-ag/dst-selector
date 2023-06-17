/*
  This file contains the InformationBar component, helper functions, and styles
  The InformationBar page is the bar in the header that contains the location, soil drainage info, temperature, and restart button
  Styles are created using CustomStyles from ../../../shared/constants and ../../../styles/greenBar.scss
*/

import {
  Button,
  // Chip,
  Dialog, DialogActions, DialogContent, Grid, Typography,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import CheckIcon from '@mui/icons-material/Check';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import React, { useContext, useState } from 'react';
import { BinaryButton } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/greenBar.scss';
import LocationComponent from '../../Location/Location';
import SoilCondition from '../../Location/SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';
import ProgressButtons from '../../../shared/ProgressButtons';

const speciesSelectorToolName = '/';

const expansionPanelBaseStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const InformationBar = () => {
  const { state, dispatch } = useContext(Context);
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
    let progress;

    if (type === 'location') {
      progress = 1;
    } else if (type === 'soil') {
      progress = 2;
    } else if (type === 'weather') {
      progress = 3;
    } else if (type === 'goals') {
      progress = 4;
    }

    dispatch({
      type: 'GOTO_PROGRESS',
      data: {
        progress,
      },
    });
  };

  const getIconInfo = (type) => {
    if (type === 'location') {
      return (
        <>
          <LocationOn />
            &nbsp;Location: Zone
          {' '}
          {state.zone}
        </>
      );
    }

    if (type === 'soil') {
      return (
        <>
          <FilterHdrIcon />
            &nbsp;
          {' '}
          {/* {`Soils: Map Unit Name (${state.soilData.Map_Unit_Name}%), Drainage Class: ${state.soilData.Drainage_Class}})`} */}
          {`Soil Drainage: ${state.soilData.Drainage_Class.toString()
            .split(',')
            .join(', ')}`}
        </>
      );
    }

    if (type === 'weather') {
      return (
        <>
          <CloudIcon fontSize="small" />
            &nbsp;
          {' '}
          {`First Frost: ${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day}`}
        </>
      );
    }

    if (type === 'goals') {
      return (
        <>
          <CheckIcon />
            &nbsp;Goals
        </>
      );
    }

    return '';
  };

  const getData = (type) => {
    if (
      (state.soilData.Flooding_Frequency === null && type === 'soil')
      || (type === 'address' && state.address === '')
      || (type === 'weather' && state.weatherData.length === 0)
    ) {
      return '';
    }

    return (
      <Button
        className={((type === 'location' && state.progress > 0)
        || (type === 'soil' && state.progress > 1)
        || (type === 'weather' && state.progress > 2)
        || (type === 'goals' && state.progress > 3)) ? 'greenbarBtn' : 'greenbarBtn2'}
        onClick={() => handleBtnClick(type)}
        style={{
          borderRadius: '200px',
          margin: '5px',
          background:
            ((type === 'location' && state.progress > 0)
            || (type === 'soil' && state.progress > 1)
            || (type === 'weather' && state.progress > 2)
            || (type === 'goals' && state.progress > 3)) && '#e3f2f4',
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
      <div className="greenBarWrapper">
        {state.progress > 0 && window.location.pathname === speciesSelectorToolName && (
        <Grid
          container
        >
          <Grid item xs={12} sm={6} md={6} lg={1.5}>
            {getData('location')}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3.5}>
            {getData('soil')}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2.5}>
            {getData('weather')}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={1.5}>
            {getData('goals')}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={2.5}
          >
            <ProgressButtons closeExpansionPanel={closeExpansionPanel} setConfirmationOpen={setConfirmationOpen} />
          </Grid>
        </Grid>
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
