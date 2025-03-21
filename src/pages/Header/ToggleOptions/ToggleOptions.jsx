import React from 'react';
import {
  Badge, useMediaQuery, useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { PSAButton, PSATooltip } from 'shared-react-components/src';
import {
  activateMyCoverCropListTile,
  activateSpeicesSelectorTile,
  setMyCoverCropReset,
} from '../../../reduxStore/sharedSlice';

const ToggleOptions = ({ pathname }) => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const myCoverCropListLocationRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.myCoverCropListLocation,
  );

  // used to know if the user is in mobile mode
  const theme = useTheme();

  // breakpoints
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    // FIXME: the following codes will not work?
    if (pathname === '/explorer') {
      if (progressRedux > 4) {
        dispatchRedux(
          activateMyCoverCropListTile({
            myCoverCropActivationFlag: true,
            speciesSelectorActivationFlag: false,
          }),
        );
      }
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
    if (pathname !== '/explorer') {
      history.push('/explorer');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between', // Distribute elements evenly
        alignItems: 'center', // Center elements vertically
        width: '100%', // Ensure it spans the full container width
        gap: '1rem', // Optional: Adds spacing between items
      }}
    >
      <PSAButton
        size={isMdOrSmaller && selectedCropIdsRedux.length > 0 ? 'small' : 'medium'}
        component={NavLink}
        onClick={() => openMyCoverCropReset('selector')}
        buttonType="ToggleOptions"
        exact
        to="/"
        sx={{
          fontWeight: 'bold',
          fontSize: selectedCropIdsRedux.length > 0 && isMdOrSmaller ? 'clamp(0.75rem, 1.5vw, 1rem)' : 'auto',
        }}
        data-test="get-recommendation-btn"
        title={selectedCropIdsRedux.length > 0 && isMdOrSmaller ? (
          <div>
            <span style={{ display: 'block', textAlign: 'center' }}>Get A</span>
            <span style={{ display: 'block', textAlign: 'center' }}>Recommendation</span>
          </div>
        ) : (
          'Get A Recommendation'
        )}
      />
      <PSATooltip
        title={
          stateLabelRedux === null
            ? 'You must select a state before using the Cover Crop Explorer'
            : ''
        }
        enterTouchDelay={0}
        tooltipContent={(
          <span>
            <PSAButton
              size={isMdOrSmaller && selectedCropIdsRedux.length > 0 ? 'small' : 'medium'}
              onClick={setSpeciesSelectorActivationFlag}
              disabled={stateLabelRedux === null}
              selected={pathname === '/explorer'}
              buttonType="ToggleOptions"
              data-test="browse-covercrops-btn"
              sx={{
                fontWeight: 'bold',
                fontSize: selectedCropIdsRedux.length > 0 && isMdOrSmaller ? 'clamp(0.75rem, 1.5vw, 1rem)' : 'auto',
              }}
              title={selectedCropIdsRedux.length > 0 && isMdOrSmaller ? (
                <div>
                  <span style={{ display: 'block', textAlign: 'center' }}>Browse</span>
                  <span style={{ display: 'block', textAlign: 'center' }}>Cover Crops</span>
                </div>
              ) : (
                'Browse Cover Crops'
              )}
            />
          </span>
        )}
      />

      {selectedCropIdsRedux.length > 0 && (
      <Badge badgeContent={!isMdOrSmaller ? selectedCropIdsRedux.length : null} color="error" data-test="badge">
        <PSAButton
          size={isMdOrSmaller && selectedCropIdsRedux.length > 0 ? 'small' : 'medium'}
          selected={pathname === '/my-cover-crop-list'}
          buttonType="ToggleOptions"
          onClick={setMyCoverCropActivationFlag}
          sx={{
            fontWeight: 'bold',
            fontSize: selectedCropIdsRedux.length > 0 && isMdOrSmaller ? 'clamp(0.75rem, 1.5vw, 1rem)' : 'auto',
          }}
          title={selectedCropIdsRedux.length > 0 && isMdOrSmaller ? (
            <div>
              <span style={{ display: 'block', textAlign: 'center' }}>My</span>
              <span style={{ display: 'block', textAlign: 'center' }}>Selected Crops</span>
            </div>
          ) : (
            'My Selected Crops'
          )}
        />
      </Badge>
      )}
    </div>
  );
};

export default ToggleOptions;
