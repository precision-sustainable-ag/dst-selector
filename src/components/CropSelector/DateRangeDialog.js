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
} from '@material-ui/core';
import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { CustomStyles } from '../../shared/constants';

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
          firstOfWeek={1}
          numberOfCalendars={2}
          selectionType="range"
          stateDefinitions={stateDefinitions}
          defaultState="available"
          value={null}
          onSelect={(e) => {
            let startDate = e.start.format('YYYY-MM-DD').toString();
            let endDate = e.end.format('YYYY-MM-DD').toString();
            onChange({ startDate: startDate, endDate: endDate });
            close();
          }}
        />

        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DateRangeDialog;
