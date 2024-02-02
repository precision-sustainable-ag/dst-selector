import React, {
  useEffect,
  useState,
} from 'react';
import {
  Chip, Grid, useTheme, useMediaQuery, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';

const RenderFloodingOptions = ({ flooding = [''] }) => {
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const dispatchRedux = useDispatch();

  // theme
  const uiTheme = useTheme();
  const isMobile = useMediaQuery(uiTheme.breakpoints.down('sm'));

  // state vars
  const [floodingOptions, setFloodingOptions] = useState([]);

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const query1 = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
  const query2 = `${encodeURIComponent('regions')}=${encodeURIComponent(stateIdRedux)}`;

  useEffect(() => {
    fetch(`https://${apiBaseUrlRedux}.covercrop-selector.org/v2/attribute?filtered=false&slug=flooding_frequency&${query2}&${query1}`)
      .then((res) => res.json())
      .then((data) => {
        setFloodingOptions(data.data.values);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);

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
      floodings.push(label);
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
