/*
  This file contains the Button component
*/

import React from 'react';
import { Button } from '@mui/material';
import { CustomStyles } from './constants';

const PSAButton = ({
  data, onClick, disabled, style, sx, icon,
}) => {
  const buttonProps = {
    backgroundColor: CustomStyles().secondaryProgressBtnBorderColor,
    borderRadius: CustomStyles().fullyRoundedRadius,
    color: '#000',
    padding: CustomStyles().defaultButtonPadding,
    borderColor: CustomStyles().secondaryProgressBtnBorderColor,
    '&:hover': {
      borderColor: CustomStyles().primaryProgressBtnBorderColor,
      backgroundColor: CustomStyles().primaryProgressBtnColor,
      color: '#000',
    },
  };

  return (
    <Button style={style} onClick={onClick} disabled={disabled} sx={{ ...buttonProps, ...sx }}>
      {icon}
      {data}
    </Button>
  );
};

export default PSAButton;
