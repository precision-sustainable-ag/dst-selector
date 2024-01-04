/* eslint-disable max-len */
import {
  Collapse,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
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
  councilShorthand,
  regionToggleRedux = true,
}) => {
  // Styles for the menu items
  const menuProps = {
    PaperProps: {
      sx: {
        '.MuiMenuItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#598445',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: 'rgba(176, 236, 130, 0.3)',
            color: 'black',
          },
        },
      },
    },
  };

  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);

  const plantHardinessZone = () => (
    <Select
      labelId="plant-hardiness-zone-dropdown-select-label-id"
      id="plant-hardiness-zone-dropdown-select"
      label={councilShorthand === 'MCCC' ? 'COUNTY' : 'ZONE'}
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      sx={{
        minWidth: 200,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', // Set your custom color for the notched outline
          borderWidth: '2px', // Set your custom border width
          borderRadius: '4px', // Custom border radius
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', // Custom color on hover
          borderWidth: '2.5px',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#598445', // Custom color when the Select is focused
          borderWidth: '2.5px', // Custom border width when the Select is focused
        },
      }}
      MenuProps={menuProps}
      onChange={(e) => {
        setRegionShorthand(e.target.value);
        if (
          markersRedux
          && markersRedux[0][1] === statesLatLongDict[stateLabelRedux][1]
          && markersRedux[0][0] === statesLatLongDict[stateLabelRedux][0]
        ) {
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
      {regionsRedux?.length > 0
        && regionsRedux.map((region, i) => (
          <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
            {councilShorthand !== 'MCCC'
              ? `Zone ${region.shorthand?.toUpperCase()}`
              : `${region.shorthand?.toUpperCase()}`}
          </MenuItem>
        ))}
    </Select>
  );

  return (
    <Collapse in={regionToggleRedux}>
      <List component="div">
        <ListItem component="div" style={{ padding: 0 }}>
          <FormControl>
            <InputLabel
              id="plant-hardiness-zone-dropdown-select-label-id"
              sx={{ fontWeight: 'medium' }}
            >
              {councilShorthand === 'MCCC' ? 'COUNTY' : 'ZONE'}
            </InputLabel>
            {plantHardinessZone()}
            {!regionShorthand && (
              <Typography variant="body2" align="center" color="error" gutterBottom>
                {`Please Select a ${councilShorthand === 'MCCC' ? 'County' : 'Zone'}`}
              </Typography>
            )}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
