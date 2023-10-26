import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Terrain } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { ReferenceTooltip } from '../../../../shared/constants';

const SoilComposition = () => {
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  return (
    <Grid
      item
      container
      xs={12}
      direction="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="body1">
          <Terrain />
            &nbsp;Soil Composition&nbsp;
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
      <Grid item xs={12}>
        <Typography
          variant="body1"
          style={{ color: 'rgb(89, 132, 69)' }}
          align="left"
        >
          {soilDataRedux?.mapUnitName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SoilComposition;
