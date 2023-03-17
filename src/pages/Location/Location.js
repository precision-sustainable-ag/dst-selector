/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import '../../styles/location.scss';
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
import React, { useContext, useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { Map } from '@psa/dst.ui.map';
import mapboxgl from 'mapbox-gl';
import { BinaryButton } from '../../shared/constants';
import { Context } from '../../store/Store';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const LocationComponent = ({
  title,
  caller,
  defaultMarkers,
  closeExpansionPanel,
}) => {
  const { state, dispatch } = useContext(Context);
  // const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const [selectedZone, setselectedZone] = useState();
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});

  useEffect(() => {
    document.title = title || 'Decision Support Tool';
  }, [title]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_REGION',
      data: {
        regionId: selectedRegion.id ?? '',
        regionLabel: selectedRegion.label ?? '',
        regionShorthand: selectedRegion.shorthand ?? '',
      },
    });
  }, [selectedRegion]);

  const updateZone = (region) => {
    setSelectedRegion(region);
    dispatch({
      type: 'UPDATE_ZONE',
      data: {
        zoneText: region.label,
        zone: region.shorthand,
      },
    });
  };

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

  const handleRegionChange = (event) => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = state.regions.filter((region) => region.shorthand == event.target.value);

    if (event.target) {
      if (caller === 'greenbar') {
        setShowRestartPrompt(true);
      }
      updateZone(regionInfo[0]);
    }
  };

  const handleMapChange = () => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = state.regions.filter((region) => region.shorthand == selectedZone);
    if (regionInfo.length > 0) {
      setSelectedRegion(regionInfo[0]);
    }
  };

  const plantHardinessZone = () => (
    <Select
      variant="filled"
      labelId="plant-hardiness-zone-dropdown-select"
      id="plant-hardiness-zone-dropdown-select"
      style={{
        textAlign: 'left',
      }}
      onChange={handleRegionChange}
      value={selectedZone || ''}
    >

      {state.regions.length > 0 && state.regions.map((region, i) => (
        <MenuItem value={region.shorthand} name={region.label} key={`Region${region}${i}`}>
          {`Zone ${region.shorthand.toUpperCase()}`}
        </MenuItem>
      ))}
    </Select>
  );

  useEffect(() => {
    plantHardinessZone();
  }, [selectedZone]);

  useEffect(() => {
    setselectedZone(state.zone);
  }, [state.zone]);

  useEffect(() => {
    const {
      latitude,
      longitude,
      address,
      fullAddress,
      zipCode,
    } = selectedToEditSite;

    if (Object.keys(selectedToEditSite).length > 0) {
      dispatch({
        type: 'UPDATE_LOCATION',
        data: {
          address,
          latitude,
          longitude,
          zipCode,
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
            address,
            fullAddress,
            zipCode,
            addressVerified: true,
          },
        });
      }
      handleMapChange();
    }
  }, [selectedToEditSite, selectedZone]);

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow mx-0 px-0 mx-lg-3 px-lg-3" style={{ minHeight: '520px' }}>
        <div className={`col-xl-${state.councilLabel === 'Midwest' ? '12' : '4'} col-sm-12`}>
          <div className="container-fluid">
            <Typography variant="h4" align="left">
              Where is your field located?
            </Typography>
            {state.councilLabel === 'Midwest'
              ? (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Please Select A County.
                </Typography>
              )
              : (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Select your USDA plant hardiness zone, search your address, or zip code and hit
                  <Search fontSize="inherit" />
                  to determine your location.

                </Typography>
              )}
            <div className="row py-3 my-4 ">
              <div className="col-md-5 col-lg-6 col-sm-12 col-12">
                <FormControl
                  variant="filled"
                  style={{ width: '100%' }}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel>PLANT HARDINESS ZONE</InputLabel>
                  {plantHardinessZone()}
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        {state.councilLabel !== 'Midwest'
            && (
            <div className="col-xl-8 col-sm-12">
              <div className="container-fluid">

                <Map
                  setAddress={setSelectedToEditSite}
                  initWidth="100%"
                  initHeight="600px"
                  initLat={state.markers && state.markers.length > 0 ? state.markers[0][0] : 47}
                  initLon={state.markers && state.markers.length > 0 ? state.markers[0][1] : -122}
                  initStartZoom={12}
                  initMinZoom={4}
                  initMaxZoom={18}
                  hasSearchBar
                  hasMarker
                  hasNavigation
                  hasCoordBar
                  hasDrawing
                  hasGeolocate
                  hasFullScreen
                  hasMarkerPopup
                  hasMarkerMovable
                />
              </div>
            </div>
            )}

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
