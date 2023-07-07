/*
  This file contains the CropLegendModal and it's styles
  The CropLegendModal shows the color legend for the calendar view
*/

import {
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { CloseRounded, FiberManualRecord } from '@mui/icons-material';
import React from 'react';

const Legend = ({ handleLegendModal, legendData, modal }) => (
  <>
    {modal
      && (
      <Grid container>
        <Grid item xs={11} display="flex" justifyContent="center">
          <Typography variant="h4">LEGEND</Typography>
        </Grid>

        <Grid item xs={1} display="flex" justifyContent="flex-end">
          <Button onClick={handleLegendModal}>
            <CloseRounded />
          </Button>
        </Grid>
      </Grid>
      )}

    <Grid container>
      {legendData.length > 0
      && legendData.map((item) => (
        <Grid item className="legendModalRow">
          <Typography variant="body1">
            {modal && <FiberManualRecord style={{ marginLeft: '9px' }} className={`${item.className}`} />}
            <span style={{ paddingLeft: '1px' }}>{`${item.label}`}</span>
          </Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

export default Legend;
