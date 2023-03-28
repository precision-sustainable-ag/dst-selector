import {
  Badge, Button,
} from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';

const ToggleOptions = ({ isRoot, setSpeciesSelectorActivationFlag, setmyCoverCropActivationFlag }) => {
  const { state } = useContext(Context);
  const history = useHistory();

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
      <Button
        className={(isRoot && state.speciesSelectorActivationFlag) ? 'active' : ''}
        onClick={() => clearMyCoverCropList(true)}
        size="large"
        disabled={state.progress === 0}
      >
        COVER CROP EXPLORER
      </Button>

      {window.location.pathname === '/'
        && state.selectedCrops.length > 0
        && state.progress >= 5 && (
          <Badge
            badgeContent={state.selectedCrops.length}
            color="error"
          >
            <Button
              size="large"
              className={
                (state.myCoverCropActivationFlag && window.location.pathname === '/')
                  && 'active'
              }
              onClick={setmyCoverCropActivationFlag}
            >
              MY COVER CROP LIST
            </Button>
          </Badge>
      )}
      {/* My Cover Crop List As A Separate Component/Route  */}
      {window.location.pathname !== '/' && (
        state.progress.length < 5 ? (
          state.selectedCrops.length > 0 && (
          <Badge
            badgeContent={state.selectedCrops.length}
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
        ) : state.selectedCrops.length > 0 && (
        <Badge
          badgeContent={state.selectedCrops.length}
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
