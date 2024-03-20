/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Button,
} from '@mui/material';
import React, { useState } from 'react';
import NortheastCoverCropExperts from './Councils/NortheastCoverCropExperts';
import MidwestCoverCropExperts from './Councils/MidwestCoverCropExperts';
import DevelopmentTeam from './Councils/DevelopmentTeam';
import SouthernCoverCropExperts from './Councils/SouthernCoverCropExperts';
import WesternCoverCropExperts from './Councils/WesternCoverCropExperts';

const AboutTheExperts = () => {
  const [value, setValue] = useState(0);

  const councils = [
    {
      id: 0,
      menuOption: 'Development Team',
      title: 'Development Team',
    },
    {
      id: 1,
      menuOption: 'Midwest Cover Crop Council',
      title: 'Midwest Cover Crop Council',
    },
    {
      id: 2,
      menuOption: 'Northeast Cover Crop Council',
      title: 'Northeast Cover Crop Council',
    },
    {
      id: 3,
      menuOption: 'Southern Cover Crop Council',
      title: 'Southern Cover Crop Council',
    },
    {
      id: 4,
      menuOption: 'Western Cover Crop Council',
      title: 'Western Cover Crop Council',
    },
  ];

  const showExperts = () => {
    switch (value) {
      case 1:
        return <MidwestCoverCropExperts />;
      case 2:
        return <NortheastCoverCropExperts />;
      case 3:
        return <SouthernCoverCropExperts />;
      case 4:
        return <WesternCoverCropExperts />;
      default:
        return <DevelopmentTeam />;
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
      {councils.map((council) => (
        <Button
          key={council.id}
          size="Small"
          sx={{
            width: '20%',
            minHeight: '61px',
            backgroundColor: (council.id === value) ? '#598444' : 'white',
            color: (council.id === value) ? 'white' : '#8abc62',
            '&:hover': { backgroundColor: (council.id === value) ? '#598444' : 'white' },
          }}
          onClick={() => handleChange(council.id)}
          variant="contained"
        >
          {council.menuOption}
        </Button>

      ))}
      {showExperts()}
    </Box>
  );
};
export default AboutTheExperts;
