/*
  This file contains the Button component
*/

import React from 'react';
import { Button } from '@mui/material';
// import { CustomStyles } from './constants';

const PSAButton = ({
  data, onClick, disabled, style, sx, startIcon, selected, pillButton, id, variant, size, color, to, exact, component, autoFocus,
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
  return (
    <Button
      style={style}
      onClick={onClick}
      disabled={disabled}
      sx={{ ...(pillButton && pillButtonProps), ...sx }}
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
