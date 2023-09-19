/*
  This file contains the List for Saved user fields.
  The component receives userField prop from its parent, and render a list of user fields, with delete and rename button.
*/

import {
  FormControl, InputLabel, MenuItem, Select, List, ListItem, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const UserFieldList = ({
  userFields, field, setField, setFieldDialogState,
}) => {
  const handleChange = (e) => {
    setField(userFields.filter((userField) => userField.label === e.target.value)[0]);
  };
  const handleEdit = () => {
    setFieldDialogState((prev) => ({
      ...prev, open: true, actionType: 'updateName', fieldName: field.label, prevName: field.label,
    }));
  };
  const handleDelete = () => {
    setFieldDialogState((prev) => ({ ...prev, open: true, actionType: 'delete' }));
  };
  return (
    <List component="div" disablePadding>
      <ListItem component="div">
        <FormControl
          variant="filled"
          style={{ width: '100%' }}
          sx={{ minWidth: 200 }}
        >
          <InputLabel>Your Fields</InputLabel>
          <Select
            variant="filled"
            style={{
              width: '100%',
              textAlign: 'left',
            }}
            value={Object.keys(field) === 0 ? '' : field.label}
            onChange={handleChange}
          >
            {userFields.map((userField, index) => {
              if (userField.delete === true) return null;
              return (
                <MenuItem key={`userField-${index}`} value={userField.label === null ? 'null' : userField.label}>
                  {userField.label === null ? 'null' : userField.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItem>

    </List>

  );
};

export default UserFieldList;
