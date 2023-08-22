import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import React from 'react';

const UserFieldDialog = ({ fieldDialogState, setFieldDialogState, handleClose }) => {
  const {
    open, fieldName, error, errorText, type,
  } = fieldDialogState;
  return (
    <Dialog sx={{ m: 0, p: 2 }} open={open}>
      {type === 'add' && (
      <>
        <DialogTitle>
          You need to give this field a nickname
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={error}
            helperText={errorText}
            variant="standard"
            label="Field Nickname"
            value={fieldName}
            onChange={(e) => setFieldDialogState({ ...fieldDialogState, fieldName: e.target.value })}
          />
        </DialogContent>
      </>
      )}
      {type === 'update' && (
        <DialogTitle>
          Are you going to update this field?
        </DialogTitle>
      )}
      {type === 'delete' && (
        <DialogTitle>
          Are you going to delete this field?
        </DialogTitle>
      )}
      <DialogActions>
        <Button onClick={() => handleClose(true)}>OK</Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserFieldDialog;
