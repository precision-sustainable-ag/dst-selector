import {
  Badge, Button, Dialog, DialogActions, DialogContent, Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { BinaryButton } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';

const ToggleOptions = ({ isRoot, setSpeciesSelectorActivationFlag, setmyCoverCropActivationFlag }) => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const clearMyCoverCropList = (selector = false) => {
    if (state?.selectedCrops.length > 0 && localStorage.getItem('lastLocation') === 'CoverCropExplorer') {
      setHandleConfirm(true);
    } else if (selector) {
      setSpeciesSelectorActivationFlag();
    }
  };

  const handleConfirmationChoice = (clearMyList = false) => {
    if (clearMyList !== null) {
      if (clearMyList) {
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: [],
          },
        });
        setSpeciesSelectorActivationFlag();
      } else {
        setHandleConfirm(false);
      }
    }
    setHandleConfirm(false);
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
        disabled={!state.state}
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
      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            In order to continue you will need to reset the My Cover Crop List.  Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={handleConfirmationChoice}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToggleOptions;
