import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { LocalDrinkOutlined } from '@mui/icons-material';
import { ReferenceTooltip } from '../../../shared/constants';
import { arrayEquals } from '../../../shared/functions';
import { Context } from '../../../store/Store';
import '../../../styles/soilConditions.scss';
import { RenderDrainageClasses } from './RenderDrainageClasses';

export const SoilDrainage = ({ setTilingCheck }) => {
  const { state, dispatch } = useContext(Context);
  const { soilData, soilDataOriginal } = state;

  const resetDrainageClasses = () => {
    dispatch({
      type: 'UPDATE_DRAINAGE_CLASS',
      data: soilDataOriginal.Drainage_Class,
    });
    window.localStorage.setItem('drainage', JSON.stringify(soilDataOriginal.Drainage_Class));
    setTilingCheck(false);
  };

  return (
    <>
      <div className="col-12 pt-2 mt-2 row">
        <div className="col-12">
          <Typography variant="body1" className="soilConditionSubHeader">
            <LocalDrinkOutlined />
            &nbsp;DRAINAGE CLASS &nbsp;
            <ReferenceTooltip
              type="text"
              hasLink
              title={
                <div>
                  <Typography variant="body1">
                    {' '}
                    Indicates your soil drainage based on the{' '}
                    <a
                      href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USDA NRCS Web Soil Survey
                    </a>{' '}
                    drainage classes; you may modify your soil drainage by clicking below.{' '}
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
        {arrayEquals(soilDataOriginal.Drainage_Class, soilData.Drainage_Class) ? (
          ''
        ) : (
          <div className="col-12 pt-2">
            <div className="col-12 row">
              <div className="col text-left">
                <Button
                  size="small"
                  onClick={() => {
                    resetDrainageClasses();
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
          <RenderDrainageClasses drainage={soilData.Drainage_Class} />
        </div>
      </div>
    </>
  );
};
