/*
  Under construction
*/

import { AppBar, Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function Navigation() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home" />
          <Tab label="Decision Tools" />
          <Tab label="Crop Mix" />
          <Tab label="Plant Info" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Placeholder for a future component No. 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Placeholder for a future component No. 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Placeholder for a future component No. 3
      </TabPanel>
      <TabPanel value={value} index={3}>
        Placeholder for a future component No. 4
      </TabPanel>
    </Paper>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
