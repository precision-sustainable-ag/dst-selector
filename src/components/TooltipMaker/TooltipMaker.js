/*
  Creates popups inside info sheet
  styled using ../../styles/tooltipMaker.scss
*/

import { Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/Store';
import '../../styles/tooltipMaker.scss';

const TooltipMaker = ({ children, variable }) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];

  const [desc, setDesc] = useState('');
  const [dict, setDict] = useState([]);

  useEffect(() => {
    let dictionary;
    switch (sfilters.zone) {
      case 7:
        dictionary = state.zone7Dictionary.filter((val) => val.Variable === variable);
        break;
      case 6:
        dictionary = state.zone6Dictionary.filter((val) => val.Variable === variable);
        break;
      case 5:
        dictionary = state.zone5Dictionary.filter((val) => val.Variable === variable);
        break;
      case 4:
        dictionary = state.zone4Dictionary.filter((val) => val.Variable === variable);
        break;
      default:
        dictionary = state.zone7Dictionary.filter((val) => val.Variable === variable);
        break;
    }

    setDict(dictionary);
  }, [
    sfilters.zone,
    state.zone4Dictionary,
    state.zone5Dictionary,
    state.zone6Dictionary,
    state.zone7Dictionary,
    variable,
  ]);

  useEffect(() => {
    if (dict.length === 1) {
      setDesc(`${dict[0].Description} ${dict[0]['Values Description']}`);
    } else {
      setDesc('No Data');
    }
  }, [dict]);

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
