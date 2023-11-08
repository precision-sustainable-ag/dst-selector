/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React from 'react';
import { Refresh } from '@mui/icons-material';
import { Stack, Tooltip, Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LightButton } from './constants';
import { reset } from '../reduxStore/store';
import { updateProgress, setMyCoverCropReset } from '../reduxStore/sharedSlice';

const ProgressButtonsInner = ({
  isDisabledBack, isDisabledNext, isDisabledRefresh, toolTip,
}) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const history = useHistory();
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

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
    <Stack
      direction="row"
      style={{ width: '100%' }}
    >
      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '70px',
          fontSize: '13px',
          marginLeft: progressRedux === 5 ? '-25px' : '0px',
        }}
        onClick={() => changeProgress('decrement')}
        disabled={isDisabledBack}
      >
        BACK
      </LightButton>
      {toolTip && isDisabledNext
        ? (
          <Tooltip
            enterTouchDelay={0}
            title={(<p>{`Please Select a ${councilShorthandRedux === 'MCCC' ? 'County' : 'Zone'}.`}</p>)}
          >
            <span>
              <LightButton
                style={{
                  maxWidth: '90px',
                  maxHeight: '35px',
                  minWidth: '70px',
                  fontSize: '13px',
                  marginLeft: '3%',
                }}
                onClick={() => changeProgress('increment')}
                disabled={isDisabledNext || progressRedux === 5}
              >
                NEXT
              </LightButton>
            </span>
          </Tooltip>
        )
        : (
          <Badge
            badgeContent={selectedCropIdsRedux.length}
            color="error"
          >
            <LightButton
              style={{
                maxWidth: '90px',
                maxHeight: '35px',
                minWidth: progressRedux === 5 ? '130px' : '70px',
                fontSize: '13px',
                marginLeft: '3%',
              }}
              onClick={() => (progressRedux === 5 ? setMyCoverCropActivationFlag() : changeProgress('increment'))}
              disabled={isDisabledNext || (progressRedux === 5 && selectedCropIdsRedux.length === 0)}
            >
              {
              progressRedux === 5
                ? 'VIEW MY LIST'
                : 'NEXT'
            }
            </LightButton>
          </Badge>
        )}

      <LightButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '90px',
          fontSize: '13px',
          marginLeft: '3%',
        }}
        onClick={() => {
          if (selectedCropIdsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true, false));
          } else {
            dispatchRedux(reset());
          }
        }}
        disabled={isDisabledRefresh}
      >
        <Refresh />
        Restart
      </LightButton>
    </Stack>
  );
};

export default ProgressButtonsInner;
