/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone
  styled from from CustomStyles in ../../../shared/constants
*/

import {
  Dialog, DialogActions, DialogContent, Grid, Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import Header from '../Header/Header';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import ConsentModal from './ConsentModal/ConsentModal';
import CropSidebar from '../CropSidebar/CropSidebar';
import { BinaryButton } from '../../shared/constants';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';

const CoverCropExplorer = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  // const { activeCropData } = state;
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  useEffect(() => {
    const filteredActiveCropData = activeCropDataRedux?.filter((a) => !a.inactive); //here
    setUpdatedActiveCropData(filteredActiveCropData);
    // getData();
  }, [activeCropDataRedux]); //here

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop explorer');
    }
  }, [state.consent]);

  useEffect(() => {
    if (state.state === '') {
      history.push('/');
    }
  }, [state.state]);

  useEffect(() => {
    if (state?.myCoverCropListLocation !== 'explorer' && state?.selectedCrops?.length > 0) {
      // document.title = 'Cover Crop Explorer';
      setHandleConfirm(true);
    }
  }, [state.selectedCrops, state.myCoverCropListLocation]);

  const handleConfirmationChoice = (clearMyList = false) => {
    if (clearMyList) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
      // setSpeciesSelectorActivationFlag();
    } else {
      setHandleConfirm(false);
    }
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
              activeCropData={activeCropDataRedux?.length > 0 ? activeCropDataRedux : state?.cropData} //here
              isListView
            />
          </div>
          <div className="col-md-12 col-lg-8 col-xl-9 col-10">
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
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </div>
  );
};

export default CoverCropExplorer;
