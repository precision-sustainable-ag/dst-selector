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
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import { reset } from '../../reduxStore/store';
import Header from '../Header/Header';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import ConsentModal from './ConsentModal/ConsentModal';
import CropSidebar from '../CropSidebar/CropSidebar';
import { BinaryButton } from '../../shared/constants';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';

const CoverCropExplorer = () => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  // const { activeCropData } = state;
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);

  useEffect(() => {
    const filteredActiveCropData = activeCropDataRedux?.filter((a) => !a.inactive);
    setUpdatedActiveCropData(filteredActiveCropData);
    // getData();
  }, [activeCropDataRedux]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop explorer');
    }
  }, [state.consent]);

  useEffect(() => {
    if (stateLabelRedux === '') {
      history.push('/');
    }
  }, [stateLabelRedux]);

  useEffect(() => {
    if (state?.myCoverCropListLocation !== 'explorer' && selectedCropsRedux?.length > 0) {
      // document.title = 'Cover Crop Explorer';
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, state.myCoverCropListLocation]);

  const handleConfirmationChoice = (clearMyList = false) => {
    if (clearMyList) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
      dispatchRedux(reset());
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
              activeCropData={activeCropDataRedux?.length > 0 ? activeCropDataRedux : cropDataRedux}
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
                cropData={cropDataRedux}
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
