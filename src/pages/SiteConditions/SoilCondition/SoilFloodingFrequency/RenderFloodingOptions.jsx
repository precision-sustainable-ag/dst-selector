import React from 'react';
import {
  Chip, Grid, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFloodingFrequency as updateFloodingFrequencyRedux } from '../../../../reduxStore/soilSlice';
import { historyState, setHistoryState } from '../../../../reduxStore/userSlice';
import pirschAnalytics from '../../../../shared/analytics';
import useIsMobile from '../../../../hooks/useIsMobile';

const RenderFloodingOptions = ({ floodingOptions, flooding = [''] }) => {
  const dispatchRedux = useDispatch();
  const isMobile = useIsMobile('sm');

  // redux vars
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const updateFloodingFrequency = (label = '') => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
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
      pirschAnalytics('Site Conditions', {
        meta:
        { floodingFrequency: floodingOptions.filter((floodClass) => floodClass.value === floodings[0])[0].label },
      });
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
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems={isMobile ? 'center' : 'flex-start'}
      style={{ marginRight: '1rem' }}
      flexBasis="0"
    >
      {floodingOptions.map((f, index) => (
        <Box key={index} sx={{ width: 'auto' }}>
          <Chip
            label={f.label}
            color={flooding.includes(f.value) ? 'primary' : 'secondary'}
            onClick={() => {
              updateFloodingFrequency(f.value);
            }}
            style={{ margin: '0.3rem' }}
            data-test={`flooding-options-chip-${index}`}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default RenderFloodingOptions;
