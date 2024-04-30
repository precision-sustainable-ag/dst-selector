/* eslint-disable */
import React, { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Grid, Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../../shared/authToken';
import { loadHistory } from '../../shared/api';

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      marginTop: '5px',
    },
    sx: {
      '.MuiMenuItem-root': {
        '&.Mui-selected': {
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

const inputLabelStyles = {
  color: '#598445',
  '&.Mui-focused': {
    color: '#598445',
    fontWeight: 'medium',
  },
};

const selectStyles = {
  minWidth: 100,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#598445',
    borderWidth: '1px',
    borderRadius: '4px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#598445',
    borderWidth: '2px',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#598445',
    borderWidth: '2.5px',
  },
};

const HistorySelect = () => {
  const [value, setValue] = useState('');
  const { userHistoryList } = useSelector((state) => state.userData);

  const handleLoadHistory = () => {
    const token = getAuthToken();
    loadHistory(token, value).then((res) => {
      console.log('res', res);
    })
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
        <FormControl sx={{ minWidth: '80%' }}>
          <InputLabel sx={inputLabelStyles}>
            Select History
          </InputLabel>
          <Select
            value={value}
            label="Select History"
            onChange={(e) => setValue(e.target.value)}
            sx={selectStyles}
            MenuProps={menuProps}
          >
            {userHistoryList.map((history, i) => (
              <MenuItem value={history.label} key={i}>{history.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
        <Button onClick={handleLoadHistory}>Load</Button>
        <Button>Add</Button>
      </Grid>
    </Grid>
  );
};

export default HistorySelect;
