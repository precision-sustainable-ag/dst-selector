import React, { useEffect, useState } from 'react';
import {
  Grid, Box,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PSADropdown } from 'shared-react-components/src';
import { getAuthToken } from '../../shared/authToken';
import { loadHistory } from '../../shared/api';
import {
  setSelectedHistory, setHistoryDialogState, setHistoryState,
  historyState, setUserRedux,
} from '../../reduxStore/userSlice';
import { setMapRedux } from '../../reduxStore/mapSlice';
import { setAddressRedux } from '../../reduxStore/addressSlice';
import { setWeatherRedux } from '../../reduxStore/weatherSlice';
import { setSoilRedux } from '../../reduxStore/soilSlice';
import { setGoalsRedux } from '../../reduxStore/goalSlice';
import { setCropRedux } from '../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../reduxStore/sharedSlice';
import pirschAnalytics from '../../shared/analytics';
import PSAButton from '../PSAComponents/PSAButton';
import PSAModal from '../PSAComponents/PSAModal';

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

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: {
    xs: '90%', sm: '80%', md: '80%', lg: '80%', xl: '80%',
  },
  minWidth: {
    xs: '90%', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto',
  },
  marginTop: '15px',
  marginBottom: '15px',
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: {
    xs: 2, sm: 2, md: 3, lg: 4, xl: 4,
  },
};

const HistorySelect = () => {
  const {
    userHistoryList, selectedHistory, historyDialogState,
  } = useSelector((state) => state.userData);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLoadHistory = () => {
    // eslint-disable-next-line no-shadow
    const selectedHistory = userHistoryList.find((history) => history.label === value);
    if (selectedHistory) dispatch(setSelectedHistory(selectedHistory));
    const token = getAuthToken();
    loadHistory(token, value).then((res) => {
      if (res) {
        dispatch(snackHandler({ snackOpen: true, snackMessage: 'History Loaded.' }));
        const {
          cropData, mapData, weatherData, goalsData,
          sharedData, soilData, addressData, userData,
        } = res.json;
        // this is used to specify where the crop from (selector/ explorer)
        const { myCoverCropListLocation } = sharedData;
        // update redux
        dispatch(setCropRedux(cropData));
        dispatch(setMapRedux(mapData));
        dispatch(setWeatherRedux(weatherData));
        dispatch(setGoalsRedux(goalsData));
        dispatch(myCropListLocation({ from: myCoverCropListLocation }));
        dispatch(setSoilRedux(soilData));
        dispatch(setAddressRedux(addressData));
        dispatch(setUserRedux(userData));
        dispatch(setHistoryState(historyState.imported));
        setOpen(false);
      }
    }).catch((err) => {
      dispatch(snackHandler({ snackOpen: true, snackMessage: `Error loading history: ${err}` }));
    });
  };

  const handleAddHistory = () => {
    dispatch(setHistoryDialogState({ ...historyDialogState, open: true }));
    pirschAnalytics('History', { meta: { history: 'Create New' } });
  };

  const handleHistoryImport = () => {
    setOpen(true);
    pirschAnalytics('History', { meta: { history: 'Import' } });
  };

  useEffect(() => {
    if (selectedHistory?.label) {
      if (userHistoryList.find((history) => history.label === selectedHistory.label)) {
        setValue(selectedHistory.label);
      } else setValue('');
    } else setValue('');
  }, [selectedHistory, userHistoryList]);

  return (
    <>
      <PSAModal
        open={open}
        modalContent={(
          <Box sx={modalStyles}>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Typography>Select your history</Typography>
              </Grid>

              <Grid item xs={12} md={9} display="flex" justifyContent="center" alignItems="center">
                <PSADropdown
                  formSx={{ minWidth: '80%' }}
                  inputSx={inputLabelStyles}
                  label="Select History"
                  items={userHistoryList.map((history) => ({ value: history.label, label: history.label }))}
                  SelectProps={{
                    value: { value },
                    onChange: (e) => setValue(e.target.value),
                    MenuProps: menuProps,
                    sx: selectStyles,
                    'data-cy': 'select-history',
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                <PSAButton
                  onClick={handleLoadHistory}
                  variant="contained"
                  disabled={value === ''}
                  data-cy="import-history"
                >
                  Import
                </PSAButton>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <PSAButton onClick={() => setOpen(false)} variant="contained">Cancel</PSAButton>
              </Grid>
            </Grid>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <PSAButton variant="contained" onClick={handleAddHistory} data-cy="create-new-history">Create New History</PSAButton>
        <PSAButton variant="contained" onClick={handleHistoryImport} data-cy="import-previous-history">Import previous history</PSAButton>
      </Box>

    </>
  );
};

export default HistorySelect;
