import {
  Badge, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { activateMyCoverCropListTile, activateSpeicesSelectorTile, setMyCoverCropReset } from '../../../reduxStore/sharedSlice';
import PSAButton from '../../../shared/PSAButton';

const ToggleOptions = ({ pathname }) => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    // FIXME: the following codes will not work?
    if (pathname === '/explorer') {
      if (progressRedux > 4) {
        dispatchRedux(activateMyCoverCropListTile({ myCoverCropActivationFlag: true, speciesSelectorActivationFlag: false }));
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
    dispatchRedux(activateSpeicesSelectorTile({ speciesSelectorActivationFlag: true, myCoverCropActivationFlag: false }));
    if (pathname !== '/explorer') {
      history.push('/explorer');
    }
  };

  return (
    <>
      <PSAButton
        component={NavLink}
        onClick={() => openMyCoverCropReset('selector')}
        exact
        to="/"
        selected={pathname === '/'}
        toggleOptions
        data={(
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Get A Recommendation
          </Typography>
      )}

      />
      <Tooltip title={(stateLabelRedux === null) ? 'You must select a state before using the Cover Crop Explorer' : ''} enterTouchDelay={0}>
        <span>
          <PSAButton
            onClick={setSpeciesSelectorActivationFlag}
            disabled={stateLabelRedux === null}
            selected={pathname === '/explorer'}
            toggleOptions
            data={(
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                BROWSE COVER CROPS
              </Typography>
          )}
          />
        </span>
      </Tooltip>

      {selectedCropIdsRedux.length > 0
        && (
        <Badge
          badgeContent={selectedCropIdsRedux.length}
          color="error"
        >
          <PSAButton
            selected={pathname === '/my-cover-crop-list'}
            toggleOptions
            onClick={setMyCoverCropActivationFlag}
            data={(
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                MY SELECTED CROPS
              </Typography>
          )}
          />
        </Badge>
        )}
    </>
  );
};

export default ToggleOptions;
