/*
  Creates popups inside info sheet
  styled using ../../styles/tooltipMaker.scss
*/

import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../../styles/tooltipMaker.scss';

const TooltipMaker = ({
  children, attribute,
}) => {
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (attribute.description.length > 0) {
      setDesc(`${attribute.description} ${attribute.units}`);
    } else {
      setDesc('No Data');
    }
  }, [attribute]);

  return (
    <Tooltip
      placement="top-end"
      title={(
        <div className="filterTooltip">
          <p>{desc}</p>
        </div>
      )}
      arrow
    >
      <span className="tooltipChildren">{children}</span>
    </Tooltip>
  );
};

export default TooltipMaker;
