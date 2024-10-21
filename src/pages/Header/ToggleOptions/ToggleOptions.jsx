import {
  Badge, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { activateMyCoverCropListTile, activateSpeicesSelectorTile, setMyCoverCropReset } from '../../../reduxStore/sharedSlice';
import PSAButton from '../../../components/PSAComponents/PSAButton';
import PSATooltip from '../../../components/PSAComponents/PSATooltip';

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
        sx={{
          backgroundColor: (pathname === '/') ? '#598444' : 'white',
          color: (pathname === '/') ? 'white' : '#8abc62',
          border: '10px',
          '&:hover': { backgroundColor: (pathname === '/') ? '#598444' : 'white', color: (pathname === '/') ? 'white' : '#8abc62' },
        }}
        data-cy="get-recommendation-btn"
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Get A Recommendation
        </Typography>

      </PSAButton>
      <PSATooltip title={(stateLabelRedux === null) ? 'You must select a state before using the Cover Crop Explorer' : ''} enterTouchDelay={0}>
        <span>
          <PSAButton
            onClick={setSpeciesSelectorActivationFlag}
            disabled={stateLabelRedux === null}
            selected={pathname === '/explorer'}
            buttonType="ToggleOptions"
            data-cy="browse-covercrops-btn"
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              BROWSE COVER CROPS
            </Typography>

          </PSAButton>
        </span>
      </PSATooltip>

      {selectedCropIdsRedux.length > 0
        && (
        <Badge
          badgeContent={selectedCropIdsRedux.length}
          color="error"
          data-cy="badge"
        >
          <PSAButton
            selected={pathname === '/my-cover-crop-list'}
            buttonType="ToggleOptions"
            onClick={setMyCoverCropActivationFlag}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              MY SELECTED CROPS
            </Typography>
          </PSAButton>
        </Badge>
        )}
    </>
  );
};

export default ToggleOptions;
