/* eslint-disable max-len */
import { Collapse, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSADropdown } from 'shared-react-components/src';
import { updateRegion } from '../../../reduxStore/mapSlice';
import { setMyCoverCropReset, setQueryString } from '../../../reduxStore/sharedSlice';
import { historyState, setHistoryDialogState } from '../../../reduxStore/userSlice';
import pirschAnalytics from '../../../shared/analytics';
import { callCoverCropApi } from '../../../shared/constants';

const PlantHardinessZone = ({ from }) => {
  const dispatchRedux = useDispatch();
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const regionToggleRedux = useSelector((stateRedux) => stateRedux.sharedData.regionToggle);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const resetStatusRedux = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset.status,
  );
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  const [pendingRegion, setPendingRegion] = useState(null);

  const applyRegion = (region) => {
    if (councilShorthandRedux === 'WCCC') {
      const { ecoregion_code, ecoregion, valid_lat, valid_lon } = region;

      dispatchRedux(
        updateRegion({
          regionId: ecoregion_code,
          regionShorthand: ecoregion,
        }),
      );
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/regions?lat=${valid_lat}&lon=${valid_lon}`,
      ).then((data) => {
        const query = data.data
          .filter((i) => i?.id !== null && i?.id !== undefined)
          .map((i) => `regions=${i.id}`)
          .join('&');
        dispatchRedux(setQueryString(query));
      });
      pirschAnalytics(from, { meta: { dropdownUpdate: true } });
      return;
    }

    localStorage.setItem('regionId', region.id);
    dispatchRedux(
      updateRegion({
        regionId: region.id,
        regionShorthand: region.shorthand,
      }),
    );
    dispatchRedux(setQueryString(`regions=${region.id}`));
    pirschAnalytics(from, { meta: { dropdownUpdate: true } });
  };

  // handle reset crop dialog
  useEffect(() => {
    if (!pendingRegion || resetStatusRedux === null) return;

    if (resetStatusRedux === true) {
      applyRegion(pendingRegion);
    }
    setPendingRegion(null);
    dispatchRedux(setMyCoverCropReset(false, false, null));
  }, [resetStatusRedux, pendingRegion]);

  const updateRegionRedux = (e) => {
    // if update region, show history dialog to create a new history
    if (historyStateRedux === historyState.imported) {
      dispatchRedux(setHistoryDialogState({ open: true, type: 'update' }));
      return;
    }

    if (councilShorthandRedux === 'WCCC') {
      const selectedEco = regionsRedux.find((eco) => eco.ecoregion_code === e.target.value);
      if (!selectedEco) {
        console.error('Unavailable ecoregion.');
        return;
      }
      // If user is changing ecoregion with selected crops in WCCC, prompt reset dialog
      if (
        selectedCropIdsRedux.length > 0 &&
        regionIdRedux &&
        selectedEco.ecoregion_code !== regionIdRedux
      ) {
        setPendingRegion(selectedEco);
        dispatchRedux(setMyCoverCropReset(true, true));
        return;
      }
      applyRegion(selectedEco);
      return;
    }

    const selectedRegion = regionsRedux.filter((region) => region.shorthand === e.target.value)[0];
    if (!selectedRegion?.id || !selectedRegion?.shorthand) {
      console.error('Unavailable region.');
      return;
    }
    // If user is changing region with selected crops in SCCC/NECCC, prompt reset dialog
    // In MCCC the county change does not affect the crop list, no need to prompt
    if (
      councilLabelRedux !== 'Midwest Cover Crops Council' &&
      selectedCropIdsRedux.length > 0 &&
      regionIdRedux &&
      selectedRegion.id !== regionIdRedux
    ) {
      setPendingRegion(selectedRegion);
      dispatchRedux(setMyCoverCropReset(true, true));
      return;
    }
    applyRegion(selectedRegion);
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

  const getDropdownLabel = () => {
    switch (councilShorthandRedux) {
      case 'WCCC':
        return 'ECOREGION';
      case 'MCCC':
        return 'COUNTY';
      default:
        return 'ZONE';
    }
  };

  const getDropdownItems = () => {
    if (councilShorthandRedux === 'WCCC') {
      return regionsRedux.map((eco) => ({
        value: eco.ecoregion_code,
        label: eco.ecoregion,
      }));
    }
    return regionsRedux.map((region) => ({
      value: region.shorthand,
      label:
        councilLabelRedux !== 'Midwest Cover Crops Council'
          ? `Zone ${region.shorthand?.toUpperCase()}`
          : `${region.shorthand?.toUpperCase()}`,
    }));
  };

  const dropdownValue =
    councilShorthandRedux === 'WCCC'
      ? pendingRegion?.ecoregion_code || regionIdRedux || ''
      : pendingRegion?.shorthand || regionShorthandRedux || '';

  const plantHardinessZone = () => (
    <PSADropdown
      label={getDropdownLabel()}
      inputSx={{
        color: '#598445',
        '&.Mui-focused': {
          color: '#598445',
          fontWeight: 'medium',
        },
      }}
      items={getDropdownItems()}
      formSx={{ width: '100%' }}
      SelectProps={{
        value: dropdownValue,
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
        'data-test': 'plant-hardiness-zone-dropdown',
      }}
    />
  );

  return (
    <Collapse in={regionToggleRedux}>
      <List component="div">
        <ListItem component="div">
          {plantHardinessZone()}
          {!regionShorthandRedux && (
            <Typography variant="body2" align="center" color="error" gutterBottom>
              {`Please Select a ${getDropdownLabel()}`}
            </Typography>
          )}
        </ListItem>
      </List>
    </Collapse>
  );
};

export default PlantHardinessZone;
