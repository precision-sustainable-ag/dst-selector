/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React from 'react';
import { Refresh } from '@mui/icons-material';
import {
  Stack, Badge, Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PSAButton, PSATooltip } from 'shared-react-components/src';
import { reset } from '../reduxStore/store';
import { updateProgress, setMyCoverCropReset, activateSpeicesSelectorTile } from '../reduxStore/sharedSlice';
import useIsMobile from '../hooks/useIsMobile';

const ProgressButtonsInner = ({
  isDisabledBack, isDisabledNext, isDisabledRefresh, toolTip,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const history = useHistory();
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const isMobile = useIsMobile('sm');
  const myCoverCropListLocationRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.myCoverCropListLocation,
  );

  const changeProgress = (type) => {
    // setCrement(type);
    if (type === 'increment') {
      dispatchRedux(updateProgress('INCREMENT'));
    }

    if (type === 'decrement') {
      dispatchRedux(updateProgress('DECREMENT'));
    }
  };

  const openMyCoverCropReset = (to) => {
    if (selectedCropIdsRedux.length > 0 && myCoverCropListLocationRedux !== to) {
      dispatchRedux(setMyCoverCropReset(true));
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    openMyCoverCropReset('explorer');
    dispatchRedux(
      activateSpeicesSelectorTile({
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      }),
    );
    history.push('/explorer');
  };

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
  };

  const browseCoverCrops = () => {
    setSpeciesSelectorActivationFlag();
  };

  const renderNextButton = () => {
    if (progressRedux === 0) {
      return (
        <Box flexDirection="row" display="flex" justifyContent="space-between" width="100%">
          <PSAButton
            style={{
              width: '250px',
              minWidth: '70px',
              marginLeft: !isMobile ? '10px' : '0px',
              height: isMobile ? '35px' : 'auto',
            }}
            onClick={() => changeProgress('increment')}
            disabled={isDisabledNext}
            buttonType="PillButton"
            data-test="next-btn"
            transparent={false}
            title="Get A Recommendation"
          />
          <PSAButton
            style={{
              width: '250px',
              minWidth: '70px',
              marginLeft: !isMobile ? '10px' : '0px',
              height: isMobile ? '35px' : 'auto',
            }}
            onClick={browseCoverCrops}
            disabled={isDisabledNext}
            buttonType="PillButton"
            data-test="next-btn"
            transparent={false}
            title="Browse Cover Crops"
          />
        </Box>
      );
    }

    if (toolTip && isDisabledNext) {
      return (
        <PSATooltip
          enterTouchDelay={0}
          title={`Please Select a ${councilShorthandRedux === 'MCCC' ? 'County' : 'Zone'}.`}
          tooltipContent={(
            <Box>
              <PSAButton
                style={{
                  maxWidth: '90px',
                  minWidth: '70px',
                  marginLeft: !isMobile && (progressRedux === 4) ? '-75px' : '0px',
                  height: isMobile ? '35px' : 'auto',
                }}
                onClick={() => changeProgress('increment')}
                disabled={isDisabledNext || progressRedux === 4}
                buttonType="PillButton"
                data-test="next-btn"
                transparent={false}
                title="NEXT"
              />
            </Box>
          )}
        />
      );
    }

    return (
      <Badge
        badgeContent={progressRedux === 4 ? selectedCropIdsRedux.length : null}
        color="error"
      >
        <PSAButton
          style={{
            maxWidth: '90px',
            minWidth: progressRedux === 4 ? 'max-content' : '70px',
            marginLeft: '3%',
            height: isMobile ? '35px' : 'auto',
          }}
          onClick={() => (progressRedux === 4 ? setMyCoverCropActivationFlag() : changeProgress('increment'))}
          disabled={isDisabledNext || (progressRedux === 4 && selectedCropIdsRedux.length === 0)}
          buttonType="PillButton"
          data-test={progressRedux === 4 ? 'my selected crops-btn' : 'next-btn'}
          title={progressRedux === 4 ? 'MY SELECTED CROPS' : 'NEXT'}
          className="selectedCropsButton"
        />
      </Badge>
    );
  };

  return (
    <Stack direction="row" spacing={isMobile ? 2 : 0}>
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
          height: isMobile ? '35px' : 'auto',
          marginLeft: !isMobile && (progressRedux === 4) ? '-75px' : '0px',
        }}
        onClick={() => changeProgress('decrement')}
        disabled={isDisabledBack}
        buttonType="PillButton"
        data-test="back-btn"
        title="BACK"
      />

      {renderNextButton()}

      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '90px',
          marginLeft: '3%',
          height: isMobile ? '35px' : 'auto',
        }}
        onClick={() => {
          if (selectedCropIdsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true, false));
          } else {
            dispatchRedux(reset());
          }
        }}
        disabled={isDisabledRefresh}
        startIcon={<Refresh />}
        buttonType="PillButton"
        data-test="restart-btn"
        title="Restart"
      />
    </Stack>
  );
};

export default ProgressButtonsInner;
