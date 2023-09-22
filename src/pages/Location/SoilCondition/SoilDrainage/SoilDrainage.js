
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Switch } from '@mui/material';
import { LocalDrinkOutlined, InvertColors } from '@mui/icons-material';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import '../../../../styles/soilConditions.scss';
import RenderDrainageClasses from './RenderDrainageClasses';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const SoilDrainage = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);

  // useState vars
  const [showTiling, setShowTiling] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [tilingCheck, setTilingCheck] = useState(false);

  useEffect(() => {
    if (myCoverCropListLocationRedux !== 'selector' && selectedCropsRedux.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, myCoverCropListLocationRedux]);


  useEffect(() => {
    const checkArray = ['Very poorly drained', 'Poorly drained', 'Somewhat poorly drained'];
    if (checkArray.some((e) => soilDataRedux?.drainageClass.includes(e))) {
      setShowTiling(true);
    } else if (soilDataRedux?.drainageClass.includes('Moderately well drained') && tilingCheck === true) {
      setShowTiling(true);
    } else {
      setShowTiling(false);
    }
    window.localStorage.setItem('drainage', JSON.stringify(soilDataRedux?.drainageClass));
  }, [soilDataRedux?.drainageClass]);

  const resetDrainageClasses = () => {
    dispatchRedux(updateDrainageClassRedux(soilDataOriginalRedux?.drainageClass));
    window.localStorage.setItem('drainage', JSON.stringify(soilDataOriginalRedux?.drainageClass));
    setTilingCheck(false);
  };

  return (
    <div className="col-12 pt-2 mt-2 row">
      <div className="col-12">
        <Typography variant="body1" className="soilConditionSubHeader">
          <LocalDrinkOutlined />
            &nbsp;DRAINAGE CLASS &nbsp;
          <ReferenceTooltip
            type="text"
            hasLink
            title={(
              <div>
                <Typography variant="body1">
                  {' '}
                  Indicates your soil drainage based on the
                  {' '}
                  <a
                    href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USDA NRCS Web Soil Survey
                  </a>
                  {' '}
                  drainage classes; you may modify your soil drainage by clicking below.
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
      {!arrayEquals(soilDataOriginalRedux?.drainageClass, soilDataRedux?.drainageClass) && (
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
        <RenderDrainageClasses tilingCheck={tilingCheck} drainage={soilDataRedux?.drainageClass} />
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
      {showTiling && (
        <div className="col-12 pt-2 mt-2 row">
          <div className="col-12">
            <Typography variant="body1" className="soilConditionSubHeader">
              <InvertColors />
              &nbsp;TILING &nbsp;
              <ReferenceTooltip
                type="text"
                content="Indicate if the field of interest has tile installed. If you have selected very poorly to somewhat poorly drained soils, selecting “yes” will increase your drainage class by one factor."
              />
            </Typography>
          </div>
          <div className="col-12 pt-2">
            <div className="pl-1 text-left">
              <Typography variant="body1" display="inline">
                NO
              </Typography>
              <Switch
                checked={tilingCheck}
                onChange={() => {
                  setTilingCheck(!tilingCheck);
                }}
                name="checkedC"
              />
              <Typography variant="body1" display="inline">
                YES
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilDrainage;
