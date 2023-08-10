import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React, {
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { BinaryButton } from '../../shared/constants';
import { Context } from '../../store/Store';

const MyCoverCropReset = ({
  handleConfirm, setHandleConfirm, goBack = true, returnToHome = false,
}) => {
  const { dispatch } = useContext(Context);
  const history = useHistory();
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const handleConfirmChoice = (clearMyList = false) => {
    if (clearMyList === true) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
      if (returnToHome) history.push('/');
      // setSpeciesSelectorActivationFlag();
    } else if (goBack === true) {
      history.goBack();
      if (window.location.pathname !== '/') {
        history.push('/');
      }
    }
    setHandleConfirm(false);
  };

  return (
    <div className="container-fluid mt-5">
      <Dialog disableEscapeKeyDown open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            In order to continue you will need to reset the My Cover Crop List.  Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={handleConfirmChoice}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCoverCropReset;
