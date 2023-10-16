import { Button, Typography } from '@mui/material';
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
    <div className="col-12 pt-2 mt-2 row">
      <div className="col-12">
        <Typography variant="body1" className="soilConditionSubHeader">
          <WavesOutlined />
            &nbsp;FLOODING FREQUENCY &nbsp;
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
      </div>

      {!arrayEquals(soilDataRedux?.floodingFrequency, soilDataOriginalRedux?.floodingFrequency) && (
      <div className="col-12 pt-2">
        <div className="col-12 row">
          <div className="col text-left">
            <Button
              size="small"
              onClick={() => {
                resetFloodingOptions();
              }}
            >
              <Typography
                className="text-danger text-uppercase font-weight-bold"
                variant="button"
              >
                Values changed, reset?
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      )}
      <div className="col-12">
        <RenderFloodingOptions flooding={soilDataRedux?.floodingFrequency} />
      </div>
    </div>
  );
};

export default SoilFloodingFrequency;
