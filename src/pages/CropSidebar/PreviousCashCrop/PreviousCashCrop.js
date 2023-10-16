import {
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { CustomStyles } from '../../../shared/constants';
import { updateDateRange } from '../../../reduxStore/cropSlice';

const PreviousCashCrop = () => {
  const dispatchRedux = useDispatch();
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);

  const [cashCropOpen, setCashCropOpen] = useState(true);

  const handleDispatch = (start = '', end = '') => {
    dispatchRedux(updateDateRange({ startDate: start, endDate: end }));
  };

  const toggleCashCrop = () => {
    setCashCropOpen(!cashCropOpen);
  };

  return (
    <>

      <ListItem
        button
        onClick={toggleCashCrop}
        style={{ backgroundColor: cashCropOpen ? CustomStyles().lightGreen : 'inherit' }}
      >

        <ListItemText primary="CASH CROP GROWING WINDOW" />
        {cashCropOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cashCropOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem sx={{ paddingLeft: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Planting Date"
                value={cashCropDataRedux.dateRange.startDate}
                onChange={(newDate) => handleDispatch(newDate, cashCropDataRedux.dateRange.endDate)}
              />
            </LocalizationProvider>
          </ListItem>

          <ListItem sx={{ paddingLeft: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Harvest Date"
                value={cashCropDataRedux.dateRange.endDate}
                onChange={(newDate) => handleDispatch(cashCropDataRedux.dateRange.startDate, newDate)}
              />
            </LocalizationProvider>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default PreviousCashCrop;
