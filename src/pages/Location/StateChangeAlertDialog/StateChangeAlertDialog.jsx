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
          This point is in a state other than the one you selected at the start. Move the point into
          your selected state or hit Back and select a different state.
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
