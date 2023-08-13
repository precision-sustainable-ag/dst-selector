import {
  Badge, Button, Tooltip,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import '../../../styles/header.scss';
import { activateMyCoverCropListTile, activateSpeicesSelectorTile } from '../../../reduxStore/sharedSlice';

const ToggleOptions = ({ isRoot }) => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const myCoverCropActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropActivationFlag);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const speciesSelectorActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag);
  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    if (window.location.pathname === '/explorer') {
      if (progressRedux > 4) {
        dispatchRedux(activateMyCoverCropListTile({ myCoverCropActivationFlag: true, speciesSelectorActivationFlag: false }));
        // dispatch({
        //   type: 'ACTIVATE_MY_COVER_CROP_LIST_TILE',
        //   data: {
        //     myCoverCropActivationFlag: true,
        //     speciesSelectorActivationFlag: false,
        //   },
        // });
      }
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    dispatchRedux(activateSpeicesSelectorTile({ speciesSelectorActivationFlag: true, myCoverCropActivationFlag: false }));
    // dispatch({
    //   type: 'ACTIVATE_SPECIES_SELECTOR_TILE',
    //   data: {
    //     speciesSelectorActivationFlag: true,
    //     myCoverCropActivationFlag: false,
    //   },
    // });
    if (window.location.pathname !== '/explorer') {
      history.push('/explorer');
    }
  };

  const clearMyCoverCropList = (selector = false) => {
    if (selector) {
      setSpeciesSelectorActivationFlag();
    }
  };

  return (
    <>
      <Button size="large" onClick={() => clearMyCoverCropList(false)} component={NavLink} exact to="/" activeClassName="active">
        SPECIES SELECTOR TOOL
      </Button>
      <Tooltip title={(stateLabelRedux === null || stateLabelRedux === '') ? 'You must select a state before using the Cover Crop Explorer' : ''}>
        <span>
          <Button
            className={(isRoot && speciesSelectorActivationFlagRedux) ? 'active' : ''}
            onClick={() => clearMyCoverCropList(true)}
            size="large"
            disabled={stateLabelRedux === null || stateLabelRedux === ''}
          >
            COVER CROP EXPLORER
          </Button>
        </span>
      </Tooltip>

      {window.location.pathname === '/'
        && selectedCropsRedux.length > 0
         && (
         <Badge
           badgeContent={selectedCropsRedux.length}
           color="error"
         >
           <Button
             size="large"
             className={
                (myCoverCropActivationFlagRedux && window.location.pathname === '/')
                  && 'active'
              }
             onClick={setMyCoverCropActivationFlag}
           >
             MY COVER CROP LIST
           </Button>
         </Badge>
         )}
      {/* My Cover Crop List As A Separate Component/Route  */}
      {window.location.pathname !== '/' && (
        selectedCropsRedux.length > 0 && (
          <Badge
            badgeContent={selectedCropsRedux.length}
            color="error"
          >
            <Button
              className={window.location.pathname === '/my-cover-crop-list' && 'active'}
              onClick={() => history.push('/my-cover-crop-list')}
            >
              My Cover Crop List
            </Button>
          </Badge>
        )
      )}
    </>
  );
};

export default ToggleOptions;
