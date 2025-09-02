import {
  Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PSAButton } from 'shared-react-components/src';
import { updateDateRange } from '../../../reduxStore/cropSlice';
import { historyState, setHistoryState } from '../../../reduxStore/userSlice';
import pirschAnalytics from '../../../shared/analytics';
import useIsMobile from '../../../hooks/useIsMobile';

const PreviousCashCrop = () => {
  const dispatchRedux = useDispatch();
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const { startDate, endDate } = cashCropDataRedux.dateRange;

  const isMobile = useIsMobile('sm');

  const [isError, setIsError] = useState(false);
  const [datePickerKey, setDatePickerKey] = useState(0);

  const handleDispatch = (start = '', end = '') => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    pirschAnalytics('Previous Cash Crop', { meta: { updated: true } });
    if (dayjs(end).isBefore(dayjs(start))) {
      setIsError(true);
      // force rerender
      setDatePickerKey((prev) => prev + 1);
      dispatchRedux(updateDateRange({ startDate: start.toString(), endDate: null }));
      return;
    }
    setIsError(false);
    dispatchRedux(updateDateRange({ startDate: start ? start.toString() : null, endDate: end ? end.toString() : null }));
  };

  return (
    <Grid item container xs={12} alignItems="center" justifyContent="center">
      <Typography align="center" variant="h4" data-test="title-growing-window">
        Cash Crop Growing Window
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Enter your cash crop growing period, or main perennial crop growing window.
      </Typography>
      <Grid
        item
        container
        justifyContent={isMobile ? 'center' : 'space-between'}
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
              label="Growing Season Start"
              value={startDate ? dayjs(startDate) : null}
              onChange={(newDate) => handleDispatch(newDate, cashCropDataRedux.dateRange.endDate)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              key={datePickerKey}
              slotProps={{
                textField: {
                  error: false,
                  helperText: isError ? 'Your start date must be after your end date.' : '',
                },
              }}
              className="harvest-date-picker"
              label="Growing Season End"
              value={endDate ? dayjs(endDate) : null}
              onChange={(newDate) => handleDispatch(cashCropDataRedux.dateRange.startDate, newDate)}
              sx={{
                width: 1,
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: isError && '#d32f2f',
                },
                '.MuiFormHelperText-root': {
                  color: isError && '#d32f2f',
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
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
  );
};

export default PreviousCashCrop;
