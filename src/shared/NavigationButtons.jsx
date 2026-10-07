/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import { Refresh } from '@mui/icons-material';
import { Badge, Stack } from '@mui/material';
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
  const history = useHistory();
  const isMobile = useIsMobile('sm');

  const handleBack = () => {
    if (pathname === '/explorer' && councilShorthandRedux === 'WCCC') {
      history.push('/explorer/location');
    } else {
      history.push('/');
    }
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
        onClick={() => {
          if (selectedCropIdsRedux.length > 0) {
            dispatchRedux(setMyCoverCropReset(true, false));
          } else {
            dispatchRedux(reset());
          }
          history.push('/');
        }}
        startIcon={<Refresh />}
        buttonType="PillButton"
        data-test="restart-btn"
        title="Restart"
      />
    </Stack>
  );
};

export default NavigationButtons;
