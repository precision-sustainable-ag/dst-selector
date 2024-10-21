/*
  This file contains the Tooltip component
*/

import React from 'react';
import { Tooltip } from '@mui/material';

const PSATooltip = ({
  title, placement, arrow, enterTouchDelay, dangerouslySetInnerHTML, tooltipContent, ...props
}) => (
  <Tooltip
    title={title}
    placement={placement}
    arrow={arrow}
    enterTouchDelay={enterTouchDelay}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    {...props}
  >
    {tooltipContent}
  </Tooltip>
);

export default PSATooltip;
