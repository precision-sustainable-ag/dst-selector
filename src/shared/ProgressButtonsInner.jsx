/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import { Refresh } from '@mui/icons-material';
import { Badge, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PSAButton, PSATooltip } from 'shared-react-components/src';
import useIsMobile from '../hooks/useIsMobile';
import {
  activateSpeicesSelectorTile,
  setMyCoverCropReset,
  updateProgress,
} from '../reduxStore/sharedSlice';
import { reset } from '../reduxStore/store';

const ProgressButtonsInner = ({ isDisabledBack, isDisabledNext, isDisabledRefresh, toolTip }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const history = useHistory();
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const isMobile = useIsMobile('sm');
  const myCoverCropListLocationRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.myCoverCropListLocation,
  );
  const resetStatusRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset.status,
  );
  const [pendingAction, setPendingAction] = useState(null);

  const changeProgress = (type) => {
    // setCrement(type);
    if (type === 'increment') {
      dispatchRedux(updateProgress('INCREMENT'));
    }

    if (type === 'decrement') {
      dispatchRedux(updateProgress('DECREMENT'));
    }
  };

  const openExplorer = () => {
    dispatchRedux(
      activateSpeicesSelectorTile({
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      }),
    );
    history.push('/explorer');
  };

  useEffect(() => {
    if (!pendingAction || resetStatusRedux === null) return;

    if (resetStatusRedux === true) {
      if (pendingAction === 'explorer') {
        openExplorer();
      } else if (pendingAction === 'recommendation') {
        changeProgress('increment');
      }
    }
    setPendingAction(null);
    dispatchRedux(setMyCoverCropReset(false, false, null));
  }, [resetStatusRedux, pendingAction]);

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
  };

  const browseCoverCrops = () => {
    if (selectedCropIdsRedux.length > 0 && myCoverCropListLocationRedux !== 'explorer') {
      setPendingAction('explorer');
      dispatchRedux(setMyCoverCropReset(true));
      return;
    }
    openExplorer();
  };

  const handleRecommendation = () => {
    // if selected crop exists from explorer, show reset dialog
    if (selectedCropIdsRedux.length > 0 && myCoverCropListLocationRedux !== 'selector') {
      setPendingAction('recommendation');
      dispatchRedux(setMyCoverCropReset(true));
      return;
    }
    changeProgress('increment');
  };

  const renderNextButton = () => {
    if (toolTip && isDisabledNext) {
      return (
        <PSATooltip
          enterTouchDelay={0}
          title={toolTip}
          tooltipContent={
            <Box>
              <PSAButton
                style={{
                  maxWidth: '90px',
                  minWidth: '70px',
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
          }
        />
      );
    }

    return (
      <Badge
        badgeContent={progressRedux === 4 ? selectedCropIdsRedux.length : null}
        color="error"
        data-test="badge"
        sx={{ '& .MuiBadge-badge': { right: '6px' } }}
      >
        <PSAButton
          style={{
            maxWidth: '90px',
            minWidth: progressRedux === 4 ? 'max-content' : '70px',
            height: isMobile ? '35px' : 'auto',
          }}
          onClick={() =>
            progressRedux === 4 ? setMyCoverCropActivationFlag() : changeProgress('increment')
          }
          disabled={isDisabledNext || (progressRedux === 4 && selectedCropIdsRedux.length === 0)}
          buttonType="PillButton"
          data-test={progressRedux === 4 ? 'my selected crops-btn' : 'next-btn'}
          title={progressRedux === 4 ? 'MY SELECTED CROPS' : 'NEXT'}
          className="selectedCropsButton"
        />
      </Badge>
    );
  };

  if (progressRedux === 0) {
    return (
      <Stack direction="row" spacing={1}>
        <PSATooltip
          enterTouchDelay={0}
          title={
            stateLabelRedux === 'Hawaii'
              ? 'There is not enough expert data to give crop recommendations at this time.'
              : ''
          }
          tooltipContent={
            <Box>
              <PSAButton
                style={{
                  minWidth: '70px',
                  height: isMobile ? '35px' : 'auto',
                  padding: isMobile ? '5px 10px' : 'auto',
                }}
                onClick={handleRecommendation}
                disabled={isDisabledNext || stateLabelRedux === 'Hawaii'}
                buttonType="PillButton"
                data-test="get-a-recommendation-btn"
                transparent={false}
                title="Get A Recommendation"
              />
            </Box>
          }
        />
        <PSAButton
          style={{
            minWidth: '70px',
            height: isMobile ? '35px' : 'auto',
            padding: isMobile ? '5px 10px' : 'auto',
          }}
          onClick={browseCoverCrops}
          disabled={isDisabledNext}
          buttonType="PillButton"
          data-test="browse-cover-crops-btn"
          transparent={false}
          title="Browse Cover Crops"
        />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
          height: isMobile ? '35px' : 'auto',
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
          height: isMobile ? '35px' : 'auto',
        }}
        onClick={() => {
          if (selectedCropIdsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true));
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
