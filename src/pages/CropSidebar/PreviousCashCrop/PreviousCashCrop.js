import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { CalendarTodayRounded, ExpandLess, ExpandMore } from '@mui/icons-material';
import moment from 'moment';
import React, { Fragment, useContext, useState } from 'react';
import { Context } from '../../../store/Store';
import DateRangeDialog from './DateRangeDialog';
import { CustomStyles } from '../../../shared/constants';

const PreviousCashCrop = ({ handleToggle, classes, setDateRange }) => {
  const { state, dispatch } = useContext(Context);
  const [cashCropVisible, setCashCropVisible] = useState(true); // TODO: buggy(?);

  return (
    <>
      <ListItem
        button
        onClick={() => handleToggle('cashCropOpen')}
        style={{ backgroundColor: state.cashCropOpen ? CustomStyles().lightGreen : 'inherit' }}
      >
        <ListItemText primary="PREVIOUS CASH CROP" />
        {state.cashCropOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.cashCropOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem className={classes.nested}>
            <TextField
              fullWidth
              label="Previous Cash Crop"
              id="outlined-margin-dense"
              defaultValue=""
              margin="dense"
              variant="outlined"
            />
          </ListItem>
          <ListItem className={classes.nested}>
            <TextField
              label="Planting to Harvest"
              value={`${
                state.cashCropData.dateRange.startDate
                && moment(state.cashCropData.dateRange.startDate).format('MM/D')
              } - ${
                state.cashCropData.dateRange.endDate
                && moment(state.cashCropData.dateRange.endDate).format('MM/D')
              }`}
              fullWidth
              onClick={() => handleToggle('dateRangeOpen')}
              margin="dense"
              aria-haspopup="true"
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment>
                    <IconButton size="small" onClick={() => handleToggle('dateRangeOpen')}>
                      <CalendarTodayRounded />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem className={classes.nested}>
            <FormGroup>
              <FormControlLabel
                classes={{ root: classes.formControlLabel }}
                control={(
                  <Checkbox
                    checked={cashCropVisible}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const cashCropDateRange = JSON.parse(
                          window.localStorage.getItem('cashCropDateRange'),
                        );
                        dispatch({
                          type: 'UPDATE_DATE_RANGE',
                          data: {
                            startDate: cashCropDateRange.startDate,
                            endDate: cashCropDateRange.endDate,
                          },
                        });
                      } else {
                        dispatch({
                          type: 'UPDATE_DATE_RANGE',
                          data: {
                            startDate: '',
                            endDate: '',
                          },
                        });
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
      {state.dateRangeOpen && (
        <DateRangeDialog
          open
          close={() => handleToggle('dateRangeOpen')}
          onChange={(range) => setDateRange(range)}
          range={[]}
        />
      )}
    </>
  );
};

export default PreviousCashCrop;
