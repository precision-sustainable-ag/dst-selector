import React, { useState } from 'react';
import { Refresh } from '@mui/icons-material';
import {
  Stack,
  Badge,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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

  const [openDialog, setOpenDialog] = useState(false);

  const changeProgress = (type) => {
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

  const handleNextClick = () => {
    if (progressRedux === 0) {
      setOpenDialog(true);
    } else if (progressRedux === 4) {
      setMyCoverCropActivationFlag();
    } else {
      changeProgress('increment');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleGetRecommendation = () => {
    setOpenDialog(false);
    changeProgress('increment');
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

  const handleBrowseCoverCrops = () => {
    setOpenDialog(false);
    setSpeciesSelectorActivationFlag();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Select an Option</DialogTitle>
        <DialogContent>
          Please choose what you would like to do next:
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGetRecommendation} color="primary">
            Get a Recommendation
          </Button>
          <Button onClick={handleBrowseCoverCrops} color="primary">
            Browse Cover Crops
          </Button>
        </DialogActions>
      </Dialog>

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
                  onClick={handleNextClick}
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
              onClick={handleNextClick}
              disabled={isDisabledNext || (progressRedux === 4 && selectedCropIdsRedux.length === 0)}
              buttonType="PillButton"
              data-test={progressRedux === 4 ? 'my selected crops-btn' : 'next-btn'}
              title={progressRedux === 4 ? 'MY SELECTED CROPS' : 'NEXT'}
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
    </>
  );
};

export default ProgressButtonsInner;
