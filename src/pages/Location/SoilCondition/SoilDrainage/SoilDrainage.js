/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Typography, Switch, Grid,
} from '@mui/material';
import { LocalDrinkOutlined, InvertColors } from '@mui/icons-material';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderDrainageClasses from './RenderDrainageClasses';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';
import MyCoverCropReset from '../../../../components/MyCoverCropReset/MyCoverCropReset';

const SoilDrainage = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);

  // useState vars
  const [showTiling, setShowTiling] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [tilingCheck, setTilingCheck] = useState(false);

  useEffect(() => {
    if (myCoverCropListLocationRedux !== 'selector' && selectedCropIdsRedux.length > 0) {
      // document.title = 'Cover Crop Selector';
      setHandleConfirm(true);
    }
  }, [selectedCropIdsRedux, myCoverCropListLocationRedux]);

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
    <Grid
      container
      item
      direction="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="body1">
          <LocalDrinkOutlined />
            &nbsp;Drainage Class&nbsp;
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
      </Grid>
      <Grid item container xs={12} direction="column" justifyContent="center" alignItems="center">
        {!arrayEquals(soilDataOriginalRedux?.drainageClass, soilDataRedux?.drainageClass) && (
          <Grid item xs={12}>
            <Button
              size="small"
              onClick={() => {
                resetDrainageClasses();
              }}
            >
              <Typography
                sx={{
                  color: 'red',
                  textTransform: 'none',
                }}
                variant="button"
              >
                Values changed, reset?
              </Typography>
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <RenderDrainageClasses tilingCheck={tilingCheck} drainage={soilDataRedux?.drainageClass} />
        </Grid>
        <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />

        {showTiling && (
        <Grid item container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="body1">
              <InvertColors />
              &nbsp;Tile Drainage &nbsp;
              <ReferenceTooltip
                type="text"
                content="Indicate if the field of interest has tile installed. If you have selected very poorly to somewhat poorly drained soils, selecting “yes” will increase your drainage class by one factor."
              />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" display="inline">
              No
            </Typography>
            <Switch
              checked={tilingCheck}
              onChange={() => {
                setTilingCheck(!tilingCheck);
              }}
              name="checkedC"
            />
            <Typography variant="body1" display="inline">
              Yes
            </Typography>
          </Grid>
        </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SoilDrainage;
