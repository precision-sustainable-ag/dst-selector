/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone
  styled from from CustomStyles in ../../../shared/constants
*/

import {
  Dialog, DialogActions, DialogContent, Grid, Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Context } from '../../store/Store';
import Header from '../Header/Header';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import ConsentModal from './ConsentModal/ConsentModal';
import CropSidebar from '../CropSidebar/CropSidebar';
import { BinaryButton } from '../../shared/constants';

const CoverCropExplorer = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  const { activeCropData } = state;
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  useEffect(() => {
    const filteredActiveCropData = activeCropData?.filter((a) => !a.inactive);
    setUpdatedActiveCropData(filteredActiveCropData);
    // getData();
  }, [activeCropData]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop explorer');
    }
  }, [state.consent]);

  useEffect(() => {
    if (localStorage.getItem('lastLocation') === 'CropSelector') {
      document.title = 'Cover Crop Explorer';
      if (state.selectedCrops?.length) {
        setHandleConfirm(true);
      }
    }
    localStorage.setItem('lastLocation', 'CoverCropExplorer');
  }, []);

  const handleConfirmationChoice = (clearMyList = false) => {
    if (clearMyList) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
    } else {
      history.goBack();
      if (window.location.pathname !== '/species-selector') {
        history.push('/species-selector');
      }
    }
    setHandleConfirm(false);
  };

  return (
    <div className="contentWrapper">
      <ConsentModal consent={state.consent} />
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-4 mb-4">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-3 col-xl-2 col-12">
            <CropSidebar
              from="explorer"
              activeCropData={activeCropData?.length > 0 ? activeCropData : state?.cropData}
              isListView
            />
          </div>
          <div className="col-md-12 col-lg-9 col-xl-10 col-12">
            {sfilters.zone === '' || sfilters.zone === undefined ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Please choose a zone from the sidebar
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <ExplorerCardView
                cropData={state?.cropData}
                activeCropData={updatedActiveCropData}
              />
            )}
          </div>
        </div>
      </div>
      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            You will need to clear your My Cover Crop List to continue.  Would you like to continue?
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

export default CoverCropExplorer;
