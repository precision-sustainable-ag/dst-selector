/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Button, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { CustomStyles } from '../../shared/constants';
import InformationSheetDictionary from './InformationSheetDictionary/InformationSheetDictionary';
import HowTo from './HowTo/HowTo';
import FAQ from './FAQ/FAQ';
import InfoSheets from './InfoSheets/InfoSheets';

const Help = () => {
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // only used till new videos are made for How to Use section
  const newVideos = false;
  const howToText = newVideos ? `How to use the ${councilShorthandRedux} Species Selector Tool` : ' How To: Video tutorial coming soon…';

  useEffect(() => {
    document.title = 'Help Page';
  }, []);

  useEffect(() => {
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('help');
    }
  }, [consentRedux]);

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const pageSections = [
    {
      id: 0,
      menuOption: howToText,
      title: 'How to Use The Tool',
    },
    {
      id: 1,
      menuOption: 'Frequently Asked Questions',
      title: 'Frequently Asked Questions',
    },
    {
      id: 2,
      menuOption: 'Data Dictionary',
      title: 'Data Dictionary',
    },
    {
      id: 3,
      menuOption: 'Information Sheets',
      title: 'Information Sheets',
    },
  ];

  const getContent = () => {
    switch (value) {
      case 0: return (
        <HowTo />
      );
      case 1: return (
        <FAQ />
      );
      case 2: return (
        <InformationSheetDictionary zone={6} from="help" />
      );
      case 3: return (
        <InfoSheets />
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

export default Help;
