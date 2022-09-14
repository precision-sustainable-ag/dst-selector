import { Button, Typography } from '@mui/material';
import { WavesOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { ReferenceTooltip } from '../../../shared/constants';
import { arrayEquals } from '../../../shared/functions';
import { Context } from '../../../store/Store';
import '../../../styles/soilConditions.scss';
import { RenderFloodingOptions } from './RenderFloodingOptions';

export const SoilFloodingFrequency = () => {
  const { state, dispatch } = useContext(Context);
  const { soilData, soilDataOriginal } = state;

  const resetFloodingOptions = () => {
    dispatch({
      type: 'UPDATE_FLOODING_FREQUENCY',
      data: soilDataOriginal.Flooding_Frequency,
    });
  };

  return (
    <>
      <div className="col-12 pt-2 mt-2 row">
        <div className="col-12">
          <Typography variant="body1" className="soilConditionSubHeader">
            <WavesOutlined />
            &nbsp;FLOODING FREQUENCY &nbsp;
            <ReferenceTooltip
              type="text"
              hasLink
              title={
                <div>
                  <Typography variant="body1">
                    The annual probability of a flood event based on the{' '}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USDA NRCS Web Soil Survey
                    </a>
                    , where “flood” refers to the temporary inundation of an area caused by
                    overflowing streams, by runoff from adjacent slopes, or by tides. You may modify
                    your flooding frequency by clicking below.{' '}
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
              }
            />
          </Typography>
        </div>

        {!arrayEquals(soilData.Flooding_Frequency, soilDataOriginal.Flooding_Frequency) && (
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
          <RenderFloodingOptions flooding={soilData.Flooding_Frequency} />
        </div>
      </div>
    </>
  );
};
