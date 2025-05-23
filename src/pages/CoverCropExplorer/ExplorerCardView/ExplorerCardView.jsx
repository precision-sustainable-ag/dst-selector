/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
*/

import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import CropCard from '../../../components/CropCard/CropCard';

const ExplorerCardView = ({ activeCropData }) => {
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);
  const dispatchRedux = useDispatch();
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);

  return (
    ajaxInProgressRedux ? (
      <Grid
        item
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px',
        }}
      >
        <PSALoadingSpinner />
      </Grid>
    ) : (
      <Grid container spacing={2} justifyContent="center">
        {/* eslint-disable-next-line no-nested-ternary */}
        {activeCropData?.length > 0 ? (
          activeCropData.map((crop, index) => (
            <Grid item key={index}>
              <CropCard crop={crop} dispatchRedux={dispatchRedux} />
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
    )
  );
};

export default ExplorerCardView;
