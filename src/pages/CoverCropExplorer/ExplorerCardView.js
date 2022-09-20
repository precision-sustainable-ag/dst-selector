/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
  Styles are created using makeStyles
*/

import {
  Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { trimString } from '../../shared/constants';
import { Context } from '../../store/Store';
import CropDetailsModalComponent from '../CropSelector/CropDetailsModal';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 250,
  },
  media: {
    height: 140,
  },
});
const ExplorerCardView = ({ activeCropData }) => {
  const { state, dispatch } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const classes = useStyles();

  const [selectedBtns, setSelectedBtns] = useState(
    state.selectedCrops.map((crop) => crop.id),
  );
  useEffect(() => {
    const newSelectedBtns = state.selectedCrops.map((crop) => crop.id);
    setSelectedBtns(newSelectedBtns);
  }, [sfilters.zone, state.selectedCrops]);

  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = (crop) => {
    // put data inside modal
    setModalData(crop);

    setModalOpen(true);
  };
  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    const selectedCrops = {};
    let cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.data = cropData;

    cropArray = selectedCrops;

    if (state.selectedCrops.length > 0) {
      // DONE: Remove crop from basket
      const removeIndex = state.selectedCrops
        .map((item) => item.id)
        .indexOf(`${cropId}`);
      if (removeIndex === -1) {
        // element not in array
        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: false,
            snackMessage: `${cropName} Added`,
          },
        });
        enqueueSnackbar(`${cropName} Added`);
      } else {
        const selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: false,
            snackMessage: `${cropName} Removed`,
          },
        });
        enqueueSnackbar(`${cropName} Removed`);
      }
    } else {
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: [cropArray],
          snackOpen: false,
          snackMessage: `${cropName} Added`,
        },
      });
      enqueueSnackbar(`${cropName} Added`);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {activeCropData.length > 0 ? (
          activeCropData.map((crop, index) => (
            <Grid item key={index}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => handleModalOpen(crop)}>
                  <CardMedia
                    image={
                        crop.fields['Image Data']['Key Thumbnail']
                          ? `/images/Cover Crop Photos/250/${crop.fields['Image Data']['Key Thumbnail']}`
                          : 'https://placehold.it/100x100?text=Placeholder'
                      }
                    className={classes.media}
                    title={crop.fields['Cover Crop Name']}
                  />
                </CardActionArea>
                <CardContent>
                  <div
                    className="font-weight-bold text-muted text-uppercase"
                    style={{ fontSize: '10pt' }}
                  >
                    {crop.fields['Cover Crop Group']}
                  </div>
                  <div className="font-weight-bold " style={{ fontSize: '16pt' }}>
                    <Typography variant="h6" className="text-truncate">
                      {crop.fields['Cover Crop Name']}
                    </Typography>
                  </div>
                  <small className="font-italic text-muted d-inline-block text-truncate">
                    {trimString(crop.fields['Scientific Name'], 25)}
                  </small>
                  <div>
                    <small className="text-muted">
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                      <div
                        style={{
                          textDecoration: 'underline',
                          color: 'rgb(53, 153, 155)',
                        }}
                        target="_blank"
                        onClick={() => handleModalOpen(crop)}
                      >
                        View Crop Details
                      </div>
                    </small>
                  </div>
                </CardContent>
                <CardActionArea
                  id={`cartBtn${index}`}
                  style={{
                    backgroundColor: '#e3f2f4',
                    textAlign: 'center',
                    padding: '0.5em',
                  }}
                  className={
                      selectedBtns.includes(crop.fields.id)
                      && sfilters.zone === crop.fields.Zone
                        ? 'activeCartBtn'
                        : 'inactiveCartBtn'
                    }
                  onClick={() => {
                    addCropToBasket(
                      crop.fields.id,
                      crop.fields['Cover Crop Name'],
                      `cartBtn${index}`,
                      crop.fields,
                    );
                  }}
                >
                  <Typography
                    variant="body2"
                    className={`text-uppercase ${
                      selectedBtns.includes(crop.fields.id)
                        && sfilters.zone === crop.fields.Zone
                        ? 'text-white'
                        : ''
                    }`}
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {selectedBtns.includes(crop.fields.id)
                      && sfilters.zone === crop.fields.Zone
                      ? 'ADDED'
                      : 'ADD TO LIST'}
                  </Typography>
                </CardActionArea>
              </Card>
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

      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default ExplorerCardView;
