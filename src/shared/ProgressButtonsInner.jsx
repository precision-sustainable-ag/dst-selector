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
import { updateProgress, setMyCoverCropReset } from '../reduxStore/sharedSlice';
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

  const changeProgress = (type) => {
    // setCrement(type);
    if (type === 'increment') {
      dispatchRedux(updateProgress('INCREMENT'));
    }

    if (type === 'decrement') {
      dispatchRedux(updateProgress('DECREMENT'));
    }
  };

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
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
      {toolTip && isDisabledNext ? (
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
      ) : (
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
            title={progressRedux === 4 ? 'MY CROPS' : 'NEXT'}
            className="selectedCropsButton"
          />
        </Badge>
      )}

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
