/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Switch, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import { LocalDrinkOutlined, InvertColors } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderDrainageClasses from './RenderDrainageClasses';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';
import MyCoverCropReset from '../../../../components/MyCoverCropReset/MyCoverCropReset';

const SoilDrainage = () => {
  const dispatchRedux = useDispatch();

  //theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const myCoverCropListLocationRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.myCoverCropListLocation,
  );

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
    } else if (
      soilDataRedux?.drainageClass.includes('Moderately well drained') &&
      tilingCheck === true
    ) {
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
      item
      direction="column"
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.5rem',
        width: 'auto',
        border: '2px solid #598445',
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid
        item
        direction="row"
        display="flex"
        alignItems="center"
        padding="0 4.8px"
        style={{ marginBottom: '10px' }}
      >
        <Grid item>
          <Box
            style={{
              backgroundColor: 'rgba(176, 236, 130, 0.8)',
              padding: '1rem',
              borderRadius: '10px',
              marginRight: '10px',
            }}
          >
            <LocalDrinkOutlined />
          </Box>
        </Grid>

        <Grid item style={{ flexGrow: 1 }}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Drainage Class</span>
            &nbsp;{' '}
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
        </Grid>
        {!arrayEquals(soilDataOriginalRedux?.drainageClass, soilDataRedux?.drainageClass) && (
          <Grid item>
            <Button
              // style={{
              //   backgroundColor: 'rgba(255, 150, 28, 0.2)',
              //   borderRadius: '999px',
              //   padding: '14.8px',
              // }}
              sx={{
                backgroundColor: 'rgba(255, 150, 28, 0.2)',
                borderRadius: '999px',
                padding: '0.5rem',

                '&:hover': {
                  backgroundColor: 'rgba(255, 150, 28, 0.3)',
                },

                '@media (max-width:600px)': {
                  padding: '0.5rem',
                  borderRadius: '999px',
                  '& .MuiTypography-root': {
                    fontSize: '0.7rem',
                  },
                },
              }}
              size="small"
              onClick={() => {
                resetDrainageClasses();
              }}
            >
              {isMobile ? (
                <RestartAltIcon sx={{ color: '#ff961c' }} />
              ) : (
                <Typography
                  sx={{
                    color: '#ff961c',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                  }}
                  variant="button"
                >
                  Values changed, reset?
                </Typography>
              )}
            </Button>
          </Grid>
        )}
      </Grid>

      <Grid item direction="column">
        <Grid item>
          <RenderDrainageClasses
            tilingCheck={tilingCheck}
            drainage={soilDataRedux?.drainageClass}
          />
        </Grid>
        <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} />
        {showTiling && (
          <Grid
            item
            direction="row"
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '0.5rem',
              border: '2px solid #598445',
              width: 'auto',
              marginTop: '10px',
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Box
                style={{
                  backgroundColor: 'rgba(176, 236, 130, 0.8)',
                  padding: '10px',
                  borderRadius: '10px',
                  marginRight: '10px',
                }}
              >
                <InvertColors />
              </Box>
            </Grid>
            <Grid item direction="column">
              <Grid item>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Tile Drainage</span>
                  &nbsp;{' '}
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
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SoilDrainage;
