import React, { useState } from 'react';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  historyState, setHistoryDialogState, setHistoryState, setSelectedHistory,
  updateField,
} from '../../reduxStore/userSlice';
import { reset } from '../../reduxStore/store';

export const historyDialogDefaultState = {
  open: false,
  type: 'add',
};

const HistoryDialog = () => {
  const [fieldName, setFieldName] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const dispatch = useDispatch();

  const userHistoryListRedux = useSelector((stateRedux) => stateRedux.userData.userHistoryList);
  const historyDialogStateRedux = useSelector((stateRedux) => stateRedux.userData.historyDialogState);
  const { open, type } = historyDialogStateRedux;

  // eslint-disable-next-line no-shadow
  const setOpen = (open, type = 'add') => {
    dispatch(setHistoryDialogState({ ...historyDialogStateRedux, open, type }));
  };

  const fieldNameValidation = (name) => {
    if (name === '') return false;
    const result = userHistoryListRedux.find((history) => history.label === name);
    if (result === undefined) return true;
    return false;
  };

  const resetDialogState = () => {
    setOpen(false);
    setFieldName('');
    setError(false);
    setHelperText('');
  };

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
  };

  const handleAdd = () => {
    const result = fieldNameValidation(fieldName);
    if (result) {
      // reset current redux
      dispatch(reset());
      dispatch(updateField(null));
      // set addde history
      dispatch(setSelectedHistory({ label: fieldName, id: null }));
      dispatch(setHistoryState(historyState.new));
    } else {
      setError(true);
      setHelperText('Name invalid or already exists!');
      return;
    }
    resetDialogState();
  };

  const handleUpdate = () => {
    dispatch(reset());
    // need to reset some fields in userData
    dispatch(updateField(null));
    dispatch(setSelectedHistory(null));
    dispatch(setHistoryState('none'));
    // open dialog and set dialog state as add
    setOpen(true, 'add');
    // resetDialogState();
  };

  const handleCancel = () => {
    resetDialogState();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        { type === 'add' && 'Are you creating a new record?'}
        { type === 'update' && 'Are you updating your record?'}
      </DialogTitle>
      <DialogContent>
        {type === 'add'
          && (
            <>
              <DialogContentText>
                Please input the name for your record below.
              </DialogContentText>
              <TextField
                variant="standard"
                autoFocus
                fullWidth
                error={error}
                helperText={helperText}
                label="Input your field name"
                value={fieldName}
                onChange={handleFieldNameChange}
              />
            </>
          )}
        {type === 'update'
          && (
          <DialogContentText>
            <span style={{ color: 'red' }}>Warning: </span>
            Making changes may affect the results of subsequent steps
            that you have saved. Please create a new record instead.
          </DialogContentText>
          )}

      </DialogContent>
      <DialogActions>
        {type === 'add'
          && <Button onClick={handleAdd}>Create</Button>}
        {type === 'update'
          && <Button onClick={handleUpdate}>Create a new record</Button>}
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryDialog;
