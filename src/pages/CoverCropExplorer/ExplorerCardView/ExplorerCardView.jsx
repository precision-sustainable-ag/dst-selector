/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
*/

import {
  Grid, Typography, CircularProgress,
} from '@mui/material';
import React, {
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const ExplorerCardView = ({ activeCropData }) => {
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const dispatchRedux = useDispatch();
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

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
        <Grid container spacing={2} justifyContent="center">
          {/* eslint-disable-next-line no-nested-ternary */}
          {activeCropData?.length > 0 ? (
            activeCropData.map((crop, index) => (
              <Grid item key={index}>
                <CropCard
                  crop={crop}
                  handleModalOpen={handleModalOpen}
                  index={index}
                  dispatchRedux={dispatchRedux}
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
