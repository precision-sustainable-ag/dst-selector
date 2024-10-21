/*
  This file contains the TextField component
*/

import React from 'react';
import { TextField } from '@mui/material';

const PSATextField = ({
  style, placeholder, multiline, variant, fullWidth, minRows,
  onChange, autoFocus, error, value, InputProps, color, label, onChangeCapture, testId,
}) => (
  <TextField
    style={style}
    placeholder={placeholder}
    multiline={multiline}
    variant={variant}
    fullWidth={fullWidth}
    minRows={minRows}
    onChange={onChange}
    autoFocus={autoFocus}
    error={error}
    value={value}
    InputProps={InputProps}
    color={color}
    label={label}
    onChangeCapture={onChangeCapture}
    data-cy={testId}
  />
);

export default PSATextField;
