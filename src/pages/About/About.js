/* eslint-disable react/no-unescaped-entities */
/*
  This file contains the About component, helper functions, and styles
  The about page is a static pages that has information about the project
  RenderContent contains all the text listed in the about section
*/

import {
  Box, Button, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { CustomStyles } from '../../shared/constants';
import LicenseAndCopyright from './LicenseAndCopyright/LicenseAndCopyright';
import FundingAndAcknowledgements from './FundingAndAcknowledgements/FundingAndAcknowledgements';
import AboutTheExperts from './AboutTheExperts/AboutTheExperts';

const About = () => {
  const [value, setValue] = React.useState(0);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('about');
    }
  }, [consentRedux]);

  const pageSections = [
    {
      id: 0,
      menuOption: 'License and Copyright',
      title: 'License and Copyright',
    },
    {
      id: 1,
      menuOption: 'Funding and Acknowledgements',
      title: 'Funding and Acknowledgements',
    },
    {
      id: 2,
      menuOption: 'About the Experts',
      title: 'About The Experts',
    },
  ];

  const getContent = () => {
    switch (value) {
      case 0:
        return (
          <LicenseAndCopyright />
        );
      case 1:
        return (
          <FundingAndAcknowledgements />
        );
      case 2: return (
        <AboutTheExperts />
      );
      default: return null;
    }
  };

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
      <Grid container spacing={0} justifyContent="center" mt={4} mb={5} pt={3}>
        <Grid item xs={12} sm={12} md={3.4} lg={3.4} xl={3.4}>
          <div
            style={{
              border: `1px solid ${CustomStyles().darkGreen}`,
              borderRight: '0px',
            }}
          >
            {pageSections.map((section) => (
              <Button
                key={section.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  borderRadius: '0px',
                  width: '100%',
                }}
                onClick={() => handleChange(section.id)}
                variant={value === section.id ? 'contained' : 'text'}
              >
                {section.menuOption}
              </Button>
            ))}
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          mt={{
            xs: 3, sm: 3, md: 0, lg: 0, xl: 0,
          }}
        >
          <div style={{ border: `1px solid ${CustomStyles().darkGreen}`, minHeight: '320px' }}>
            <Stack pl={3} pr={3} pb={4}>
              <center>
                <Typography variant="h4" gutterBottom>
                  {pageSections.filter((section) => section.id === value)[0].title}
                </Typography>
              </center>
              {getContent()}
            </Stack>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
