/*
  This file contains the DateRangeDialog component
  The DateRangeDialog is the component that handles the calendar dialogue
  Styles are created using makeStyles
*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { CustomStyles } from '../../shared/constants';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  selected: {
    color: CustomStyles().lightGreen,
    label: 'Selected',
  },
};

const DateRangeDialog = ({ open = false, onChange = () => {}, close = () => {} }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    const startDate = new Date(ranges.selection.startDate).toLocaleDateString('sv');
    const endDate = new Date(ranges.selection.endDate).toLocaleDateString('sv');
    setSelection(ranges.selection);
    onChange({ startDate: startDate, endDate: endDate });
  };

  return (
    <Dialog
      maxWidth={'md'}
      fullScreen={fullScreen}
      open={open}
      onClose={close}
      aria-labelledby="planting-to-harvest-title"
    >
      <DialogTitle id="planting-to-harvest-title">Cash Crop Growth Window</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Specify the Cash Crop Growth Window by selecting the Cash Crop Planting Date then
          selecting its Harvest Date.
        </Typography>
      </DialogContent>
      <DialogContent>
        <DateRangePicker
          ranges={[selection]}
          onChange={handleSelect}
          months={2}
          staticRanges={[]}
          inputRanges={[]}
        />
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DateRangeDialog;
