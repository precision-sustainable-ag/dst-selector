/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
  Styles are created using makeStyles
*/

import {
  Grid, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, {
  useContext, useEffect, useState,
} from 'react';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import { Context } from '../../../store/Store';

const ExplorerCardView = ({ activeCropData }) => {
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const [selectedBtns, setSelectedBtns] = useState(
    state.selectedCrops.map((crop) => crop.id),
  );
  useEffect(() => {
    const newSelectedBtns = state.selectedCrops.map((crop) => crop.id);
    setSelectedBtns(newSelectedBtns);
  }, [sfilters.zone, state.selectedCrops]);

  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = (crop) => {
    // put data inside modal;
    setModalData({ fields: crop });

    setModalOpen(true);
  };
  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    const selectedCrops = {};
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.data = cropData;

    const buildDispatch = (action, crops) => {
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: crops,
          snackOpen: false,
          snackMessage: `${cropName} ${action}`,
        },
      });
      enqueueSnackbar(`${cropName} ${action}`);
    };
    if (state.selectedCrops.length > 0) {
      // DONE: Remove crop from basket
      const removeIndex = state.selectedCrops
        .map((item) => item.id)
        .indexOf(`${cropId}`);
      if (removeIndex === -1) {
        // element not in array
        buildDispatch('added', [...state.selectedCrops, selectedCrops]);
      } else {
        const selectedCropsCopy = state.selectedCrops;
        selectedCropsCopy.splice(removeIndex, 1);

        buildDispatch('Removed', selectedCropsCopy);
      }
    } else {
      buildDispatch('Added', [selectedCrops]);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {activeCropData.length > 0 ? (
          activeCropData.map((crop, index) => (
            <Grid item key={index}>
              <CropCard
                crop={crop.fields}
                handleModalOpen={handleModalOpen}
                addCropToBasket={addCropToBasket}
                selectedBtns={selectedBtns}
                index={index}
                removeCrop={addCropToBasket}
                type="explorer"
              />
            </Grid>
          ))
        ) : state.cropData.length > 0 ? (
          <Grid item>
            <Typography variant="body1" align="center">
              No cover crops match your selected Cover Crop Property filters.
            </Typography>
          </Grid>
        ) : (
          'Loading..'
        )}
      </Grid>
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default ExplorerCardView;
