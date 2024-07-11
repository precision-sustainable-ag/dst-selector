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
import MITLicenseText from '../../License/MITLicenseText/MITLicenseText';

const LicenseAndCopyright = () => (
  <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
    <Typography variant="body1" align="left">
      The data featured in this tool are based on expert opinion. These data represent the
      collective knowledge and experience of cover crop experts in the Northeast US.
      Experts, grouped by their USDA hardiness zone, evaluated each cover crop property in
      the dataset via deliberative discussions in over 70 teleconferences. The zones’
      decisions on cover crop characteristics, notes regarding nuances and edge/special
      cases, and framing of ratings were recorded in an online database. A comparative
      analysis of the data across zones identified areas of inconsistencies which were then
      addressed in a deliberative intra-regional discussion. This process, in conjunction
      with feedback from users on the website, ensures the quality and improvement of the
      data that powers the NECCC Species Selector. You can learn more about the
      {' '}
      <a
        href="https://aginformaticslab.org/cover-crop-decision-tools/"
        target="_blank"
        rel="noopener noreferrer"
      >
        cover crop data verification process here
      </a>
      .
      {' '}
      <b>This work was made possible by the USDA</b>
      <br />
      <br />
      <b>Data Sources:</b>
      {' '}
      The cover crop data were adapted from the
      {' '}
      <a href="http://mccc.msu.edu" target="_blank" rel="noopener noreferrer">
        Midwest Cover Crops Council (MCCC) species selector tool
      </a>
      . These initial data have been reviewed, modified, and greatly expanded upon by cover
      crop experts in the Northeast in each
      {' '}
      <a
        href="https://planthardiness.ars.usda.gov/PHZMWeb/"
        target="_blank"
        rel="noopener noreferrer"
      >
        USDA plant hardiness zone
      </a>
      {' '}
      to best match the cropping system types, goals, and constraints found in our region.
      Additional data sources adapted for this tool include the
      {' '}
      <a
        href="https://plants.sc.egov.usda.gov/java/"
        target="_blank"
        rel="noopener noreferrer"
      >
        USDA PLANTS database
      </a>
      {' '}
      and a seeding rate calculator developed by USDA NRCS. These data are supplemented by
      soils data available via
      {' '}
      <a
        href="https://sdmdataaccess.nrcs.usda.gov/"
        target="_blank"
        rel="noopener noreferrer"
      >
        USDA NRCS Soil Data Access
      </a>
      , and weather data made available through an API, constructed by the Precision
      Sustainable Agriculture team, serving
      {' '}
      <a
        href="https://www.nssl.noaa.gov/projects/mrms/"
        target="_blank"
        rel="noopener noreferrer"
      >
        NSSL MRMS
      </a>
      {' '}
      and
      {' '}
      <a href="https://ldas.gsfc.nasa.gov/nldas/" target="_blank" rel="noopener noreferrer">
        NASA NLDAS-2
      </a>
      {' '}
      weather data.
      <br />
      <br />
      <b>Data Availability:</b>
      {' '}
      We are in the process of making our data publicly available
      via a few mechanisms once we have completed beta-testing and finalized data quality
      checks. In addition to accessing this data via the NECCC Species Selector Tool, users
      will be able to download the raw data (spreadsheets) and Species Information Sheets
      (PDFs).
      <br />
      <br />
    </Typography>
    <MITLicenseText styles={false} aboutPage />
    <br />
    <br />
    <Typography>
      <a
        target="_blank"
        href="https://www.nrcs.usda.gov/contact/find-a-service-center"
        rel="noopener noreferrer"
      >
        Click here
      </a>
      {' '}
      to find an NRCS Service Center
    </Typography>
  </Box>
);
export default LicenseAndCopyright;
