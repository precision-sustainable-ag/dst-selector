/*
  This file contains the CropLegendModal and it's styles
  The CropLegendModal shows the color legend for the calendar view (crop calendar)
*/

import {
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
} from '@mui/material';
import { ExpandLess, ExpandMore, FiberManualRecord } from '@mui/icons-material';
import React, { useState } from 'react';

const Legend = ({ legendData, modal }) => {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <>
      <ListItemButton className="legend" onClick={() => setLegendOpen(!legendOpen)}>
        <ListItemText primary="LEGEND" />
        {legendOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={legendOpen} timeout="auto" unmountOnExit>

        {legendData.length > 0
      && (
        legendData.map((item, key) => (
          <List disablePadding className="legendModalRow" key={`gird index ${key}`}>
            <ListItem>
              <ListItemText style={{ paddingLeft: '1rem' }}>{`${item.label}`}</ListItemText>
              {
              modal && ((item.className === 'hessianFlyFree')
                ? (
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ marginLeft: '13px', marginRight: '3px' }}
                    className={`${item.className}`}
                  >
                    <polygon
                      points="50,0 100,50 50,100 0,50"
                      fill="#f8a504"
                      strokeWidth={0}
                    />
                  </svg>
                )
                : <FiberManualRecord style={{ marginLeft: '9px', color: item.color }} className={`${item.className}`} />
              )
            }
            </ListItem>
          </List>
        ))
      )}
      </Collapse>

    </>
  );
};

export default Legend;
