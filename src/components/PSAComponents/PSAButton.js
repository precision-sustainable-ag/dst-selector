/*
  This file contains the Button component
*/
import { Button } from '@mui/material';

import styled from 'styled-components';

// Handle the backround color the for the pill button
const pillBackgroundColor = (selected, transparent) => {
  if (selected) {
    return '#49a8ab';
  }
  if (transparent) {
    return 'transparent';
  }
  return '#e3f2f4';
};

const PSAButton = styled(Button)(({ buttonType, selected, transparent }) => ({
  // Button properties
  ...(buttonType === 'LightButton' && {
    backgroundColor: '#e3f2f4',
    borderRadius: '200px',
    color: '#000',
    padding: '10px 20px 10px 20px',
    borderColor: '#e3f2f4',
    '&:hover': {
      borderColor: '#62b8bc',
      backgroundColor: '#49a8ab',
      color: '#000',
    },
  }),
  ...(buttonType === 'PillButton' && {
    backgroundColor: pillBackgroundColor(selected, transparent),
    borderRadius: '200px',
    color: '#000',
    padding: '10px 20px 10px 20px',
    borderColor: '#e3f2f4',
    '&:hover': {
      borderColor: '#62b8bc',
      backgroundColor: '#49a8ab',
      color: '#000',
    },
  }),
  ...(buttonType === 'ValuesChanged' && {
    backgroundColor: 'rgba(255, 150, 28, 0.2)',
    borderRadius: '999px',
    padding: '0.5rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 150, 28, 0.3)',
    },
    '@media (max-width:600px)': {
      padding: '0.5rem',
      borderRadius: '999px',
      '& .MuiTypography-root': {
        fontSize: '0.7rem',
      },
    },
    size: 'small',
  }),
  ...(buttonType === 'ModalLink' && {
    color: 'white',
    textTransform: 'none',
    marginLeft: '2em',
    textDecoration: 'underline',
  }),
  ...(buttonType === 'ToggleOptions' && {
    backgroundColor: (selected) ? '#598444' : 'white',
    color: (selected) ? 'white' : '#8abc62',
    border: '10px',
    '&:hover': {
      backgroundColor: (selected) ? '#598444' : 'white',
      color: (selected) ? 'white' : '#8abc62',
    },
  }),
}));

export default PSAButton;
