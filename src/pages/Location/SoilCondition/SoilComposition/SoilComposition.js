import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { Terrain } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { ReferenceTooltip } from '../../../../shared/constants';

const SoilComposition = () => {
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);

  return stateLabelRedux !== 'Ontario' ? (
    <Grid
      item
      container
      direction="row"
      style={{
        backgroundColor: 'rgba(176, 236, 130, 0.3)',
        borderRadius: '15px',
        padding: '1rem',
        // border: '2px solid #598445',
        width: 'auto',
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item direction="column">
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Soil Composition</span>
            &nbsp;
            {' '}
            <ReferenceTooltip
              type="text"
              hasLink
              title={(
                <div>
                  <Typography variant="body1">
                    {' '}
                    The tool auto-completes your soil composition based on location and the
                    {' '}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USDA NRCS Web Soil Survey
                    </a>
                    .
                  </Typography>
                </div>
              )}
            />
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Grid item>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#598445' }}
            >
              {soilDataRedux?.mapUnitName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item alignSelf="start">
        <Box>
          <Terrain />
        </Box>
      </Grid>
    </Grid>
  ) : null;
};

export default SoilComposition;
