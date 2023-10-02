import {
  Badge, Button, Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import '../../../styles/header.scss';
import { activateMyCoverCropListTile, activateSpeicesSelectorTile, setMyCoverCropReset } from '../../../reduxStore/sharedSlice';

const ToggleOptions = ({ pathname }) => {
  const [prevRoute, setPrevRoute] = useState('selector');
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const speciesSelectorActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag);
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
    if (selectedCropsRedux.length > 0 && prevRoute !== to) {
      dispatchRedux(setMyCoverCropReset(true));
    } else setPrevRoute(to);
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
      <Button size="large" component={NavLink} onClick={() => openMyCoverCropReset('selector')} exact to="/" activeClassName="active">
        SPECIES SELECTOR TOOL
      </Button>
      <Tooltip title={(stateLabelRedux === null) ? 'You must select a state before using the Cover Crop Explorer' : ''}>
        <span>
          <Button
            className={(pathname === '/explorer' && speciesSelectorActivationFlagRedux) ? 'active' : ''}
            onClick={setSpeciesSelectorActivationFlag}
            size="large"
            disabled={stateLabelRedux === null}
          >
            COVER CROP EXPLORER
          </Button>
        </span>
      </Tooltip>

      {selectedCropsRedux.length > 0
        && (
        <Badge
          badgeContent={selectedCropsRedux.length}
          color="error"
        >
          <Button
            className={pathname === '/my-cover-crop-list' ? 'active' : ''}
            size="large"
            onClick={setMyCoverCropActivationFlag}
          >
            MY COVER CROP LIST
          </Button>
        </Badge>
        )}
    </>
  );
};

export default ToggleOptions;
