/* eslint-disable max-len */
import {
  Collapse, FormControl, InputLabel, List, ListItem, MenuItem, Select, Typography,
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
      labelId="plant-hardiness-zone-dropdown-select"
      id="plant-hardiness-zone-dropdown-select"
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      sx={{ minWidth: 200 }}
      onChange={(e) => setRegionShorthand(e.target.value)}
      value={regionShorthand || ''}
      error={!regionShorthand}
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
            {!regionShorthand
            && (
            <Typography variant="body2" align="center" color="error" gutterBottom>
              {`Please Select a ${councilLabelRedux === 'Midwest Cover Crop Council' ? 'County' : 'Zone'}`}
            </Typography>
            )}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
