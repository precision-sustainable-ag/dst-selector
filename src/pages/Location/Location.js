/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Search } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/Store';
import '../../styles/location.scss';
import GoogleAutocomplete from './GoogleAutocomplete/GoogleAutocomplete';
import MapContext from './MapContext/MapContext';
import { BinaryButton } from '../../shared/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LocationComponent = ({
  title, caller, defaultMarkers, closeExpansionPanel,
}) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [restartAccept, setRestartAccept] = useState(false);
  const [zoneSelection, setZoneSelection] = useState();
  useEffect(() => {
    document.title = title || 'Decision Support Tool';
  }, [title]);
  const zones = [4, 5, 6, 7];

  useEffect(() => {
    const curZone = zoneSelection ?? sfilters.zone;
    dispatch({
      type: 'UPDATE_ZONE_TEXT',
      data: {
        zoneText: zones.includes(curZone) ? `Zone ${curZone}` : 'Zone 7',
        zone: zones.includes(curZone) ? curZone : 7,
      },
    });
  }, [restartAccept, zoneSelection]);

  const handleConfirmationChoice = (choice) => {
    if (choice !== null) {
      if (choice) {
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
      closeExpansionPanel();
      setRestartAccept(true);
    }
    setShowRestartPrompt(false);
  };

  const handleZoneChange = (event) => {
    if (caller === 'greenbar') {
      setShowRestartPrompt(true);
    }
    setZoneSelection(event.target.value);
  };

  useEffect(() => {
    const {
      latitude, longitude, address, zipCode,
    } = selectedToEditSite;
    if (Object.keys(selectedToEditSite).length === 5) {
      dispatch({
        type: 'UPDATE_LOCATION',
        data: {
          address,
          latitude,
          longitude,
          zip: zipCode,
        },
      });
    }
  }, [selectedToEditSite, dispatch]);

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow" style={{ minHeight: '520px' }}>
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <Typography variant="h4">Where is your field located?</Typography>
            <Typography variant="body1" align="left" className="pt-3">
              Enter your USDA plant hardiness zone, address, or zip code and hit
              {' '}
              <Search fontSize="inherit" />
              {' '}
              to determine your location.
            </Typography>
            <div className="row pt-3 mt-4">
              <div className="col-md-9 col-lg-8 col-sm-12 row">
                <GoogleAutocomplete
                  selectedToEditSite={selectedToEditSite}
                  setSelectedToEditSite={setSelectedToEditSite}
                />
              </div>
              <div className="col-md-3 col-lg-4 col-sm-12 col-12">
                <FormControl
                  variant="filled"
                  style={{ width: '100%' }}
                  className={classes.formControl}
                >
                  <InputLabel>PLANT HARDINESS ZONE</InputLabel>
                  <Select
                    variant="filled"
                    labelId="plant-hardiness-zone-dropdown-select"
                    id="plant-hardiness-zone-dropdown-select"
                    style={{
                      textAlign: 'left',
                    }}
                    onChange={handleZoneChange}
                    value={parseInt(sfilters.zone, 10)}
                  >
                    {zones.map((zone, i) => (
                      <MenuItem value={zone} key={`Zone${zone}${i}`}>
                        {`Zone ${zone}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-6 offset-md-6 col-sm-12 row"
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-6 col-sm-12" />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12">
          <MapContext width="100%" height="400px" minzoom={4} maxzoom={20} from="location" />
        </div>
      </div>
      <Dialog disableEscapeKeyDown open={showRestartPrompt}>
        <DialogContent dividers>
          <Typography variant="body1">
            This will trigger a restart.  Would you also like to clear My Cover Crop List?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton action={handleConfirmationChoice} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LocationComponent;
