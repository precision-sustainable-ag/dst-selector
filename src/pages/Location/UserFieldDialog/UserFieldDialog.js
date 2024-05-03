/*
  This file contains the popup dialog for user field updates.
  Everytime user make any updates, this dialog would popup and show related informations.
*/

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import React from 'react';
import {
  postFields, buildPoint, buildGeometryCollection, deleteFields,
} from '../../../shared/constants';
import { getAuthToken } from '../../../shared/authToken';

export const initFieldDialogState = {
  open: false,
  fieldName: '',
  error: false,
  errorText: '',
  actionType: '',
  areaType: '',
  prevName: '',
};

const UserFieldDialog = ({
  fieldDialogState,
  setFieldDialogState,
  userFields,
  selectedToEditSite,
  currentGeometry,
  selectedUserField,
  setUserFields,
  setSelectedUserField,
  setMapFeatures,
  getFeatures,
  setIsAddingPoint,
}) => {
  const {
    open, fieldName, error, errorText, actionType, areaType, prevName,
  } = fieldDialogState;

  const accessToken = getAuthToken();

  const fieldNameValidation = (name) => {
    let errText = '';
    if (name === '') errText = 'You must input a valid name!';
    if (userFields.filter((field) => field.label === name).length > 0) errText = 'Field name already exists!';
    if (errText !== '') {
      setFieldDialogState({ ...fieldDialogState, error: true, errorText: errText });
      return false;
    }
    return true;
  };

  const handleClose = (option) => {
    if (option === 'YES') {
      if (actionType === 'add') {
        if (!fieldNameValidation(fieldName)) return;
        const { longitude, latitude } = selectedToEditSite;
        const point = buildPoint(longitude, latitude, fieldName);
        let geoCollection = null;
        if (areaType === 'Polygon') {
          const polygon = currentGeometry.features?.slice(-1)[0];
          geoCollection = buildGeometryCollection(point.geometry, polygon?.geometry, fieldName);
        }
        postFields(accessToken, areaType === 'Polygon' ? geoCollection : point).then((newField) => {
          setUserFields([...userFields, newField.data]);
          setSelectedUserField(newField.data);
        });
      }
      if (actionType === 'update') {
        // handle temp field with no label
        if (selectedUserField.label === '') {
          setFieldDialogState({ ...fieldDialogState, actionType: 'add' });
          return;
        }
        // Only supports polygon updates
        const { longitude, latitude } = selectedToEditSite;
        const point = buildPoint(longitude, latitude, selectedUserField.label);
        const polygon = currentGeometry.features.slice(-1)[0];
        const geoCollection = buildGeometryCollection(point.geometry, polygon.geometry, selectedUserField.label);
        postFields(accessToken, geoCollection).then((newField) => {
          setUserFields([...userFields.map((userField) => {
            if (userField.label === selectedUserField.label) return newField.data;
            return userField;
          })]);
        });
      }
      if (actionType === 'delete') {
        deleteFields(accessToken, selectedUserField.id)
          .then(() => {
            const updatedUserFields = userFields.filter((userField) => userField.label !== selectedUserField.label);
            setUserFields(updatedUserFields);
            setSelectedUserField(updatedUserFields.length > 0 ? updatedUserFields[0] : {});
          });
      }
      if (actionType === 'updateName') {
        if (!fieldNameValidation(fieldName)) return;
        const newField = {
          type: 'Feature',
          geometry: userFields.filter((userField) => userField.label === prevName)[0].geometry,
          label: fieldName,
        };
        const deletedField = userFields.filter((userField) => userField.label === prevName);
        deleteFields(accessToken, deletedField[0].id)
          .then(() => postFields(accessToken, newField))
          .then((resField) => {
            setUserFields([...userFields.filter((userField) => userField.label !== prevName), resField.data]);
            setSelectedUserField(resField.data);
          });
      }
    } else if (option === 'NO') {
      // create a temp field without a name
      const { longitude, latitude } = selectedToEditSite;
      const point = buildPoint(longitude, latitude, '');
      let geoCollection = null;
      if (areaType === 'Polygon') {
        const polygon = currentGeometry.features?.slice(-1)[0];
        geoCollection = buildGeometryCollection(point.geometry, polygon?.geometry, '');
      }
      setUserFields([...userFields, areaType === 'Polygon' ? geoCollection : point]);
      setSelectedUserField(areaType === 'Polygon' ? geoCollection : point);
    } else if (option === 'CANCEL') {
      // if the user select cancel
      setMapFeatures(getFeatures());
    }
    setFieldDialogState(initFieldDialogState);
    // reset isAddingPoint
    setIsAddingPoint(true);
  };

  return (
    <Dialog sx={{ m: 0, p: 2 }} open={open} onKeyUp={(e) => { if (e.key === 'Enter') handleClose(true); }}>
      {(actionType === 'add' || actionType === 'updateName') && (
      <>
        <DialogTitle>
          {actionType === 'add' && 'Would you like to save this field?'}
          {actionType === 'updateName' && 'Change the nickname for this field'}
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
      {actionType === 'update' && (
        <DialogTitle>
          Are you going to update this field?
        </DialogTitle>
      )}
      {actionType === 'delete' && (
        <DialogTitle>
          Are you going to delete this field?
        </DialogTitle>
      )}
      <DialogActions>
        <Button onClick={() => handleClose('YES')}>Yes</Button>
        {actionType === 'add' && <Button onClick={() => handleClose('NO')}>No</Button>}
        <Button onClick={() => handleClose('CANCEL')}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserFieldDialog;
