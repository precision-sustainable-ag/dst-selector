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
      && legendData.map((item, key) => (
        <Grid item className="legendModalRow" key={`gird index ${key}`}>
          <Typography variant="body1">
            {
              modal && ((item.className === 'hessianFlyFree')
                ? (
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ marginLeft: '13px', marginRight: '3px' }}
                    className={`${item.className}`}
                  >
                    <polygon
                      points="50,0 100,50 50,100 0,50"
                      fill="green"
                      strokeWidth={0}
                    />
                  </svg>
                )
                : <FiberManualRecord style={{ marginLeft: '9px' }} className={`${item.className}`} />
              )
            }
            {/* {modal && <FiberManualRecord style={{ marginLeft: '9px' }} className={`${item.className}`} />} */}
            <span style={{ paddingLeft: '1px' }}>{`${item.label}`}</span>
          </Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

export default Legend;
