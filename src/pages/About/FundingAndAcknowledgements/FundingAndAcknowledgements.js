/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Typography,
} from '@mui/material';
import React from 'react';

const FundingAndAcknowledgements = () => (
  <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
    <Typography variant="body1" align="left">
      This material is based upon work supported by the Northeast Sustainable Agriculture
      Research and Education program (subaward # ENE 16-144), a USDA NIFA postdoctoral
      fellowship (grant # 2016-67012-24711), a NIFA SAS CAP grant (project # NC09873), a
      NIFA OREI grant (project # MD.W-2015-07406), USDA ARS and NRCS, and Purdue University.
    </Typography>
  </Box>
);
export default FundingAndAcknowledgements;
