import {
  Grid, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateDateRange } from '../../../reduxStore/cropSlice';

const PreviousCashCrop = () => {
  const dispatchRedux = useDispatch();
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDispatch = (start = '', end = '') => {
    dispatchRedux(updateDateRange({ startDate: start, endDate: end }));
  };

  return (
    <div>
      <Grid item container xs={12} alignItems="center" justifyContent="center">
        <Typography align="center" variant="h4">
          Cash Crop Growing Window
        </Typography>
      </Grid>
      <Grid item container xs={12} mb={isMobile ? 4 : 7}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Enter your cash crop growing window if you would like to see it displayed on the calendar.
        </Typography>
      </Grid>
      <Grid item container>
        <Grid
          item
          container
          justifyContent={isMobile ? 'center' : 'space-between'}
          alignItems="center"
          xs={12}
          spacing={isMobile ? 2 : 3}
          display="flex"
        >
          <Grid item md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                sx={{ width: 1 }}
                label="Planting Date"
                value={cashCropDataRedux.dateRange.startDate}
                onChange={(newDate) => handleDispatch(newDate, cashCropDataRedux.dateRange.endDate)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                sx={{ width: 1 }}
                label="Harvest Date"
                value={cashCropDataRedux.dateRange.endDate}
                onChange={(newDate) => handleDispatch(cashCropDataRedux.dateRange.startDate, newDate)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviousCashCrop;
