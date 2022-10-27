import { Badge, Button } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';

const ToggleOptions = ({ isRoot, setSpeciesSelectorActivationFlag, setmyCoverCropActivationFlag }) => {
  const { state } = useContext(Context);
  const history = useHistory();

  return (
    <>
      <Button size="large" component={NavLink} exact to="/" activeClassName="active">
        COVER CROP EXPLORER
      </Button>
      <Button
        className={(isRoot && state.speciesSelectorActivationFlag) && 'active'}
        onClick={setSpeciesSelectorActivationFlag}
        size="large"
      >
        SPECIES SELECTOR TOOL
      </Button>

      {window.location.pathname === '/species-selector'
        && state.selectedCrops.length > 0
        && state.progress >= 5 && (
          <Badge
            badgeContent={state.selectedCrops.length}
            color="error"
          >
            <Button
              size="large"
              className={
                state.myCoverCropActivationFlag && window.location.pathname === '/species-selector'
                  && 'active'
              }
              onClick={setmyCoverCropActivationFlag}
            >
              MY COVER CROP LIST
            </Button>
          </Badge>
      )}
      {/* My Cover Crop List As A Separate Component/Route  */}
      {window.location.pathname !== '/species-selector' && (
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
