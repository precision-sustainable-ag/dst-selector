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
    async function getDictData() {
      await fetch(`https://api.covercrop-selector.org/legacy/data-dictionary?zone=zone${sfilters.zone}`)
        .then((res) => res.json())
        .then((data) => { setDict(data.filter((val) => val.Variable === variable)); })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }

    getDictData();
  }, [
    sfilters.zone,
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
