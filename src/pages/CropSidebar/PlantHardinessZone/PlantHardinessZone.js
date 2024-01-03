/* eslint-disable max-len */
import {
  Collapse, FormControl, InputLabel, List, ListItem, MenuItem, Select, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectRegion } from '../../../reduxStore/userSlice';
import statesLatLongDict from '../../../shared/stateslatlongdict';
// import { useSelector } from 'react-redux';

const PlantHardinessZone = ({
  regionShorthand,
  setRegionShorthand,
  regionsRedux,
  councilLabelRedux,
  regionToggleRedux = true,
}) => {
  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);

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
      onChange={(e) => {
        setRegionShorthand(e.target.value);
        if (markersRedux
          && (markersRedux[0][1] === statesLatLongDict[stateLabelRedux][1]
         && markersRedux[0][0] === statesLatLongDict[stateLabelRedux][0])) {
          // set redux to true (means user select another region while didn't change address)
          dispatchRedux(userSelectRegion(true));
        } else {
          // if user changed marker, not set redux
          dispatchRedux(userSelectRegion(false));
        }
      }}
      value={regionShorthand || ''}
      error={!regionShorthand}
    >

      {regionsRedux?.length > 0 && regionsRedux.map((region, i) => (
        <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
          {councilLabelRedux !== 'Midwest Cover Crops Council' ? `Zone ${region.shorthand?.toUpperCase()}` : `${region.shorthand?.toUpperCase()}`}
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
            <InputLabel>{councilLabelRedux === 'Midwest Cover Crops Council' ? 'COUNTY' : 'ZONE'}</InputLabel>
            {plantHardinessZone()}
            {!regionShorthand
            && (
            <Typography variant="body2" align="center" color="error" gutterBottom>
              {`Please Select a ${councilLabelRedux === 'Midwest Cover Crops Council' ? 'County' : 'Zone'}`}
            </Typography>
            )}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
