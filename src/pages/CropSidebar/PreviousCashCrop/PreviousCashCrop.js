import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { Fragment, useContext, useState } from 'react';
import { Context } from '../../../store/Store';
import { CustomStyles } from '../../../shared/constants';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from "@mui/x-date-pickers";


const PreviousCashCrop = ({ handleToggle, setDateRange}) => {
  const { state, dispatch } = useContext(Context);
  const [cashCropVisible, setCashCropVisible] = useState(true); // TODO: buggy(?);
  const [cashCropOpen, setCashCropOpen] = useState(true);

 
  const handleDispatch = (start = '', end = '', type) => {
    dispatch({

      type: 'UPDATE_DATE_RANGE',
      data: {
        //TODO: use Date() in future?
        startDate: start,
        endDate: end,
      },
    });
  };

  const toggleCashCrop = () => {
    setCashCropOpen(!cashCropOpen);
  }

  return (
    <>
      
      <ListItem
        button
        onClick={toggleCashCrop}
        style={{ backgroundColor: cashCropOpen ? CustomStyles().lightGreen : 'inherit' }}
      >
      <ListItemText primary="PREVIOUS CASH CROP" />
        {cashCropOpen  ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cashCropOpen} timeout="auto" unmountOnExit>
      <Typography variant="body1" sx={{ paddingLeft: 3 }}>
          Specify the Cash Crop Growth Window by selecting the Cash Crop Planting Date then
          selecting its Harvest Date.
      </Typography>
        <List component="div">
          <ListItem sx={{ paddingLeft: 3 }}>
            <TextField
              fullWidth
              label="Previous Cash Crop"
              id="outlined-margin-dense"
              defaultValue=""
              margin="dense"
              variant="outlined"
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Planting Date"
                value={state.cashCropData.dateRange.startDate}
                onChange={(newDate) => handleDispatch(newDate, state.cashCropData.dateRange.endDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </ListItem>

          <ListItem sx={{ paddingLeft: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Harvest Date"
                value={state.cashCropData.dateRange.endDate}
                onChange={(newDate) => handleDispatch(state.cashCropData.dateRange.startDate, newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem sx={{ paddingLeft: 3 }}>
            <FormGroup>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={cashCropVisible}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const cashCropDateRange = JSON.parse(
                          window.localStorage.getItem('cashCropDateRange'),
                        );
                        handleDispatch(moment(cashCropDateRange.startDate.substring(0, 10)), moment(cashCropDateRange.endDate.substring(0, 10)));
                      } else {
                        handleDispatch();
                      }
                      setCashCropVisible(!cashCropVisible);
                    }}
                    value="Show Cash Crop Growth Window"
                  />
                )}
                label={
                  <Typography variant="body2">Show Previous Cash Crop Growth Window</Typography>
                }
              />
            </FormGroup>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default PreviousCashCrop;


