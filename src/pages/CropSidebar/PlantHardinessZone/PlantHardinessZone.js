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

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        marginTop: '5px',
      },
      sx: {
        '.MuiMenuItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: 'rgba(176, 236, 130, 0.3)',
            color: 'black',
          },
        }
      }
    }
  }

  const plantHardinessZone = () => (
    <Select
      // variant="filled"
      labelId="plant-hardiness-zone-dropdown-label"
      label={councilLabelRedux === 'Midwest Cover Crops Council' ? 'COUNTY' : 'ZONE'}
      id="plant-hardiness-zone-dropdown-select"
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      sx={{
        minWidth: 200,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', 
          borderWidth: '1px', 
          borderRadius: '4px', 
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', 
          borderWidth: '2px'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', 
          borderWidth: '2.5px', 
        },
      }}
      MenuProps={menuProps}
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
            // variant="filled"
          >
            <InputLabel
              id="plant-hardiness-zone-dropdown-label"
              sx={{
                color: '#598445',
                '&.Mui-focused': {
                  color: '#598445',
                  fontWeight: 'medium',
                },
              }}
            >
              {councilLabelRedux === 'Midwest Cover Crops Council' ? 'COUNTY' : 'ZONE'}
            </InputLabel>
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
