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
import Map from '../../components/Map/Map';
import { BinaryButton } from '../../shared/constants';
import { MapboxApiKey } from '../../shared/keys';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LocationComponent = ({ title, caller, defaultMarkers, closeExpansionPanel }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
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
  }, [zoneSelection]);

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
    const { latitude, longitude, address, fullAddress, zipCode } = selectedToEditSite;

    if (Object.keys(selectedToEditSite).length > 0) {
      dispatch({
        type: 'UPDATE_LOCATION',
        data: {
          address,
          latitude,
          longitude,
          zipCode: zipCode,
        },
      });

      dispatch({
        type: 'UPDATE_MARKER',
        data: {
          markers: [[latitude, longitude]],
        },
      });

      dispatch({
        type: 'SNACK',
        data: {
          snackOpen: true,
          snackMessage: 'Your location has been saved.',
        },
      });

      if (selectedToEditSite.address) {
        dispatch({
          type: 'CHANGE_ADDRESS_VIA_MAP',
          data: {
            address: address,
            fullAddress: fullAddress,
            zipCode: zipCode,
            addressVerified: true,
          },
        });
      }
    }
  }, [selectedToEditSite, dispatch]);


  
  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow mx-0 px-0 mx-lg-3 px-lg-3" style={{ minHeight: '520px' }}>
        <div className="col-xl-4 col-sm-12">
          <div className="container-fluid">
            <Typography variant="h4" align="left">
              Where is your field located?
            </Typography>
            <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
              Select your USDA plant hardiness zone, search your address, or zip code and hit
              <Search fontSize="inherit" />
              to determine your location.
            </Typography>
            <div className="row py-3 my-4 ">
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
          </div>
        </div>
        {/* <div className="col-xl-1 col-sm-0"></div> */}
        <div className="col-xl-8 col-sm-12">
          <div className="container-fluid">
            <Map
              initViewport={{
                width: '100%',
                height: '600px',
                latitude: (state.markers && state.markers.length>0) ? state.markers[0][0] : 47,
                longitude: (state.markers && state.markers.length>0) ? state.markers[0][1] : -122,
                minZoom: 4,
                maxZoom: 18,
                startZoom: 12,
              }}
              address={selectedToEditSite}
              setAddress={setSelectedToEditSite}
              apiKey={MapboxApiKey}
              hasSearchBar={true}
              hasMarker={true}
            />
          </div>
        </div>
      </div>
      <Dialog disableEscapeKeyDown open={showRestartPrompt}>
        <DialogContent dividers>
          <Typography variant="body1">
            This will trigger a restart. Would you also like to clear My Cover Crop List?
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
