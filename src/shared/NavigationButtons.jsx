/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import { Refresh } from '@mui/icons-material';
import { Badge, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PSAButton } from 'shared-react-components/src';
import useIsMobile from '../hooks/useIsMobile';
import { setMyCoverCropReset } from '../reduxStore/sharedSlice';
import { reset } from '../reduxStore/store';

const NavigationButtons = ({ pathname }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const resetStatusRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset.status,
  );
  const history = useHistory();
  const isMobile = useIsMobile('sm');
  const [pendingRestart, setPendingRestart] = useState(false);

  useEffect(() => {
    if (!pendingRestart || resetStatusRedux === null) return;

    if (resetStatusRedux === true) {
      history.push('/');
    }
    setPendingRestart(false);
    dispatchRedux(setMyCoverCropReset(false, false, null));
  }, [resetStatusRedux, pendingRestart]);

  const handleBack = () => {
    if (pathname === '/explorer' && councilShorthandRedux === 'WCCC') {
      history.push('/explorer/location');
    } else {
      history.push('/');
    }
  };

  const handleRestart = () => {
    if (selectedCropIdsRedux.length > 0) {
      setPendingRestart(true);
      dispatchRedux(setMyCoverCropReset(true));
      return;
    }
    dispatchRedux(reset());
    history.push('/');
  };

  return (
    <Stack direction="row" spacing={1}>
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
          height: isMobile ? '35px' : 'auto',
        }}
        onClick={handleBack}
        buttonType="PillButton"
        data-test="back-btn"
        title="Back"
      />
      {pathname === '/explorer/location' && (
        <PSAButton
          style={{
            maxWidth: '90px',
            minWidth: '70px',
            height: isMobile ? '35px' : 'auto',
          }}
          onClick={() => {
            history.push('/explorer');
          }}
          disabled={!queryStringRedux}
          buttonType="PillButton"
          data-test="next-btn"
          title="NEXT"
        />
      )}
      {pathname === '/explorer' && (
        <Badge badgeContent={selectedCropIdsRedux.length} color="error">
          <PSAButton
            style={{
              maxWidth: '90px',
              minWidth: 'max-content',
              height: isMobile ? '35px' : 'auto',
            }}
            onClick={() => history.push('/my-cover-crop-list')}
            disabled={selectedCropIdsRedux.length === 0}
            buttonType="PillButton"
            data-test="my selected crops-btn"
            title="MY CROPS"
            className="selectedCropsButton"
          />
        </Badge>
      )}
      <PSAButton
        style={{
          maxWidth: '90px',
          minWidth: '70px',
          height: isMobile ? '35px' : 'auto',
        }}
        onClick={handleRestart}
        startIcon={<Refresh />}
        buttonType="PillButton"
        data-test="restart-btn"
        title="Restart"
      />
    </Stack>
  );
};

export default NavigationButtons;
