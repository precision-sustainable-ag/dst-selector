/*
  This file contains the Button component
*/

import React from 'react';
import { Button } from '@mui/material';
import { CustomStyles } from './constants';

const PSAButton = ({
  data, onClick, disabled, style, sx, startIcon, selected,
}) => {
  const buttonData = typeof data === 'string' ? data.toLowerCase() : '';

  const buttonProps = {
    backgroundColor: selected ? CustomStyles().primaryProgressBtnColor : CustomStyles().secondaryProgressBtnBorderColor,
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
    <Button style={style} onClick={onClick} disabled={disabled} sx={{ ...buttonProps, ...sx }} data-cy={`${buttonData}-btn`}>
      {startIcon}
      {data}
    </Button>
  );
};

export default PSAButton;
