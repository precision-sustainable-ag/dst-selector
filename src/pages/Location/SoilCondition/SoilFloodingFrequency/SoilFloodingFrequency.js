import {
  Button, Typography, Grid, Box, useMediaQuery, useTheme,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { WavesOutlined } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderFloodingOptions from './RenderFloodingOptions';
import { updateFloodingFrequency } from '../../../../reduxStore/soilSlice';

const SoilFloodingFrequency = ({ floodingOptions }) => {
  const dispatchRedux = useDispatch();
  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);

  const resetFloodingOptions = () => {
    dispatchRedux(updateFloodingFrequency(soilDataOriginalRedux?.floodingFrequency));
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        borderRadius: '15px',
        border: '2px solid #598445',
        height: '100%',
      }}
    >
      <Grid container>
        <Grid
          item
          container
          sx={{
            p: '1rem',
            mb: '1rem',
            height: '100%',
            borderTopLeftRadius: '15px', // Top left corner
            borderTopRightRadius: '15px', // Top right corner
            borderBottomLeftRadius: '0', // Bottom left corner
            borderBottomRightRadius: '0', // Bottom right corner
          }}
          xs={12}
        >
          <Grid item sx={{ mr: '1rem' }}>
            <WavesOutlined />
          </Grid>
          <Grid item flexGrow={1}>
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
                      overflowing streams, by runoff from adjacent slopes, or by tides.
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
                sx={{
                  backgroundColor: 'rgba(255, 150, 28, 0.2)',
                  borderRadius: '999px',
                  padding: '0.5rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 150, 28, 0.3)',
                  },
                  '@media (max-width:600px)': {
                    padding: '0.5rem',
                    borderRadius: '999px',
                    '& .MuiTypography-root': {
                      fontSize: '0.7rem',
                    },
                  },
                }}
                size="small"
                onClick={() => {
                  resetFloodingOptions();
                }}
              >
                {isMobile ? (
                  <RestartAltIcon sx={{ color: '#ff961c' }} />
                ) : (
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
                )}
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item container spacing={1} sx={{ mb: '1rem' }}>
          <Grid item xs={12}>
            <RenderFloodingOptions floodingOptions={floodingOptions} flooding={soilDataRedux?.floodingFrequency} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SoilFloodingFrequency;
