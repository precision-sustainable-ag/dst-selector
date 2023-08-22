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
    setField(e.target.value);
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
            {userFields.map((f, i) => (
              <MenuItem key={`userField-${i}`} value={f.label === null ? 'null' : f.label}>
                {f.label === null ? 'null' : f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={() => setFieldDialogState((prev) => ({ ...prev, open: true, actionType: 'updateName' }))}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setFieldDialogState((prev) => ({ ...prev, open: true, actionType: 'delete' }))}>
          <DeleteIcon />
        </IconButton>
      </ListItem>

    </List>

  );
};

export default UserFieldList;
