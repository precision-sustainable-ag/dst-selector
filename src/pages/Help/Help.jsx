/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';
import { CustomStyles } from '../../shared/constants';
import InformationSheetDictionary from './InformationSheetDictionary/InformationSheetDictionary';
import HowTo from './HowTo/HowTo';
import FAQ from './FAQ/FAQ';
import InfoSheets from './InfoSheets/InfoSheets';
import pirschAnalytics from '../../shared/analytics';
import useIsMobile from '../../hooks/useIsMobile';

const Help = () => {
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // only used till new videos are made for How to Use section
  const newVideos = false;
  const howToText = newVideos ? `How to use the ${councilShorthandRedux} Species Selector Tool` : ' How To: Video tutorial coming soon…';

  const isMobile = useIsMobile('md');

  useEffect(() => {
    document.title = 'Help Page';
  }, []);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Help' } });
  }, []);

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
      <Grid container spacing={0} justifyContent="center" mt={isMobile ? 0 : 5} mb={isMobile ? 0 : 5}>
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
            xs: 3, sm: 3, md: 0, lg: 0, xl: 0,
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

export default Help;
