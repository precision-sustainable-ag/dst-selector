/* eslint-disable react/no-unescaped-entities */
/*
  This file contains the About component, helper functions, and styles
  The about page is a static pages that has information about the project
  RenderContent contains all the text listed in the about section
*/

import { Box, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PSAButton } from 'shared-react-components/src';
import useIsMobile from '../../hooks/useIsMobile';
import pirschAnalytics from '../../shared/analytics';
import { CustomStyles } from '../../shared/constants';
import AboutTheExperts from './AboutTheExperts/AboutTheExperts';
import Attribution from './Attribution/Attribution';
import FundingAndAcknowledgements from './FundingAndAcknowledgements/FundingAndAcknowledgements';
import LicenseAndCopyright from './LicenseAndCopyright/LicenseAndCopyright';

const About = () => {
  const [value, setValue] = useState(0);

  const isMobile = useIsMobile('md');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'About' } });
  }, []);

  const pageSections = [
    {
      id: 0,
      menuOption: 'License and Copyright',
      title: 'License and Copyright',
    },
    {
      id: 1,
      menuOption: 'Attribution',
      title: 'Attribution',
    },
    {
      id: 2,
      menuOption: 'Funding and Acknowledgements',
      title: 'Funding and Acknowledgements',
    },
    {
      id: 3,
      menuOption: 'About the Experts',
      title: 'About The Experts',
    },
  ];

  const getContent = () => {
    switch (value) {
      case 0:
        return <LicenseAndCopyright />;
      case 1:
        return <Attribution />;
      case 2:
        return <FundingAndAcknowledgements />;
      case 3:
        return <AboutTheExperts />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        mt={isMobile ? 0 : 5}
        mb={isMobile ? 0 : 5}
      >
        <Grid item xs={12} sm={12} md={3.4} lg={3.4} xl={3.4}>
          <div
            style={{
              border: `1px solid ${CustomStyles().darkGreen}`,
              borderRight: '0px',
            }}
          >
            {pageSections.map((section) => (
              <PSAButton
                buttonType=""
                key={section.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  borderRadius: '0px',
                  width: '100%',
                  paddingLeft: section.id === 1 ? '30px' : '10px',
                }}
                onClick={() => handleChange(section.id)}
                variant={value === section.id ? 'contained' : 'text'}
                title={section.menuOption}
              />
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
            xs: 3,
            sm: 3,
            md: 0,
            lg: 0,
            xl: 0,
          }}
        >
          <div style={{ border: `1px solid ${CustomStyles().darkGreen}`, minHeight: '320px' }}>
            <Stack pl={isMobile ? 0 : 3} pr={isMobile ? 0 : 3} pb={4}>
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
