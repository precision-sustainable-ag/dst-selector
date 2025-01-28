import React from 'react';
import { Badge } from '@mui/material';
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
    <>
      <PSAButton
        component={NavLink}
        onClick={() => openMyCoverCropReset('selector')}
        buttonType="ToggleOptions"
        exact
        to="/"
        sx={{
          fontWeight: 'bold',
        }}
        data-test="get-recommendation-btn"
        title="Get A Recommendation"
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
              onClick={setSpeciesSelectorActivationFlag}
              disabled={stateLabelRedux === null}
              selected={pathname === '/explorer'}
              buttonType="ToggleOptions"
              data-test="browse-covercrops-btn"
              sx={{ fontWeight: 'bold' }}
              title="BROWSE COVER CROPS"
            />
          </span>
        )}
      />

      {selectedCropIdsRedux.length > 0 && (
        <Badge badgeContent={selectedCropIdsRedux.length} color="error" data-test="badge">
          <PSAButton
            selected={pathname === '/my-cover-crop-list'}
            buttonType="ToggleOptions"
            onClick={setMyCoverCropActivationFlag}
            sx={{ fontWeight: 'bold' }}
            title="MY SELECTED CROPS"
          />
        </Badge>
      )}
    </>
  );
};

export default ToggleOptions;
