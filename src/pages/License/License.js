/*
  This file contains the License component, helper functions
  The License page contains the license which is made of the MIT license text and Agriculture Informatics license
*/

import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import MITLicenseText from './MITLicenseText/MITLicenseText';
import AgInformaticsLicenseText from './AgInformaticsLicenseText/AgInformaticsLicenseText';

const License = ({ licenseType = 'MIT' }) => {
  useEffect(() => {
    switch (licenseType) {
      case 'MIT':
        document.title = 'MIT License';
        break;
      case 'AgInformatics':
        document.title = 'AgInformatics License';
        break;
      default:
        document.title = 'MIT License';
        break;
    }
  }, [licenseType]);
  return (
    <Grid container>
      <Grid item>
        {licenseType === 'AgInformatics' ? <AgInformaticsLicenseText /> : <MITLicenseText />}
      </Grid>
    </Grid>
  );
};

export default License;
