import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';
import { setOpenStateChangeAlert } from '../../../reduxStore/sharedSlice';

const StateChangeAlertDialog = () => {
  const dispatchRedux = useDispatch();

  const isOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.openStateChangeAlert);

  const handleClose = () => {
    dispatchRedux(setOpenStateChangeAlert(false));
  };

  return (
    <Dialog disableEscapeKeyDown open={isOpenRedux}>
      <DialogContent dividers>
        <Typography variant="body1">
          Your marker is placed outside the boundaries of the state you originally selected.
        </Typography>
      </DialogContent>
      <DialogActions className="resetBox">
        <PSAButton
          buttonType=""
          onClick={handleClose}
          color="primary"
          title="Okay"
          className="okayButton"
        />
      </DialogActions>
    </Dialog>
  );
};

export default StateChangeAlertDialog;
