/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import React from 'react';
import { Grid } from '@mui/material';
import ProgressButtons from '../../shared/ProgressButtons';

const Footer = () => (
  <Grid
    container
    sx={{
      backgroundColor: '#598445',
    }}
    className="primaryFooter"
    direction="column"
    alignItems="center"
    justifyContent="center"
  >
    <Grid
      item
      xs={12}
      mt={0.6}
      mb={0.6}
    >
      <ProgressButtons />
    </Grid>
  </Grid>
);

export default Footer;
