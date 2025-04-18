import {
  Grid, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PSAButton } from 'shared-react-components/src';
import { updateDateRange } from '../../../reduxStore/cropSlice';
import { historyState, setHistoryState } from '../../../reduxStore/userSlice';
import pirschAnalytics from '../../../shared/analytics';

const PreviousCashCrop = () => {
  const dispatchRedux = useDispatch();
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDispatch = (start = '', end = '') => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    dispatchRedux(updateDateRange({ startDate: start.toString(), endDate: end.toString() }));
    pirschAnalytics('Previous Cash Crop', { meta: { updated: true } });
  };

  return (
    <>
      <Grid item container xs={12} alignItems="center" justifyContent="center">
        <Typography align="center" variant="h4" data-test="title-growing-window">
          Cash Crop Growing Window
        </Typography>
      </Grid>
      <Grid item container xs={12} mb={isMobile ? 4 : 7} justifyContent="center">
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
            <LocalizationProvider dateAdapter={AdapterDayjs} data-test="planting-date-picker">
              <DatePicker
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                className="planting-date-picker"
                sx={{ width: 1 }}
                label="Planting Date"
                value={dayjs(cashCropDataRedux.dateRange.startDate)}
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
                className="harvest-date-picker"
                sx={{ width: 1 }}
                label="Harvest Date"
                value={dayjs(cashCropDataRedux.dateRange.endDate)}
                onChange={(newDate) => handleDispatch(cashCropDataRedux.dateRange.startDate, newDate)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" mt={2}>
        <PSAButton
          buttonType="PillButton"
          title="Clear Selection"
          onClick={() => {
            handleDispatch('', '');
          }}
          disabled={!cashCropDataRedux.dateRange.startDate && !cashCropDataRedux.dateRange.endDate}
          data-test="clear-dates-button"
        />
      </Grid>
    </>
  );
};

export default PreviousCashCrop;
