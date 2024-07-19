/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React from 'react';
import { Refresh } from '@mui/icons-material';
import { Stack, Tooltip, Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reset } from '../reduxStore/store';
import { updateProgress, setMyCoverCropReset } from '../reduxStore/sharedSlice';
import PSAButton from './PSAButton';

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
    <Stack direction="row" style={{ width: '100%' }}>
      <PSAButton
        style={{
          maxWidth: '90px',
          maxHeight: '35px',
          minWidth: '70px',
          fontSize: '13px',
          marginLeft: progressRedux === 4 ? '-75px' : '0px',
        }}
        onClick={() => changeProgress('decrement')}
        disabled={isDisabledBack}
        data="BACK"
      />
      {toolTip && isDisabledNext ? (
        <Tooltip
          enterTouchDelay={0}
          title={
            <p>{`Please Select a ${councilShorthandRedux === 'MCCC' ? 'County' : 'Zone'}.`}</p>
          }
        >
          <span>
            <PSAButton
              style={{
                maxWidth: '90px',
                maxHeight: '35px',
                minWidth: '70px',
                fontSize: '13px',
                marginLeft: progressRedux === 4 ? '-75px' : '0px',
              }}
              onClick={() => changeProgress('increment')}
              disabled={isDisabledNext || progressRedux === 4}
              data="Next"
            />

          </span>
        </Tooltip>
      ) : (
        <Badge badgeContent={progressRedux === 4 ? selectedCropIdsRedux.length : null} color="error">
          <PSAButton
            style={{
              maxWidth: '90px',
              maxHeight: '35px',
              minWidth: progressRedux === 4 ? 'max-content' : '70px',
              fontSize: '13px',
              marginLeft: '3%',
            }}
            onClick={() => (progressRedux === 4 ? setMyCoverCropActivationFlag() : changeProgress('increment'))}
            disabled={isDisabledNext || (progressRedux === 4 && selectedCropIdsRedux.length === 0)}
            data={progressRedux === 4 ? 'MY SELECTED CROPS' : 'NEXT'}
          />
        </Badge>
      )}

      <PSAButton
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
        data="Restart"
        icon={<Refresh />}
      />
    </Stack>
  );
};

export default ProgressButtonsInner;
