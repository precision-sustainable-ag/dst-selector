import React, { useEffect, useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Grid, Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../../shared/authToken';
import { loadHistory } from '../../shared/api';
import {
  setSelectedHistory, updateConsent, updateField, setHistoryDialogState,
  setHistoryState,
  historyState,
} from '../../reduxStore/userSlice';
import { setMapRedux } from '../../reduxStore/mapSlice';
import { setAddressRedux } from '../../reduxStore/addressSlice';

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
  const {
    userHistoryList, selectedHistory, historyDialogState,
  } = useSelector((state) => state.userData);

  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const handleLoadHistory = () => {
    // eslint-disable-next-line no-shadow
    const selectedHistory = userHistoryList.find((history) => history.label === value);
    if (selectedHistory) dispatch(setSelectedHistory(selectedHistory));
    const token = getAuthToken();
    loadHistory(token, value).then((res) => {
      if (res) {
        // TODO: temporary schema for user history
        const {
          cropData, mapData, weatherData, goalsData, sharedData,
          soilData, addressData, userData,
        } = res.json;
        // TODO: set these redux values
        console.log(cropData, weatherData, goalsData, sharedData, soilData);
        const { field } = userData;
        const { date, status } = userData.consent;
        // update mapData, consent and field
        dispatch(setMapRedux(mapData));
        dispatch(updateConsent(date, status));
        dispatch(updateField(field));
        dispatch(setAddressRedux(addressData));
        dispatch(setHistoryState(historyState.imported));
      }
    });
  };

  const handleAddHistory = () => {
    dispatch(setHistoryDialogState({ ...historyDialogState, open: true }));
  };

  useEffect(() => {
    if (selectedHistory?.label) {
      if (userHistoryList.find((history) => history.label === selectedHistory.label)) {
        setValue(selectedHistory.label);
      } else setValue('');
    } else setValue('');
  }, [selectedHistory, userHistoryList]);

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
        <Button onClick={handleAddHistory}>Add</Button>
      </Grid>
    </Grid>
  );
};

export default HistorySelect;
