import {
  Badge, Button, Tooltip, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { activateMyCoverCropListTile, activateSpeicesSelectorTile, setMyCoverCropReset } from '../../../reduxStore/sharedSlice';

const ToggleOptions = ({ pathname }) => {
  const [prevRoute, setPrevRoute] = useState('selector');
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    // FIXME: the following codes will not work?
    if (pathname === '/explorer') {
      if (progressRedux > 4) {
        dispatchRedux(activateMyCoverCropListTile({ speciesSelectorActivationFlag: false }));
      }
    }
  };

  const openMyCoverCropReset = (to) => {
    if (selectedCropIdsRedux.length > 0 && prevRoute !== to) {
      dispatchRedux(setMyCoverCropReset(true));
    } else setPrevRoute(to);
  };

  const setSpeciesSelectorActivationFlag = () => {
    openMyCoverCropReset('explorer');
    dispatchRedux(activateSpeicesSelectorTile({ speciesSelectorActivationFlag: true }));
    if (pathname !== '/explorer') {
      history.push('/explorer');
    }
  };

  return (
    <>
      <Button
        size="large"
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
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Get A Recommendation
        </Typography>

      </Button>
      <Tooltip title={(stateLabelRedux === null) ? 'You must select a state before using the Cover Crop Explorer' : ''} enterTouchDelay={0}>
        <span>
          <Button
            onClick={setSpeciesSelectorActivationFlag}
            size="large"
            disabled={stateLabelRedux === null}
            sx={{
              backgroundColor: (pathname === '/explorer') ? '#598444' : 'white',
              color: (pathname === '/explorer') ? 'white' : '#8abc62',
              '&:hover': { backgroundColor: (pathname === '/explorer') ? '#598444' : 'white' },
            }}
          >

            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              BROWSE COVER CROPS
            </Typography>
          </Button>
        </span>
      </Tooltip>

      {selectedCropIdsRedux.length > 0
        && (
        <Badge
          badgeContent={selectedCropIdsRedux.length}
          color="error"
        >
          <Button
            sx={{
              backgroundColor: (pathname === '/my-cover-crop-list') ? '#598444' : 'white',
              color: (pathname === '/my-cover-crop-list') ? 'white' : '#8abc62',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
              '&:hover': { backgroundColor: (pathname === '/my-cover-crop-list') ? '#598444' : 'white' },
            }}
            size="large"
            onClick={setMyCoverCropActivationFlag}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              VIEW MY LIST
            </Typography>
          </Button>
        </Badge>
        )}
    </>
  );
};

export default ToggleOptions;
