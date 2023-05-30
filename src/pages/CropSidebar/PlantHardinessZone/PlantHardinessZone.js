import {
  Chip, Collapse, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../store/Store';

const PlantHardinessZone = ({ handleToggle, dispatch }) => {
  const { state } = useContext(Context);
  const [selectedRegion, setSelectedRegion] = useState({});

  useEffect(() => {
    if (selectedRegion.length > 0) {
      dispatch({
        type: 'UPDATE_REGION',
        data: {
          regionId: selectedRegion.id ?? '',
          regionLabel: selectedRegion.label ?? '',
          regionShorthand: selectedRegion.shorthand ?? '',
        },
      });
    }
  }, [selectedRegion]);

  const updateZone = (region) => {
    setSelectedRegion(region);
    dispatch({
      type: 'UPDATE_ZONE',
      data: {
        zoneText: region.label,
        zone: region.shorthand,
        zoneId: region.id,
      },
    });
  };

  return (
    <>
      <List component="div" disablePadding>
        <ListItem button onClick={() => handleToggle(!state.zoneToggle, 'ZONE_TOGGLE')}>
          <ListItemText
            primary={(
              <Typography variant="body2" className="text-uppercase">
                Plant Hardiness Zone
              </Typography>
            )}
          />
          {state.zoneToggle ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Collapse in={state.zoneToggle}>
        <List component="div" disablePadding>
          <ListItem component="div">
            <Grid container spacing={1}>
              {state.regions.map((region, index) => (
                <Grid item key={index}>
                  <Chip
                    onClick={() => { updateZone(region); }}
                    component="li"
                    size="medium"
                    label={`Zone ${region.shorthand.toUpperCase()}`}
                    color={region.shorthand === state.zone ? 'primary' : 'secondary'}
                  />
                </Grid>
              ))}
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default PlantHardinessZone;
