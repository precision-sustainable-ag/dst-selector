import {
  Badge, Button, Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';

const ToggleOptions = ({ isRoot }) => {
  const { state, dispatch } = useContext(Context);
  const selectedCropsRedux = useSelector((state) => state.cropData.selectedCrops);
  const history = useHistory();

  const setMyCoverCropActivationFlag = () => {
    history.push('/my-cover-crop-list');
    if (window.location.pathname === '/explorer') {
      if (state.progress > 4) {
        dispatch({
          type: 'ACTIVATE_MY_COVER_CROP_LIST_TILE',
          data: {
            myCoverCropActivationFlag: true,
            speciesSelectorActivationFlag: false,
          },
        });
      }
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    dispatch({
      type: 'ACTIVATE_SPECIES_SELECTOR_TILE',
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      },
    });
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
      <Tooltip title={state.state === '' ? 'You must select a state before using the Cover Crop Explorer' : ''}>
        <span>
          <Button
            className={(isRoot && state.speciesSelectorActivationFlag) ? 'active' : ''}
            onClick={() => clearMyCoverCropList(true)}
            size="large"
            disabled={state.state === ''}
          >
            COVER CROP EXPLORER
          </Button>
        </span>
      </Tooltip>

      {window.location.pathname === '/'
        && selectedCropsRedux.length > 0
        && state.progress >= 5 && (
          <Badge
            badgeContent={selectedCropsRedux.length}
            color="error"
          >
            <Button
              size="large"
              className={
                (state.myCoverCropActivationFlag && window.location.pathname === '/')
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
        state.progress.length < 5 ? (
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
        ) : selectedCropsRedux.length > 0 && (
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
