/*
  This file contains the Tooltip component
*/

import React from 'react';
import { Tooltip } from '@mui/material';

const PSATooltip = ({
  title, placement, arrow, enterTouchDelay, dangerouslySetInnerHTML, tooltipContent, ...props
}) => (
  <Tooltip
    title={dangerouslySetInnerHTML ? undefined : title}
    placement={placement}
    arrow={arrow}
    enterTouchDelay={enterTouchDelay}
    {...props}
  >
    {tooltipContent}
  </Tooltip>
);

export default PSATooltip;
