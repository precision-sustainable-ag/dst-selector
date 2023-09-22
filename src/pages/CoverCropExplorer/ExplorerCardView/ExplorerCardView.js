/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
*/

import {
  Grid, Typography, CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const ExplorerCardView = ({ activeCropData }) => {
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = filterStateRedux[section];
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const dispatchRedux = useDispatch();
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const [selectedBtns, setSelectedBtns] = useState(
    selectedCropsRedux.map((crop) => crop.id),
  );

  // TODO: Update SelectedCropsRedux

  useEffect(() => {
    const newSelectedBtns = selectedCropsRedux;
    setSelectedBtns(newSelectedBtns);
  }, [sfilters.zone, selectedCropsRedux]);

  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = (crop) => {
    // put data inside modal;
    setModalData(crop);
    setModalOpen(true);
  };

  return (
    ajaxInProgressRedux ? (
      <CircularProgress style={{ marginLeft: '60px' }} size="6em" />
    ) : (
      <>
        <Grid style={{ marginLeft: '40px' }} container spacing={2}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {activeCropData?.length > 0 ? (
            activeCropData.map((crop, index) => (
              <Grid style={{ width: '260px' }} item key={index}>
                <CropCard
                  crop={crop}
                  handleModalOpen={handleModalOpen}
                  selectedBtns={selectedBtns}
                  index={index}
                  type="explorer"
                  dispatchRedux={dispatchRedux}
                  enqueueSnackbar={enqueueSnackbar}
                />
              </Grid>
            ))
          ) : cropDataRedux?.length > 0 ? (
            <Grid item>
              <Typography variant="body1" align="center">
                No cover crops match your selected Cover Crop Property filters.
              </Typography>
            </Grid>
          ) : (
            <div
              style={{ padding: '50px 0 0 50px' }}
            >
              <b>Please select a zone</b>
            </div>
          )}
        </Grid>
        <CropDetailsModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          crop={modalData}
        />
      </>
    )
  );
};

export default ExplorerCardView;
