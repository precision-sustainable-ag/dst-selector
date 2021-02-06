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
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
// import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { CustomStyles } from "../../shared/constants";

const stateDefinitions = {
  available: {
    color: null,
    label: "Available",
  },
  selected: {
    color: CustomStyles().lightGreen,
    label: "Selected",
  },
  //   enquire: {
  //     color: "#ffd200",
  //     label: "Enquire",
  //   },
  //   unavailable: {
  //     selectable: false,
  //     color: "#78818b",
  //     label: "Unavailable",
  //   },
};

const DateRangeDialog = ({
  range = [],
  open = false,
  onChange = () => {},
  close = () => {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = useState("sm");
  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };
  return (
    <Dialog
      maxWidth={"md"}
      //   fullWidth={true}
      fullScreen={fullScreen}
      open={open}
      onClose={close}
      aria-labelledby="planting-to-harvest-title"
    >
      <DialogTitle id="planting-to-harvest-title">
        Cash Crop Growth Window
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Specify the Cash Crop Growth Window by selecting the Cash Crop
          Planting Date then selecting its Harvest Date.
        </Typography>
      </DialogContent>
      <DialogContent>
        {/* <DateRangePicker definedRanges={[]} open={open} onChange={onChange} /> */}
        <DateRangePicker
          firstOfWeek={1}
          numberOfCalendars={2}
          selectionType="range"
          // minimumDate={new Date()}
          stateDefinitions={stateDefinitions}
          // dateStates={dateRanges}
          defaultState="available"
          // showLegend={true}
          value={null}
          onSelect={(e) => {
            let startDate = e.start.format("YYYY-MM-DD").toString();
            let endDate = e.end.format("YYYY-MM-DD").toString();
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
