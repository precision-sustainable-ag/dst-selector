/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
*/

import {
  Grid, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import { Context } from '../../../store/Store';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { snackHandler } from '../../../reduxStore/sharedSlice';

const ExplorerCardView = ({ activeCropData }) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const [selectedBtns, setSelectedBtns] = useState(
    selectedCropsRedux.map((crop) => crop.id),
  );
  useEffect(() => {
    const newSelectedBtns = selectedCropsRedux.map((crop) => crop.id);
    setSelectedBtns(newSelectedBtns);
  }, [sfilters.zone, selectedCropsRedux]);

  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = (crop) => {
    // put data inside modal;
    setModalData(crop);
    setModalOpen(true);
  };

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    const selectedCrops = {};
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.data = cropData;

    const buildDispatch = (action, crops) => {
      dispatchRedux(selectedCropsModifier(crops));
      dispatchRedux(snackHandler({ snackOpen: false, snackMessage: `${cropName} ${action}` }));
      // dispatch({
      //   type: 'SELECTED_CROPS_MODIFIER',
      //   data: {
      //     selectedCrops: crops,
      //     snackOpen: false,
      //     snackMessage: `${cropName} ${action}`,
      //   },
      // });
      enqueueSnackbar(`${cropName} ${action}`);
    };

    if (selectedCropsRedux?.length > 0) {
      // DONE: Remove crop from basket
      let removeIndex = -1;
      selectedCropsRedux.forEach((item, i) => {
        if (item.id === cropId) {
          removeIndex = i;
        }
      });
      if (removeIndex === -1) {
        // element not in array
        buildDispatch('added', [...selectedCropsRedux, selectedCrops]);
      } else {
        const selectedCropsCopy = selectedCropsRedux;
        selectedCropsCopy.splice(removeIndex, 1);

        buildDispatch('Removed', selectedCropsCopy);
      }
    } else {
      dispatch({
        type: 'MY_CROP_LIST_LOCATION',
        data: { from: 'explorer' },
      });
      buildDispatch('Added', [selectedCrops]);
    }
  };

  return (
    <>
      <Grid style={{ marginLeft: '40px' }} container spacing={2}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {activeCropData?.length > 0 ? (
          activeCropData.map((crop, index) => (
            <Grid style={{ width: '260px' }} item key={index}>
              <CropCard
                crop={crop}
                handleModalOpen={handleModalOpen}
                addCropToBasket={addCropToBasket}
                selectedBtns={selectedBtns}
                index={index}
                removeCrop={addCropToBasket}
                type="explorer"
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
  );
};

export default ExplorerCardView;
