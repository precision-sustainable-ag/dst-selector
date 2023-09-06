import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BinaryButton } from '../../shared/constants';
import { reset } from '../../reduxStore/store';

const MyCoverCropReset = ({
  handleConfirm, setHandleConfirm, goBack = true, returnToHome = false,
}) => {
  const dispatchRedux = useDispatch();
  const history = useHistory();

  const handleConfirmChoice = (clearMyList = false) => {
    if (clearMyList === true) {
      dispatchRedux(reset());
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
    <Dialog disableEscapeKeyDown open={handleConfirm}>
      <DialogContent dividers>
        <Typography variant="body1">
          In order to continue you will need to reset the My Cover Crop List. Would you like to continue?
        </Typography>
      </DialogContent>
      <DialogActions>
        <BinaryButton
          action={handleConfirmChoice}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MyCoverCropReset;
