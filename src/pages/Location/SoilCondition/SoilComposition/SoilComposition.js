import React from 'react';
import { Typography } from '@mui/material';
import { Terrain } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { ReferenceTooltip } from '../../../../shared/constants';

const SoilComposition = () => {
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  return (
    <div className="col-12 pt-2 row">
      <div className="col-12">
        <Typography variant="body1" className="soilConditionSubHeader">
          <Terrain />
            &nbsp;SOILS COMPOSITION &nbsp;
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
      </div>
      <div className="col-12 pt-2 row">
        <div className="col-12">
          <Typography
            variant="body1"
            className="font-weight-bold"
            style={{ color: 'rgb(89, 132, 69)' }}
            align="left"
          >
            {soilDataRedux?.mapUnitName}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SoilComposition;
