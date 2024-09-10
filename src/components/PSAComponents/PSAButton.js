/*
  This file contains the Button component
*/

import React from 'react';
import { Button } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import styled from 'styled-components';

// Light Button
const LightButton = styled(Button)(({ style, sx }) => ({
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
  ...style,
  ...sx,
}));

// Pill Button
const PillButton = styled(Button)(({ selected, style, sx }) => ({
  backgroundColor: selected ? '#49a8ab' : '#e3f2f4',
  borderRadius: '200px',
  color: '#000',
  padding: '10px 20px 10px 20px',
  borderColor: '#e3f2f4',
  '&:hover': {
    borderColor: '#62b8bc',
    backgroundColor: '#49a8ab',
    color: '#000',
  },
  ...style,
  ...sx,

}));

// Values Changed Button
const ValuesChangedButton = styled(Button)(({ style, sx }) => ({
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
  ...style,
  ...sx,
}));

// Modal Link Button
const ModalLinkButton = styled(Button)(({ style, sx }) => ({
  color: 'white',
  textTransform: 'none',
  marginLeft: '2em',
  textDecoration: 'underline',
  ...style,
  ...sx,
}));

// Toggle Options Button
const ToggleOptionsButton = styled(Button)(({ selected, style, sx }) => ({
  backgroundColor: (selected) ? '#598444' : 'white',
  color: (selected) ? 'white' : '#8abc62',
  border: '10px',
  '&:hover': {
    backgroundColor: (selected) ? '#598444' : 'white',
    color: (selected) ? 'white' : '#8abc62',
  },
  size: 'large',
  ...style,
  ...sx,
}));

const PSAButton = ({
  data,
  onClick,
  disabled,
  style,
  sx,
  startIcon,
  selected,
  id,
  variant,
  size,
  color,
  to,
  exact,
  component,
  autoFocus,
  buttonStyle,
}) => {
  // Button properties

  const ButtonProps = {
    style,
    onClick,
    disabled,
    sx,
    key: id,
    to,
    variant,
    size,
    component,
    color,
    exact,
    autoFocus,
  };

  switch (buttonStyle) {
    case 'LightButton':
      return (
        <LightButton
          {...ButtonProps}
          selected={selected}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </LightButton>
      );

    case 'PillButton':
      return (
        <PillButton
          selected={selected}
          {...ButtonProps}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </PillButton>
      );

    case 'ValuesChanged':
      return (
        <ValuesChangedButton
          {...ButtonProps}
          selected={selected}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </ValuesChangedButton>

      );

    case 'ModalLink':
      return (
        <ModalLinkButton
          {...ButtonProps}
          selected={selected}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </ModalLinkButton>
      );

    case 'ToggleOptions':
      return (
        <ToggleOptionsButton
          {...ButtonProps}
          selected={selected}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </ToggleOptionsButton>
      );

    default:
      return (
        <Button
          {...ButtonProps}
          selected={selected}
          style={style}
          sx={sx}
        >
          {startIcon}
          {data}
        </Button>
      );
  }
};

export default PSAButton;
