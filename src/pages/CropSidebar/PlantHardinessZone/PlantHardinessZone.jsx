/* eslint-disable max-len */
import {
  Collapse, List, ListItem, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSADropdown } from 'shared-react-components/src';
import { updateRegion } from '../../../reduxStore/mapSlice';
import { historyState, setHistoryDialogState } from '../../../reduxStore/userSlice';
import pirschAnalytics from '../../../shared/analytics';

const PlantHardinessZone = ({ from }) => {
  const dispatchRedux = useDispatch();
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const regionToggleRedux = useSelector((stateRedux) => stateRedux.sharedData.regionToggle);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const updateRegionRedux = (e) => {
    // if update region, show history dialog to create a new history
    if (historyStateRedux === historyState.imported) {
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
      return;
    }
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === e.target.value)[0];
    localStorage.setItem('regionId', selectedRegion.id);
    dispatchRedux(updateRegion({
      regionId: selectedRegion.id ?? '',
      regionShorthand: selectedRegion.shorthand ?? '',
    }));
    pirschAnalytics(from, { meta: { dropdownUpdate: true } });
  };

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
        },
      },
    },
  };

  const plantHardinessZone = () => (
    <PSADropdown
      label={councilLabelRedux === 'Midwest Cover Crops Council' ? 'COUNTY' : 'ZONE'}
      inputSx={{
        color: '#598445',
        '&.Mui-focused': {
          color: '#598445',
          fontWeight: 'medium',
        },
      }}
      items={regionsRedux.map((region) => ({
        value: region.shorthand,
        label: councilLabelRedux !== 'Midwest Cover Crops Council'
          ? `Zone ${region.shorthand?.toUpperCase()}`
          : `${region.shorthand?.toUpperCase()}`,
      }))}
      formSx={{ width: '100%' }}
      SelectProps={{
        value: regionShorthandRedux || '',
        onChange: updateRegionRedux,
        style: { textAlign: 'left' },
        sx: {
          minWidth: 200,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#598445',
            borderWidth: '1px',
            borderRadius: '4px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#598445',
            borderWidth: '2px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#598445',
            borderWidth: '2.5px',
          },
        },
        MenuProps: menuProps,
        error: !regionShorthandRedux,
      }}
    />
  );

  return (
    <Collapse in={regionToggleRedux}>
      <List component="div">
        <ListItem component="div">
          {plantHardinessZone()}
          {!regionShorthandRedux
            && (
              <Typography variant="body2" align="center" color="error" gutterBottom>
                {`Please Select a ${councilLabelRedux === 'Midwest Cover Crops Council' ? 'County' : 'Zone'}`}
              </Typography>
            )}
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
