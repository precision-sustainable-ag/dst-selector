/* eslint-disable max-len */
import {
  Collapse, FormControl, InputLabel, List, ListItem, MenuItem, Select,
} from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '../../../store/Store';

const PlantHardinessZone = ({ updateZone }) => {
  const { state } = useContext(Context);

  const handleRegionChange = (event) => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = state.regions.filter((region) => region.shorthand == event.target.value);
    updateZone(regionInfo[0]);
  };

  const plantHardinessZone = () => (
    <Select
      variant="filled"
      labelId="plant-hardiness-zone-dropdown-select"
      id="plant-hardiness-zone-dropdown-select"
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      onChange={(e) => handleRegionChange(e)}
      value={state.zone || ''}
    >

      {state.regions.length > 0 && state.regions.map((region, i) => (
        <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
          {state.councilLabel !== 'Midwest Cover Crop Council' ? `Zone ${region.shorthand?.toUpperCase()}` : `${region.shorthand?.toUpperCase()}`}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Collapse in={state.zoneToggle}>
      <List component="div" disablePadding>
        <ListItem component="div">
          <FormControl
            variant="filled"
            style={{ width: '100%' }}
            sx={{ minWidth: 120 }}
          >
            <InputLabel>{state.councilLabel === 'Midwest Cover Crop Council' ? 'COUNTY' : 'ZONE'}</InputLabel>
            {plantHardinessZone()}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
