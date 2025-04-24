import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { PSAButton } from 'shared-react-components/src';

const StateChangeAlertDialog = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown open={isOpen}>
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
