/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Button, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getExperts } from '../../../shared/constants';

const AboutTheExperts = () => {
  const [value, setValue] = useState(0);

  const councils = [
    { id: 0, menuOption: 'Development Team' },
    { id: 1, menuOption: 'Testing Team' },
    { id: 2, menuOption: 'Midwest Cover Crops Council' },
    { id: 3, menuOption: 'Northeast Cover Crops Council' },
    { id: 4, menuOption: 'Southern Cover Crops Council' },
    { id: 5, menuOption: 'Western Cover Crops Council' },
  ];

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
            width: '16.6%',
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
      <Typography style={{ paddingTop: '15px' }} variant="body1" align="left">
        {value !== 2 && value !== 5 ? getExperts(value).map((expert) => (
          <p>
            <strong>{`${expert.lastName}, ${expert.firstName}; `}</strong>
            <span>{expert.Affiliation}</span>
          </p>
        ))
          : getExperts(value)}
      </Typography>
    </Box>
  );
};
export default AboutTheExperts;
