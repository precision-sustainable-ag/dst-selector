import React, { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Grid, Button,
} from '@mui/material';
import { useSelector } from 'react-redux';

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
  return (
    <Grid container>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
        <FormControl sx={{ minWidth: '80%' }}>
          <InputLabel sx={inputLabelStyles}>
            Select saved history:
          </InputLabel>
          <Select
            value={value}
            label="12344"
            onChange={(e) => setValue(e.target.value)}
            sx={selectStyles}
            MenuProps={menuProps}
          >
            {userHistoryList.map((history) => (<MenuItem value={history.label}>{history.label}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
        <Button>Confirm</Button>
        <Button>Add</Button>
      </Grid>
    </Grid>
  );
};

export default HistorySelect;
