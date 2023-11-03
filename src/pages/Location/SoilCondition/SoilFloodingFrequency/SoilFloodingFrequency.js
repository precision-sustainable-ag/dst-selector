import {
  Button, Typography, Grid, Box,
} from '@mui/material';
import { WavesOutlined } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderFloodingOptions from './RenderFloodingOptions';
import { updateFloodingFrequency } from '../../../../reduxStore/soilSlice';

const SoilFloodingFrequency = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);

  const resetFloodingOptions = () => {
    dispatchRedux(updateFloodingFrequency(soilDataOriginalRedux?.floodingFrequency));
  };

  return (
    <Grid
      item
      direction="column"
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.5rem',
        width: 'auto',
        border: '2px solid #598445',
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item direction="row" display="flex" alignItems="center" padding="0 4.8px">
        <Grid item>
          <Box
            style={{
              backgroundColor: 'rgba(176, 236, 130, 0.8)',
              padding: '10px',
              borderRadius: '10px',
              marginRight: '10px',
            }}
          >
            <WavesOutlined />
          </Box>
        </Grid>

        <Grid item style={{ flexGrow: 1 }}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Flooding Frequency</span>
            &nbsp;
            {' '}
            <ReferenceTooltip
              type="text"
              hasLink
              title={(
                <div>
                  <Typography variant="body1">
                    The annual probability of a flood event based on the
                    {' '}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USDA NRCS Web Soil Survey
                    </a>
                    , where “flood” refers to the temporary inundation of an area caused by
                    overflowing streams, by runoff from adjacent slopes, or by tides. You may modify
                    your flooding frequency by clicking below.
                    {' '}
                    <a
                      href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/soils/ref/?cid=nrcs142p2_054253"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      Definitions of values found here
                    </a>
                    .
                  </Typography>
                </div>
              )}
            />
          </Typography>
        </Grid>
        {!arrayEquals(
          soilDataRedux?.floodingFrequency,
          soilDataOriginalRedux?.floodingFrequency,
        ) && (
          <Grid item>
            <Button
              style={{
                backgroundColor: 'rgba(255, 150, 28, 0.2)',
                borderRadius: '999px',
                padding: '14.8px',
              }}
              size="small"
              onClick={() => {
                resetFloodingOptions();
              }}
            >
              <Typography
                sx={{
                  color: '#ff961c',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                }}
                variant="button"
              >
                Values changed, reset?
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>

      <Grid item>
        <RenderFloodingOptions flooding={soilDataRedux?.floodingFrequency} />
      </Grid>
    </Grid>
  );
};

export default SoilFloodingFrequency;
