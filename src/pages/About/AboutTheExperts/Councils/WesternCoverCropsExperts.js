/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from '@mui/material';
import React from 'react';

const NortheastCoverCropExperts = () => (
  <>
    <Typography style={{ paddingTop: '15px' }} variant="body1" align="left">
      Data for the Western Cover Crop Council is soon to come!
    </Typography>
    <br />
    <a target="_blank" style={{ fontSize: '20px', display: 'flex', justifyContent: 'center' }} href="https://westerncovercrops.org/" rel="noreferrer">
      <b>Western Cover Crop Council Site </b>
    </a>
  </>
);
export default NortheastCoverCropExperts;
