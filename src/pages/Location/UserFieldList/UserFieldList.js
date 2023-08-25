import {
  FormControl, InputLabel, MenuItem, Select, List, ListItem, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserFieldList = ({
  userFields, field, setField, setFieldDialogState,
}) => {
  const { isAuthenticated } = useAuth0();
  const handleChange = (e) => {
    setField(e.target.value);
  };
  const handleEdit = () => {
    if (isAuthenticated) {
      setFieldDialogState((prev) => ({
        ...prev, open: true, actionType: 'updateName', fieldName: field, prevName: field,
      }));
    }
  };
  const handleDelete = () => {
    if (isAuthenticated) {
      setFieldDialogState((prev) => ({ ...prev, open: true, actionType: 'delete' }));
    }
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
            value={field}
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
