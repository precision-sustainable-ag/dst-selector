import {
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateDateRange } from '../../../reduxStore/cropSlice';

const PreviousCashCrop = () => {
  const dispatchRedux = useDispatch();
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);

  const handleDispatch = (start = '', end = '') => {
    dispatchRedux(updateDateRange({ startDate: start, endDate: end }));
  };

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Typography style={{ paddingTop: '1rem', paddingBottom: '7px' }} variant="body2" align="center" color="secondary" gutterBottom>
          Enter your cash crop growing window if you would like to see it displayed on the calendar.
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{
          justifyContent: 'center',
        }}
      >
        <Grid item>
          <LocalizationProvider sx={{ padding: 3 }} dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              label="Planting Date"
              value={cashCropDataRedux.dateRange.startDate}
              onChange={(newDate) => handleDispatch(newDate, cashCropDataRedux.dateRange.endDate)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <LocalizationProvider sx={{ padding: 3 }} dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              label="Harvest Date"
              value={cashCropDataRedux.dateRange.endDate}
              onChange={(newDate) => handleDispatch(cashCropDataRedux.dateRange.startDate, newDate)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default PreviousCashCrop;
