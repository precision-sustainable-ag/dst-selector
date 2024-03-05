import React from 'react';
import {
  Chip, Grid, useTheme, useMediaQuery, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';

const RenderFloodingOptions = ({ floodingOptions, flooding = [''] }) => {
  const dispatchRedux = useDispatch();

  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));
  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);

  const updateFloodingFrequency = (label = '') => {
    let floodings = soilDataRedux?.floodingFrequency ? [...soilDataRedux.floodingFrequency] : [];
    if (floodings.indexOf('None') !== -1) {
      // does exist, remove none because something else was selected
      floodings.splice(floodings.indexOf('None'));
    }
    if (label === 'None') {
      // does exist, remove none because something else was selected
      floodings = [];
    }
    if (floodings.indexOf(label) === -1) {
      // does not exist, dispatch to state
      floodings = [label];
      dispatchRedux(updateFloodingFrequencyRedux(floodings));
    } else {
      // exists, remove it from state
      const index = floodings.indexOf(label);
      floodings.splice(index, 1);

      dispatchRedux(updateFloodingFrequencyRedux(floodings));
    }
  };
  return (
    <Grid
      item
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      flexWrap="wrap"
      justifyContent="center"
      alignItems={isMobile ? 'center' : 'flex-start'}
      style={{ marginRight: '1rem' }}
      flexBasis="0"
    >
      {floodingOptions.map((f, index) => (
        <Box key={index} sx={{ width: isMobile ? '100%' : 'auto' }}>
          <Chip
            label={f.label}
            color={flooding.includes(f.value) ? 'primary' : 'secondary'}
            onClick={() => {
              updateFloodingFrequency(f.value);
            }}
            style={{ margin: '0.3rem' }}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default RenderFloodingOptions;
