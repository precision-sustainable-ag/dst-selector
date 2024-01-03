/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Typography, Switch, Grid, Box, useMediaQuery, useTheme,
} from '@mui/material';
import { LocalDrinkOutlined, InvertColors } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ReferenceTooltip } from '../../../../shared/constants';
import arrayEquals from '../../../../shared/functions';
import RenderDrainageClasses from './RenderDrainageClasses';
import { updateDrainageClass as updateDrainageClassRedux } from '../../../../reduxStore/soilSlice';
import MyCoverCropReset from '../../../../components/MyCoverCropReset/MyCoverCropReset';

const SoilDrainage = () => {
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
    } else if (
      soilDataRedux?.drainageClass.includes('Moderately well drained')
      && tilingCheck === true
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

  const drainageClass = () => {
    const drainageString = ` ${soilDataRedux.drainageClass[0]}`;
    return (
      <Grid align="center" item xs={12} mb={2}>
        <Typography display="inline" variant="subtitle2" gutterBottom>
          Your improved drainage class is
          <Typography display="inline" variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {drainageString}
          </Typography>
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
              />
            </Typography>
          </Grid>
          {!arrayEquals(soilDataOriginalRedux?.drainageClass, soilDataRedux?.drainageClass) && (
            <Grid item>
              <Button
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
        <Grid
          item
          container
          spacing={1}
          sx={{ mb: '1rem' }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} alignSelf="center" justifySelf="center">
            <RenderDrainageClasses
              tilingCheck={tilingCheck}
              setTilingCheck={setTilingCheck}
              drainage={soilDataRedux?.drainageClass}
            />
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
              {tilingCheck && drainageClass()}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SoilDrainage;
