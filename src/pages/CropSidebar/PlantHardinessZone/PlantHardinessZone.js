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
// import { useSelector } from 'react-redux';

const PlantHardinessZone = ({
  regionShorthand,
  setRegionShorthand,
  regionsRedux,
  councilLabelRedux,
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

  const plantHardinessZone = () => (
    <Select
      labelId="plant-hardiness-zone-dropdown-select"
      id="plant-hardiness-zone-dropdown-select"
      label="ZONE"
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      sx={{
        fontWeight: 'bold',
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
      onChange={(e) => setRegionShorthand(e.target.value)}
      value={regionShorthand || ''}
      error={!regionShorthand}
    >
      {regionsRedux?.length > 0 &&
        regionsRedux.map((region, i) => (
          <MenuItem value={region.shorthand} key={`Region${region}${i}`}>
            {councilLabelRedux !== 'Midwest Cover Crops Council'
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
            <InputLabel id="plant-hardiness-zone-dropdown-label" sx={{ fontWeight: 'medium' }}>
              {councilLabelRedux === 'Midwest Cover Crops Council' ? 'COUNTY' : 'ZONE'}
            </InputLabel>
            {plantHardinessZone()}
            {!regionShorthand && (
              <Typography variant="body2" align="center" color="error" gutterBottom>
                {`Please Select a ${
                  councilLabelRedux === 'Midwest Cover Crops Council' ? 'County' : 'Zone'
                }`}
              </Typography>
            )}
          </FormControl>
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
