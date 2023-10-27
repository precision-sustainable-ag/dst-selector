/* eslint-disable max-len */
import {
  Collapse, FormControl, InputLabel, List, ListItem, MenuItem, Select,
} from '@mui/material';
import React from 'react';
// import { useSelector } from 'react-redux';

const PlantHardinessZone = ({
  regionShorthand,
  setRegionShorthand,
  regionsRedux,
  councilLabelRedux,
  regionToggleRedux = true,
}) => {
  const plantHardinessZone = () => (
    <Select
      variant="filled"
      onChange={(e) => setRegionShorthand(e.target.value)}
      value={regionShorthand || ''}
      sx={{ minWidth: '150px' }}
    >

      {regionsRedux?.length > 0 && regionsRedux.map((region, i) => (
        <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
          {councilLabelRedux !== 'Midwest Cover Crop Council' ? `Zone ${region.shorthand?.toUpperCase()}` : `${region.shorthand?.toUpperCase()}`}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Collapse in={regionToggleRedux}>
      <List component="div">
        <ListItem component="div">
          <FormControl
            variant="filled"
          >
            <InputLabel>{councilLabelRedux === 'Midwest Cover Crop Council' ? 'COUNTY' : 'ZONE'}</InputLabel>
            {plantHardinessZone()}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
