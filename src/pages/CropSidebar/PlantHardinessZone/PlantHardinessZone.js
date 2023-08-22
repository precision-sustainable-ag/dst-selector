/* eslint-disable max-len */
import {
  Collapse, FormControl, InputLabel, List, ListItem, MenuItem, Select,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const PlantHardinessZone = ({ updateReg }) => {
  // const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const regionShorthand = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const zoneToggleRedux = useSelector((stateRedux) => stateRedux.sharedData.zoneToggle);

  const handleRegionChange = (event) => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = regionsRedux.filter((region) => region.shorthand == event.target.value);
    updateReg(regionInfo[0]);
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
      value={regionShorthand || ''}
    >

      {regionsRedux.length > 0 && regionsRedux.map((region, i) => (
        <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
          {councilLabelRedux !== 'Midwest Cover Crop Council' ? `Zone ${region.shorthand?.toUpperCase()}` : `${region.shorthand?.toUpperCase()}`}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Collapse in={zoneToggleRedux}>
      <List component="div" disablePadding>
        <ListItem component="div">
          <FormControl
            variant="filled"
            style={{ width: '100%' }}
            sx={{ minWidth: 120 }}
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
