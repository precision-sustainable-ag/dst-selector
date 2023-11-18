/*
  This file contains the List for Saved user fields.
  The component receives userField prop from its parent, and render a list of user fields, with delete and rename button.
*/

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const UserFieldList = ({
  userFields, field, setField, setFieldDialogState,
}) => {
  // Styles for the menu items
  const menuProps = {
    PaperProps: {
      sx: {
        '.MuiMenuItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: 'rgba(176, 236, 130, 0.3)',
            color: 'black',
          },
        },
      },
    },
  };

  const handleChange = (e) => {
    setField(userFields.filter((userField) => userField.label === e.target.value)[0]);
  };
  const handleEdit = () => {
    setFieldDialogState((prev) => ({
      ...prev,
      open: true,
      actionType: 'updateName',
      fieldName: field.label,
      prevName: field.label,
    }));
  };
  const handleDelete = () => {
    setFieldDialogState((prev) => ({ ...prev, open: true, actionType: 'delete' }));
  };
  return (
    <List component="div">
      <ListItem component="div" style={{ padding: 0 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="user-field-list-dropdown-label" sx={{ fontWeight: 'medium' }}>
            Your Fields
          </InputLabel>
          <Select
            label="Your Fields"
            labelId="user-field-list-dropdown-label"
            value={Object.keys(field).length === 0 ? '' : field.label}
            onChange={handleChange}
            sx={{
              fontWeight: 'bold',
              minWidth: 200,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#598445', // Set your custom color for the notched outline
                borderWidth: '2px', // Set your custom border width
                borderRadius: '4px', // Custom border radius
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#598445', // Custom color on hover
                borderWidth: '2.5px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#598445', // Custom color when the Select is focused
                borderWidth: '2.5px', // Custom border width when the Select is focused
              },
            }}
            MenuProps={menuProps}
          >
            {userFields.map((userField, index) => {
              if (userField.label === '') return null;
              return (
                <MenuItem
                  key={`userField-${index}`}
                  value={userField.label === null ? 'null' : userField.label}
                >
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
