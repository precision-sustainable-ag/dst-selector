/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Switch, Grid, Box, useMediaQuery, useTheme,
} from '@mui/material';
import { LocalDrinkOutlined, InvertColors } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { PSAButton } from 'shared-react-components/src';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderDrainageClasses from './RenderDrainageClasses';
import { setTileDrainage, updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';
import MyCoverCropReset from '../../../../components/MyCoverCropReset/MyCoverCropReset';
import { historyState, setHistoryState } from '../../../../reduxStore/userSlice';

const SoilDrainage = ({ drainageOptions }) => {
  const dispatchRedux = useDispatch();
  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const myCoverCropListLocationRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.myCoverCropListLocation,
  );
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const tileDrainageRedux = useSelector((stateRedux) => stateRedux.soilData.soilData.tileDrainage);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);

  // useState vars
  const [showTiling, setShowTiling] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [newDrainage, setNewDrainage] = useState('');
  const [drainageInitialLoad, setDrainageInitialLoad] = useState(false);

  useEffect(() => {
    if (myCoverCropListLocationRedux !== 'selector' && selectedCropIdsRedux.length > 0) {
      setHandleConfirm(true);
    }
  }, [selectedCropIdsRedux, myCoverCropListLocationRedux]);

  useEffect(() => {
    // set new drainage value
    if (stateIdRedux === 7) {
      setNewDrainage();
    } else {
      setNewDrainage(
        tileDrainageRedux
          ? soilDataRedux.prevDrainageClass[0]
          : soilDataRedux.drainageClass[0],
      );
    }
    setDrainageInitialLoad(true);
  }, [soilDataOriginalRedux]);

  useEffect(() => {
    if (soilDataRedux?.drainageClass[0] !== undefined
      && drainageOptions.map((option) => option.value).indexOf(soilDataRedux?.drainageClass[0]) < 3) {
      setShowTiling(true);
    } else if (
      soilDataRedux?.drainageClass.includes(drainageOptions[3].value)
      && tileDrainageRedux === true
    ) {
      setShowTiling(true);
    } else {
      setShowTiling(false);
    }
    window.localStorage.setItem('drainage', JSON.stringify(soilDataRedux?.drainageClass));
  }, [soilDataRedux?.drainageClass]);

  const resetDrainageClasses = () => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    dispatchRedux(updateDrainageClassRedux(soilDataOriginalRedux?.drainageClass));
    setNewDrainage(soilDataOriginalRedux.drainageClass[0]);
    window.localStorage.setItem('drainage', JSON.stringify(soilDataOriginalRedux?.drainageClass));
    dispatchRedux(setTileDrainage(false));
  };

  const handleTileDrainage = () => {
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    dispatchRedux(setTileDrainage(!tileDrainageRedux));
  };

  const drainageClass = () => {
    const drainageString = ` ${soilDataRedux.drainageClass[0]}`;
    return (
      <Grid align="center" item xs={12} mb={2}>
        <Typography display="inline" variant="subtitle2" gutterBottom>
          Your improved drainage class is
          <span style={{ fontWeight: 'bold' }}>
            {drainageString}
          </span>
        </Typography>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        borderRadius: '15px',
        border: '2px solid #598445',
        height: '100%',
      }}
      data-test="soil-drainage-card"
    >
      <Grid container>
        <Grid
          item
          container
          sx={{
            p: '1rem',
            mb: '1rem',
            borderTopLeftRadius: '15px', // Top left corner
            borderTopRightRadius: '15px', // Top right corner
            borderBottomLeftRadius: '0', // Bottom left corner
            borderBottomRightRadius: '0', // Bottom right corner
          }}
          xs={12}
        >
          <Grid item sx={{ mr: '1rem' }}>
            <LocalDrinkOutlined />
          </Grid>
          <Grid item flexGrow={1}>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Drainage Class</span>
              &nbsp;
              {' '}
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
                      drainage classes.
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
                content="Indicates your soil drainage based on the USDA NRCS Web Soil Survey drainage classes.
                Definitions of values found here: https://www.nrcs.usda.gov/wps/portal/nrcs/detail/soils/ref/?cid=nrcs142p2_054253"
              />
            </Typography>
          </Grid>
          {!arrayEquals(soilDataOriginalRedux?.drainageClass, soilDataRedux?.drainageClass) && (
            <Grid item>
              <PSAButton
                buttonType="ValuesChanged"
                onClick={() => {
                  resetDrainageClasses();
                }}
                data-test="drainage-reset-button"
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
        <Grid
          item
          container
          spacing={1}
          sx={{ mb: '1rem' }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} alignSelf="center" justifySelf="center">
            {drainageInitialLoad
              && (
                <RenderDrainageClasses
                  setNewDrainage={setNewDrainage}
                  setShowTiling={setShowTiling}
                  drainage={newDrainage}
                  drainageOptions={drainageOptions}
                />
              )}
          </Grid>
          <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
          {showTiling && (
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Box
                  sx={{
                    bgcolor: 'rgba(176, 236, 130, 0.8)',
                    p: '10px',
                    borderRadius: '10px',
                    marginRight: '10px',
                  }}
                >
                  <InvertColors />
                </Box>
              </Grid>
              <Grid item container direction="column" xs={6} lg={3}>
                <Grid item>
                  <Typography variant="body1">
                    <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Tile Drainage</span>
                    &nbsp;
                    {' '}
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
                    checked={tileDrainageRedux}
                    onChange={handleTileDrainage}
                    name="checkedC"
                    data-test="tiling-check-switch"
                  />
                  <Typography variant="body1" display="inline">
                    Yes
                  </Typography>
                </Grid>
              </Grid>
              {tileDrainageRedux && drainageClass()}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SoilDrainage;
