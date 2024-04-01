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
      The MCCC verifies cover crop data at the state level with cover crop experts from diverse state geographies and a breadth of experience.
      These experts include University Extension, Government Agencies, seed industry, and farmers.
    </Typography>
    <br />
    <a
      target="_blank"
      style={
      { fontSize: '20px', display: 'flex', justifyContent: 'center' }
      }
      href="https://midwestcovercrops.org/decision-tool-collaborators/"
      rel="noreferrer"
    >
      <b>About The Experts </b>
    </a>
  </>
);
export default NortheastCoverCropExperts;
