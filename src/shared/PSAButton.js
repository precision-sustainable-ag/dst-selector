/*
  This file contains the Button component
*/

import React from 'react';
import { Button } from '@mui/material';
// import { CustomStyles } from './constants';

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
  pillButton,
  valuesChanged,
  modalLink,
  toggleOptions,
  currentPathname,
  buttonPathname,
}) => {
  const pillButtonProps = {
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
  };
  const valuesChangedProps = {
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

  };
  const modalLinkProps = {
    color: 'white',
    textTransform: 'none',
    marginLeft: '2em',
    textDecoration: 'underline',
  };
  const toggleOptionsProps = {
    backgroundColor: (currentPathname === buttonPathname) ? '#598444' : 'white',
    color: (currentPathname === buttonPathname) ? 'white' : '#8abc62',
    border: '10px',
    '&:hover': {
      backgroundColor: (currentPathname === buttonPathname) ? '#598444' : 'white',
      color: (currentPathname === buttonPathname) ? 'white' : '#8abc62',
    },

  };
  return (
    <Button
      style={style}
      onClick={onClick}
      disabled={disabled}
      sx={{
        ...(pillButton && pillButtonProps),
        ...(valuesChanged && valuesChangedProps),
        ...(modalLink && modalLinkProps),
        ...(toggleOptions && toggleOptionsProps),
        ...sx,
      }}
      key={id}
      to={to}
      variant={variant}
      size={size}
      component={component}
      color={color}
      exact={exact}
      autoFocus={autoFocus}
    >
      {startIcon}
      {data}
    </Button>
  );
};

export default PSAButton;
