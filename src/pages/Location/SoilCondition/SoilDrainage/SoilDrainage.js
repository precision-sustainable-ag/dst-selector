import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { LocalDrinkOutlined } from '@mui/icons-material';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import { Context } from '../../../../store/Store';
import '../../../../styles/soilConditions.scss';
import RenderDrainageClasses from './RenderDrainageClasses';
import MyCoverCropReset from '../../../../components/MyCoverCropReset/MyCoverCropReset';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';

const SoilDrainage = ({ setTilingCheck }) => {
  const { state } = useContext(Context);
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);

  // useState vars
  const [handleConfirm, setHandleConfirm] = useState(false);

  useEffect(() => {
    if (state.myCoverCropListLocation !== 'selector' && selectedCropsRedux.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, state.myCoverCropListLocation]);

  const resetDrainageClasses = () => {
    dispatchRedux(updateDrainageClassRedux(soilDataOriginalRedux?.Drainage_Class));
    window.localStorage.setItem('drainage', JSON.stringify(soilDataOriginalRedux?.Drainage_Class));
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
      {!arrayEquals(soilDataOriginalRedux?.Drainage_Class, soilDataRedux?.Drainage_Class) && (
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
        <RenderDrainageClasses drainage={soilDataRedux?.Drainage_Class} />
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
    </div>
  );
};

export default SoilDrainage;
