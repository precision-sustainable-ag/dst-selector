import {
  Typography, Grid, Box,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { WavesOutlined } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderFloodingOptions from './RenderFloodingOptions';
import { updateFloodingFrequency } from '../../../../reduxStore/soilSlice';
import { historyState, setHistoryState } from '../../../../reduxStore/userSlice';
import useIsMobile from '../../../../hooks/useIsMobile';

const SoilFloodingFrequency = ({ floodingOptions }) => {
  const dispatchRedux = useDispatch();
  const isMobile = useIsMobile('sm');

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const resetFloodingOptions = () => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    dispatchRedux(updateFloodingFrequency(soilDataOriginalRedux?.floodingFrequency));
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        borderRadius: '15px',
        border: '2px solid #598445',
        height: '100%',
        width: '100%',
      }}
      data-test="flooding-frequency-card"
    >
      <Grid container>
        <Grid
          item
          container
          sx={{
            p: '1rem',
            mb: '1rem',
          }}
          alignItems="center"
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
                        href="/data-dictionary"
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
                content="The annual probability of a flood event based on the USDA NRCS Web Soil Survey,
                 where “flood” refers to the temporary inundation of an area caused by verflowing streams,
                 by runoff from adjacent slopes, or by tides.
                 Definitions of values can be found in the data dictionary."
              />
            </Typography>
          </Grid>
          {!arrayEquals(
            soilDataRedux?.floodingFrequency,
            soilDataOriginalRedux?.floodingFrequency,
          ) && (
            <Grid item>
              <PSAButton
                buttonType="ValuesChanged"
                data-test="values-changed-button"
                onClick={() => {
                  resetFloodingOptions();
                }}
                title={isMobile ? (
                  <RestartAltIcon sx={{ color: '#C73200' }} />
                ) : (
                  <Typography
                    sx={{
                      color: '#C73200',
                      fontSize: '0.8rem',
                      textTransform: 'none',
                    }}
                    variant="button"
                  >
                    Values changed, reset?
                  </Typography>
                )}
              />
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
